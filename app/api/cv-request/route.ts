import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { getMailer } from "@/lib/mailer";
import { issueCvToken } from "@/lib/cvToken";
import { isRateLimited } from "@/lib/rateLimit";
import { checkEmail } from "@/lib/emailValidation";
import { profile } from "@/data/profile";

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EXPIRES_MINUTES = 30;
const TEMPLATE_FILE = join(process.cwd(), "brand/dist/cv-delivery-email.html");

const genericOk = { ok: true, message: "If that address is valid, a secure download link is on its way." };

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in → pretend success so bots don't retry.
  if (clean(body.website, 200)) return NextResponse.json(genericOk);

  const email = clean(body.email, 200).toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(`cv:${email}`, 60_000) || isRateLimited(`cv-ip:${ip}`, 15_000)) {
    return NextResponse.json({ error: "Please check your inbox, or try again in a minute." }, { status: 429 });
  }

  // Reject disposable/temporary addresses and domains that can't receive mail at all —
  // keeps the CV link from reaching a throwaway inbox an attacker uses to grab it.
  const emailCheck = await checkEmail(email);
  if (!emailCheck.valid) {
    return NextResponse.json({ error: emailCheck.reason }, { status: 422 });
  }

  const mailer = getMailer();
  const secret = process.env.CV_ACCESS_SECRET;
  if (!mailer || !secret) {
    console.error("CV request: GMAIL_USER/GMAIL_APP_PASSWORD or CV_ACCESS_SECRET is not configured.");
    return NextResponse.json({ error: "CV requests aren't configured yet." }, { status: 500 });
  }

  const token = issueCvToken(email, secret, EXPIRES_MINUTES * 60 * 1000);
  const downloadUrl = `${profile.links.portfolio}/api/cv/download?token=${token}`;

  let html: string;
  try {
    html = (await readFile(TEMPLATE_FILE, "utf8"))
      .replaceAll("{{ download_url }}", downloadUrl)
      .replaceAll("{{ expires_minutes }}", String(EXPIRES_MINUTES));
  } catch (err) {
    console.error("CV request: template read failed (run `npm run brand`):", err);
    return NextResponse.json({ error: "CV requests aren't configured yet." }, { status: 500 });
  }

  try {
    // Sent via Gmail SMTP as the real account — "from" is genuinely ahsankhan.ubit@
    // gmail.com (authenticated directly with Google), so it can reach ANY recipient,
    // unlike a third-party ESP's unverified-domain sandbox, which only delivers to
    // the account owner. See lib/mailer.ts.
    await mailer.sendMail({
      from: `${profile.name} <${process.env.GMAIL_USER}>`,
      to: email,
      // Lead notification: I see who requested the CV. Skipped when someone requests
      // it to my own address, so testing doesn't send a duplicate.
      bcc: email === profile.email ? undefined : profile.email,
      subject: `${profile.name} — your CV download link (expires in ${EXPIRES_MINUTES} minutes)`,
      html,
    });
  } catch (err) {
    console.error("CV request send failed:", err);
    return NextResponse.json({ error: "Couldn't send that right now. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json(genericOk);
}
