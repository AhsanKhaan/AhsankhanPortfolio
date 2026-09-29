// Sends mail via Gmail's own SMTP server, authenticated as your real account (an
// "App Password", not your login password) — not a third-party ESP pretending to be
// you. That means `from` is genuinely ahsankhan.ubit@gmail.com: no domain to verify,
// no "you can only send to your own address" sandbox limit, and no risk of it being
// flagged as spoofed, since it's authenticated directly with Google as that account.
//
// Setup (once): enable 2-Step Verification on the Google account, then create an App
// Password at https://myaccount.google.com/apppasswords, and set GMAIL_USER +
// GMAIL_APP_PASSWORD (both in .env.local for local dev and in Vercel's project env
// vars for production — the project that actually serves the live domain).
import nodemailer, { type Transporter } from "nodemailer";

let cached: Transporter | null = null;

export function getMailer(): Transporter | null {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  cached ??= nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  return cached;
}
