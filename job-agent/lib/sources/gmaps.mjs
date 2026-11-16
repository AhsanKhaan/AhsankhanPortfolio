import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { AGENT_DIR, DATA_DIR } from "../env.mjs";
import { domainOf } from "../text.mjs";
import { extractEmails } from "../emails.mjs";

// Google Maps business search via gosom/google-maps-scraper (MIT, v1.18.1, SHA-256
// verified at install). Scraping Maps is against Google's terms: keep runs small and
// infrequent; the Places API source is the compliant alternative.
const BIN = join(AGENT_DIR, "bin", "google-maps-scraper.exe");
const OUT_DIR = join(DATA_DIR, "gmaps");
const run = promisify(execFile);

export const gmapsAvailable = () => existsSync(BIN);

function parseResults(raw) {
  const text = raw.trim();
  if (!text) return [];
  if (text.startsWith("[")) return JSON.parse(text);
  return text.split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
}

// Returns { name, website, domain, address, category, emails, source } per business with a website.
export async function gmapsCompanies(queries, { depth = 1, timeoutMinutes = 12 } = {}) {
  mkdirSync(OUT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const input = join(OUT_DIR, `queries-${stamp}.txt`);
  const output = join(OUT_DIR, `results-${stamp}.json`);
  writeFileSync(input, queries.join("\n"));

  await run(BIN, ["-input", input, "-results", output, "-json", "-depth", String(depth), "-email", "-exit-on-inactivity", "2m", "-c", "2"], {
    timeout: timeoutMinutes * 60_000,
    maxBuffer: 32 * 1024 * 1024,
    windowsHide: true,
  });

  return parseResults(readFileSync(output, "utf8"))
    .map((r) => {
      const website = r.web_site || r.website || "";
      const domain = website ? domainOf(website.startsWith("http") ? website : `https://${website}`) : null;
      const rawEmails = Array.isArray(r.emails) ? r.emails.join(" ") : String(r.emails ?? "");
      return {
        name: r.title || r.name || "",
        website,
        domain,
        address: r.address || r.complete_address?.city || "",
        category: r.category || (r.categories ?? []).join(", "),
        emails: domain ? extractEmails(rawEmails, domain) : [],
        source: "gmaps",
      };
    })
    .filter((c) => c.name && c.domain);
}
