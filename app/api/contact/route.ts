import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/data/profile";

const INQUIRY_LABELS: Record<string, string> = {
  fulltime: "Full-time role (Relocation)",
  remote: "Remote role",
  freelance: "Freelance project",
};

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in → pretend success so bots don't retry.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);
  const company = clean(body.company, 200);
  const budget = clean(body.budget, 50);
  const inquiry = INQUIRY_LABELS[clean(body.inquiry, 20)] ?? "General";

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a message." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  // Defaults to Ahsan's own inbox (brand/profile.json) so only RESEND_API_KEY needs to be set.
  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY is not configured.");
    return NextResponse.json({ error: "The contact form isn't configured yet." }, { status: 500 });
  }

  const rows = [
    ["Inquiry", inquiry],
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ...(budget ? [["Budget", budget]] : []),
  ];

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.CONTACT_FROM_EMAIL || `${profile.name} <onboarding@resend.dev>`,
      to,
      replyTo: email,
      subject: `[Portfolio] ${inquiry}: ${name}${company ? ` (${company})` : ""}`,
      html: `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">${rows
        .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
        .join("")}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ error: "Your message couldn't be sent right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
