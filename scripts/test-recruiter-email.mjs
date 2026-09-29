// Sends ONE real recruiter-outreach email — CV attached — via Gmail SMTP, authenticated
// as your real account. Local-only on purpose: this is a script you run with `node`,
// not an API route — it never ships to the deployed app, so there's no endpoint
// anyone else could hit to send email (or your CV) through your account.
//
// Usage:
//   npm run brand                          # make sure brand/dist/ is current
//   npm run test:recruiter-email                                    # sends to yourself
//   npm run test:recruiter-email -- --to=recruiter@company.com --company="Acme" --role="Senior Frontend Engineer"
//
// Requires GMAIL_USER + GMAIL_APP_PASSWORD in .env.local (same as the site's contact
// form and CV delivery — see lib/mailer.ts for setup). Reads .env.local itself — this
// script runs outside Next.js, which is the only thing that loads .env.local automatically.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvLocal() {
  const path = join(root, ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (!match) continue;
    const [, key, rawValue = ""] = match;
    if (process.env[key] === undefined) {
      process.env[key] = rawValue.replace(/^["']|["']$/g, "");
    }
  }
}
loadEnvLocal();

function arg(name, fallback) {
  const flag = `--${name}=`;
  const hit = process.argv.find((a) => a.startsWith(flag));
  return hit ? hit.slice(flag.length) : fallback;
}

const profile = JSON.parse(readFileSync(join(root, "brand/profile.json"), "utf8"));

const sample = {
  recruiter_name: arg("recruiter", "Jamie"),
  company: arg("company", "Example Fintech"),
  role: arg("role", "Senior Frontend Engineer"),
  custom_line: arg(
    "line",
    "Saw the Series B announcement and that you're scaling the platform team.",
  ),
  sender_unsubscribe_line: "Not hiring for this right now? Just reply \"no\" and I won't follow up.",
};

const to = arg("to", profile.email);

const gmailUser = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_APP_PASSWORD;
if (!gmailUser || !gmailPass) {
  console.error("Missing GMAIL_USER / GMAIL_APP_PASSWORD. Add them to .env.local first (see .env.example).");
  process.exit(1);
}

const templatePath = join(root, "brand/dist/recruiter-email.html");
if (!existsSync(templatePath)) {
  console.error("brand/dist/recruiter-email.html not found. Run `npm run brand` first.");
  process.exit(1);
}

// The CV is attached directly here, and ONLY here — never in a public API route.
// This script only runs when you personally choose to email a specific, named
// recruiter; it's never reachable by an anonymous visitor. That's the actual
// security boundary: the public /cv flow (app/api/cv-request) stays gated behind
// email verification and a 30-minute signed link, because it's exposed to anyone
// on the internet. This script isn't — it's local, manual, and 1:1 by design.
// See brand/brand-guidelines.md §7 for the full reasoning.
const cvPath = join(root, "private/cv/AhsanKhan_SrSoftwareEngineer.pdf");
if (!existsSync(cvPath)) {
  console.error(`CV not found at ${cvPath}.`);
  process.exit(1);
}
const cvBuffer = readFileSync(cvPath);

let html = readFileSync(templatePath, "utf8");
for (const [key, value] of Object.entries(sample)) {
  html = html.replaceAll(`{{ ${key} }}`, value);
}

const subject = `${sample.role} — ${sample.company}`;

console.log(`Sending test recruiter email to ${to}...`);
console.log(`  recruiter_name: ${sample.recruiter_name}`);
console.log(`  company:        ${sample.company}`);
console.log(`  role:           ${sample.role}`);
console.log(`  custom_line:    ${sample.custom_line}`);
console.log(`  subject:        ${subject}`);

const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: gmailUser, pass: gmailPass } });

try {
  const info = await transporter.sendMail({
    from: `${profile.name} <${gmailUser}>`,
    to,
    subject: `[TEST] ${subject}`,
    html,
    attachments: [{ filename: "Ahsan-Khan-CV.pdf", content: cvBuffer }],
  });
  console.log(`Sent with CV attached. Message id: ${info.messageId}`);
  console.log(`Check ${to}.`);
} catch (err) {
  console.error("Send failed:", err.message);
  process.exit(1);
}
