import { getText, allowedByRobots } from "./http.mjs";
import { extractEmails, rankEmails } from "./emails.mjs";
import { detectAts } from "./sources/ats.mjs";
import { absolutize, domainOf } from "./text.mjs";

const CAREER_HINT = /(careers?|jobs?|join[-_ ]?(us|the[-_ ]team|our[-_ ]team)?|work[-_ ]with[-_ ]us|vacanc|opportunit|hiring|open[-_ ]positions|life[-_ ]at)/i;
const CONTACT_HINT = /(contact|about)/i;
const FALLBACK_PATHS = ["/careers", "/jobs", "/join-us", "/careers/", "/en/careers", "/contact", "/contact-us"];
const LINK_RE = /<a\s[^>]*href\s*=\s*["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi;

function links(html, baseUrl) {
  const out = [];
  for (const [, href, inner] of html.matchAll(LINK_RE)) {
    const url = absolutize(href, baseUrl);
    if (url?.startsWith("http")) out.push({ url, text: inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() });
  }
  return out;
}

// Visits at most `maxPages` pages of one company site: the homepage, then its careers
// and contact pages (by link text, else common paths). Skips anything robots.txt
// disallows. Returns the careers URL, an ATS feed if the site embeds one, and the
// hiring emails published on those pages.
export async function crawlCompany(website, { maxPages = 5 } = {}) {
  const home = website.startsWith("http") ? website : `https://${website}`;
  const domain = domainOf(home);
  const visited = new Set();
  const emails = new Map();
  const notes = [];
  let careersUrl = null;
  let ats = null;

  async function visit(url) {
    if (visited.size >= maxPages || visited.has(url)) return null;
    visited.add(url);
    if (!(await allowedByRobots(url))) {
      notes.push(`robots.txt disallows ${new URL(url).pathname}`);
      return null;
    }
    try {
      const { text, finalUrl, contentType } = await getText(url);
      if (!/html/i.test(contentType)) return null;
      ats ??= detectAts(text);
      for (const e of extractEmails(text, domain)) emails.set(e.address, { ...e, foundOn: finalUrl });
      return { html: text, finalUrl };
    } catch (err) {
      notes.push(err.message);
      return null;
    }
  }

  const page = await visit(home);
  if (!page) return { domain, careersUrl, ats, emails: [], pages: visited.size, notes };

  const sameSiteOrAts = (u) => domainOf(u)?.endsWith(domain) || detectAts(u);
  const all = links(page.html, page.finalUrl);
  const careerLinks = all.filter((l) => sameSiteOrAts(l.url) && (CAREER_HINT.test(l.text) || CAREER_HINT.test(new URL(l.url).pathname)));
  const contactLinks = all.filter((l) => domainOf(l.url)?.endsWith(domain) && CONTACT_HINT.test(l.text + new URL(l.url).pathname));

  for (const l of careerLinks.slice(0, 2)) {
    ats ??= detectAts(l.url);
    if (detectAts(l.url)) {
      careersUrl ??= l.url;
      continue;
    }
    const p = await visit(l.url);
    if (p) careersUrl ??= p.finalUrl;
  }
  for (const l of contactLinks.slice(0, 1)) await visit(l.url);

  if (!careersUrl && !ats) {
    for (const path of FALLBACK_PATHS) {
      if (visited.size >= maxPages) break;
      const url = new URL(path, page.finalUrl).toString();
      const p = await visit(url);
      if (p && CAREER_HINT.test(path)) {
        careersUrl = p.finalUrl;
        break;
      }
    }
  }

  return { domain, careersUrl, ats, emails: rankEmails([...emails.values()]), pages: visited.size, notes };
}
