import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

// Bounded, polite, SSRF-safe HTTP: per-request timeout, at most one retry on network/5xx
// errors, a minimum delay between hits to the same host, robots.txt checks for crawling,
// a response-size cap, and every hop (including redirects) must resolve to a public IP —
// a scraped "website" pointing at localhost or the LAN router is refused.
const UA = "Mozilla/5.0 (compatible; AhsanKhanJobAgent/1.0; +https://ahsankhaan.vercel.app)";
const MAX_BYTES = 3 * 1024 * 1024;
const MAX_REDIRECTS = 5;

function isPrivateAddress(ip) {
  if (isIP(ip) === 6) {
    const v = ip.toLowerCase();
    if (v.startsWith("::ffff:")) return isPrivateAddress(v.slice(7));
    return v === "::1" || v === "::" || /^(fc|fd|fe8|fe9|fea|feb)/.test(v);
  }
  const [a, b] = ip.split(".").map(Number);
  return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224;
}

export async function assertPublicUrl(url) {
  const u = new URL(url);
  if (!["http:", "https:"].includes(u.protocol)) throw new Error(`blocked protocol ${u.protocol}`);
  if (u.username || u.password) throw new Error("blocked URL with credentials");
  const host = u.hostname.replace(/^\[|\]$/g, "");
  if (/^(localhost|.*\.local|.*\.internal|.*\.lan)$/i.test(host)) throw new Error(`blocked internal host ${host}`);
  const addresses = isIP(host) ? [{ address: host }] : await lookup(host, { all: true });
  if (addresses.some((a) => isPrivateAddress(a.address))) throw new Error(`blocked private address for ${host}`);
}

const lastHit = new Map();
const robotsCache = new Map();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let defaults = { timeoutMs: 12000, delayMs: 1500 };
export function configureHttp(opts) {
  defaults = { ...defaults, ...opts };
}

async function fetchWithTimeout(url, { timeoutMs = defaults.timeoutMs, method = "GET", headers = {}, body } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    let current = url;
    for (let hop = 0; ; hop++) {
      await assertPublicUrl(current);
      const res = await fetch(current, {
        method: hop ? "GET" : method,
        body: hop ? undefined : body,
        redirect: "manual",
        signal: ctrl.signal,
        headers: { "user-agent": UA, "accept-language": "en", ...headers },
      });
      const location = res.headers.get("location");
      if (res.status >= 300 && res.status < 400 && location) {
        if (hop >= MAX_REDIRECTS) throw new Error(`too many redirects for ${url}`);
        current = new URL(location, current).toString();
        continue;
      }
      return limitBody(res, current);
    }
  } finally {
    clearTimeout(timer);
  }
}

// Re-wrap the response so .text()/.json() never buffer more than MAX_BYTES.
async function limitBody(res, finalUrl) {
  const chunks = [];
  let size = 0;
  if (res.body) {
    for await (const chunk of res.body) {
      size += chunk.length;
      if (size > MAX_BYTES) throw new Error(`response over ${MAX_BYTES} bytes from ${finalUrl}`);
      chunks.push(chunk);
    }
  }
  const text = Buffer.concat(chunks).toString("utf8");
  return {
    ok: res.ok,
    status: res.status,
    url: finalUrl,
    headers: res.headers,
    text: async () => text,
    json: async () => JSON.parse(text),
  };
}

export async function politeFetch(url, opts = {}) {
  const host = new URL(url).host;
  const wait = (lastHit.get(host) ?? 0) + (opts.delayMs ?? defaults.delayMs) - Date.now();
  if (wait > 0) await sleep(wait);
  for (let attempt = 0; ; attempt++) {
    lastHit.set(host, Date.now());
    try {
      const res = await fetchWithTimeout(url, opts);
      if (res.status >= 500 && attempt < 1) {
        await sleep(2000);
        continue;
      }
      return res;
    } catch (err) {
      if (attempt >= 1) throw err;
      await sleep(2000);
    }
  }
}

export async function getText(url, opts) {
  const res = await politeFetch(url, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return { text: await res.text(), finalUrl: res.url, contentType: res.headers.get("content-type") ?? "" };
}

export async function getJson(url, opts) {
  const res = await politeFetch(url, { ...opts, headers: { accept: "application/json", ...opts?.headers } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

export async function allowedByRobots(url) {
  const { origin, pathname, search } = new URL(url);
  if (!robotsCache.has(origin)) robotsCache.set(origin, loadRobots(origin));
  const rules = await robotsCache.get(origin);
  let best = null;
  for (const rule of rules) {
    if (!robotsMatch(rule.path, pathname + search)) continue;
    if (!best || rule.path.length > best.path.length || (rule.path.length === best.path.length && rule.allow)) best = rule;
  }
  return !best || best.allow;
}

async function loadRobots(origin) {
  try {
    const res = await fetchWithTimeout(`${origin}/robots.txt`, { timeoutMs: 6000 });
    return res.ok ? parseRobots(await res.text()) : [];
  } catch {
    return [];
  }
}

// Rules from the `*` group (and any group naming this agent). Missing robots.txt = allowed.
function parseRobots(txt) {
  const rules = [];
  let agents = [];
  let groupHasRules = false;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const i = line.indexOf(":");
    if (i < 0) continue;
    const field = line.slice(0, i).trim().toLowerCase();
    const value = line.slice(i + 1).trim();
    if (field === "user-agent") {
      if (groupHasRules) {
        agents = [];
        groupHasRules = false;
      }
      agents.push(value.toLowerCase());
    } else if (field === "allow" || field === "disallow") {
      groupHasRules = true;
      const applies = agents.includes("*") || agents.some((a) => a && "ahsankhanjobagent".startsWith(a));
      if (applies && value) rules.push({ allow: field === "allow", path: value });
    }
  }
  return rules;
}

function robotsMatch(pattern, path) {
  const anchored = pattern.endsWith("$");
  const body = anchored ? pattern.slice(0, -1) : pattern;
  const source = body
    .split("*")
    .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
    .join(".*");
  return new RegExp(`^${source}${anchored ? "$" : ""}`).test(path);
}
