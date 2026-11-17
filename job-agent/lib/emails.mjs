import { resolveMx } from "node:dns/promises";
import MailChecker from "mailchecker";

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
const HIRING = /^(careers?|jobs?|hr|talent|recruit(ing|ment|er|ers)?|hiring|people|join|joinus|work|apply|cv|resumes?|vacanc(y|ies)|opportunit(y|ies)|team-?up)([._-].*)?$/i;
const GENERAL = /^(info|hello|contact|hi|team|office|enquiries|inquiries)$/i;
const BLOCKED = /^(no-?reply|do-?not-?reply|privacy|abuse|postmaster|webmaster|support|help|billing|invoices?|accounts|sales|press|media|pr|legal|security|dpo|gdpr|unsubscribe|compliance|complaints?|partners?|marketing|newsletter)\b/i;

// Only addresses on the company's own domain, published on its own pages. Role inboxes
// (careers@, hr@) are preferred; generic inboxes are a fallback; obvious non-hiring
// inboxes (support@, sales@, privacy@, noreply@) are never used.
export function extractEmails(html, domain) {
  const deobfuscated = html
    .replace(/\s*(\[at\]|\(at\)|\{at\}|&#64;)\s*/gi, "@")
    .replace(/\s*(\[dot\]|\(dot\))\s*/gi, ".");
  const found = new Set((deobfuscated.match(EMAIL_RE) ?? []).map((e) => e.toLowerCase().replace(/\.+$/, "")));
  const out = [];
  for (const address of found) {
    const [local, host] = address.split("@");
    if (/\.(png|jpe?g|gif|svg|webp|css|js)$/.test(host)) continue;
    if (!(host === domain || host.endsWith(`.${domain}`))) continue;
    if (BLOCKED.test(local)) continue;
    out.push({ address, kind: HIRING.test(local) ? "hiring" : GENERAL.test(local) ? "general" : "named" });
  }
  return out;
}

const RANK = { hiring: 0, named: 1, general: 2 };
export function rankEmails(emails) {
  return [...emails].sort((a, b) => RANK[a.kind] - RANK[b.kind]);
}

// Same two layers as lib/emailValidation.ts on the site: disposable-domain blocklist,
// then an MX lookup. A DNS timeout is inconclusive, not a rejection.
export async function validateEmail(address) {
  if (!MailChecker.isValid(address)) return { valid: false, reason: "invalid or disposable" };
  try {
    const records = await Promise.race([
      resolveMx(address.split("@")[1]),
      new Promise((_, reject) => setTimeout(() => reject(new Error("mx-timeout")), 4000)),
    ]);
    if (!records?.length) return { valid: false, reason: "domain has no MX records" };
  } catch (err) {
    if (err.code === "ENOTFOUND" || err.code === "ENODATA") return { valid: false, reason: "domain has no MX records" };
  }
  return { valid: true };
}
