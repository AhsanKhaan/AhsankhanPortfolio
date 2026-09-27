// Stronger checks than a format regex, so a CV link only ever gets mailed to a real,
// reachable address — not a throwaway/disposable inbox an attacker uses to grab it
// without a trace. Two layers:
//   1. mailchecker — format + a maintained blocklist of 55,000+ disposable domains.
//   2. an MX-record lookup — rejects domains that plainly can't receive mail
//      (typos, made-up domains). Network hiccups don't hard-fail a real request:
//      a lookup timeout or transient DNS error is let through.
import { resolveMx } from "node:dns/promises";
import MailChecker from "mailchecker";

const MX_TIMEOUT_MS = 3000;

export type EmailCheck = { valid: true } | { valid: false; reason: string };

export async function checkEmail(email: string): Promise<EmailCheck> {
  if (!MailChecker.isValid(email)) {
    return { valid: false, reason: "Please use a real, non-disposable email address." };
  }

  const domain = email.split("@")[1];
  try {
    const records = await Promise.race([
      resolveMx(domain),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("mx-timeout")), MX_TIMEOUT_MS)),
    ]);
    if (!records || records.length === 0) {
      return { valid: false, reason: "That domain doesn't look like it can receive email." };
    }
  } catch (err) {
    // ENOTFOUND / ENODATA: the domain has no mail server — a fabricated domain.
    // Anything else (including our own timeout): treat as inconclusive, not a rejection.
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code === "ENOTFOUND" || code === "ENODATA") {
      return { valid: false, reason: "That domain doesn't look like it can receive email." };
    }
  }

  return { valid: true };
}
