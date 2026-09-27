// Sends ONE real recruiter-outreach email to your own inbox, so you can see it
// rendered in a real client (Gmail/Outlook), not just the /brand preview route.
// Local-only on purpose: this is a script you run with `node`, not an API route —
// it never ships to the deployed app, so there's no endpoint anyone else could hit
// to send email through your Resend account.
//
// Usage:
//   npm run brand                          # make sure brand/dist/ is current
//   npm run test:recruiter-email
//   npm run test:recruiter-email -- --to=you@example.com --company="Acme" --role="Senior Frontend Engineer"
//
// Requires RESEND_API_KEY in .env.local (same key the site's contact form and CV
// delivery use). Reads .env.local itself — this script runs outside Next.js, which
// is the only thing that loads .env.local automatically.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Resend } from "resend";

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

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error("Missing RESEND_API_KEY. Add it to .env.local first (see .env.example).");
  process.exit(1);
}

const templatePath = join(root, "brand/dist/recruiter-email.html");
if (!existsSync(templatePath)) {
  console.error("brand/dist/recruiter-email.html not found. Run `npm run brand` first.");
  process.exit(1);
}

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

const resend = new Resend(apiKey);
const { data, error } = await resend.emails.send({
  // Display name is real; the address stays a Resend-verified domain until
  // CONTACT_FROM_EMAIL points at a domain you own — Resend rejects sending "from"
  // a gmail.com address you haven't (and can't) verify with them. replyTo carries
  // your real inbox instead, so hitting reply on the test reaches you directly.
  from: process.env.CONTACT_FROM_EMAIL || `${profile.name} <onboarding@resend.dev>`,
  to,
  replyTo: profile.email,
  subject: `[TEST] ${subject}`,
  html,
});

if (error) {
  console.error("Send failed:", error.message);
  process.exit(1);
}

console.log(`Sent. Resend id: ${data?.id ?? "(no id returned)"}`);
console.log(`Check ${to} — and spam, since onboarding@resend.dev is a shared sending domain.`);
