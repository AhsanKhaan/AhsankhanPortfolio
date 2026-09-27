import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { Resend } from "resend";
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

  const apiKey = process.env.RESEND_API_KEY;
  const secret = process.env.CV_ACCESS_SECRET;
  if (!apiKey || !secret) {
    console.error("CV request: RESEND_API_KEY or CV_ACCESS_SECRET is not configured.");
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
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // Display name is real; the address stays a Resend-verified domain until
      // CONTACT_FROM_EMAIL points at a domain you own — Resend rejects sending
      // "from" a gmail.com address you haven't (and can't) verify with them.
      // replyTo carries your real inbox instead, so a reply reaches you directly.
      from: process.env.CONTACT_FROM_EMAIL || `${profile.name} <onboarding@resend.dev>`,
      to: email,
      replyTo: profile.email,
      // Lead notification: I see who requested the CV. Skipped when someone requests
      // it to my own address, so testing doesn't send a duplicate.
      bcc: email === profile.email ? undefined : profile.email,
      subject: `${profile.name} — your CV download link (expires in ${EXPIRES_MINUTES} minutes)`,
      html,
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("CV request send failed:", err);
    return NextResponse.json({ error: "Couldn't send that right now. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json(genericOk);
}
