import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import nodemailer from "nodemailer";
import { ROOT, OUTBOX_DIR, ensureDirs } from "./env.mjs";
import { escapeHtml, htmlToText } from "./text.mjs";

const TEMPLATE = join(ROOT, "brand/dist/recruiter-email.html");
const CV = join(ROOT, "private/cv/AhsanKhan_SrSoftwareEngineer.pdf");

function template() {
  // brand/dist is generated (gitignored); build it on first use.
  if (!existsSync(TEMPLATE)) execFileSync(process.execPath, [join(ROOT, "scripts/build-brand.mjs")], { stdio: "ignore" });
  return readFileSync(TEMPLATE, "utf8");
}

// Fills the existing recruiter-outreach template (signature included) for one application.
export function renderApplication(app, optOutLine) {
  const values = {
    recruiter_name: app.recruiterName,
    company: app.company,
    role: app.role,
    custom_line: app.customLine,
    sender_unsubscribe_line: optOutLine,
  };
  let html = template();
  for (const [key, value] of Object.entries(values)) html = html.replaceAll(`{{ ${key} }}`, escapeHtml(value));
  html = html.replace(/<!--[\s\S]*?-->/g, "");
  const text = htmlToText(html.replace(/<div style="display:none[\s\S]*?<\/div>/, "").replace(/<title>[\s\S]*?<\/title>/, ""));
  return { subject: app.subject, html, text };
}

let transporter;
function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD missing from .env.local");
  transporter ??= nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  return transporter;
}

export async function sendMail({ to, subject, html, text, attachCv, cvFilename, fromName }) {
  const message = {
    from: `${fromName} <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
    text,
    attachments: attachCv ? [{ filename: cvFilename, content: readFileSync(CV) }] : [],
  };
  const info = await getTransporter().sendMail(message);
  return info.messageId;
}

// Dry run: write exactly what would be sent so it can be opened and checked.
export function writePreview(app, rendered) {
  ensureDirs();
  const path = join(OUTBOX_DIR, `${app.id}.html`);
  writeFileSync(path, `<!-- To: ${app.to}\n     Subject: ${rendered.subject}\n     Attachment: CV PDF -->\n${rendered.html}`);
  return path;
}
