// Signed, time-limited tokens that gate the CV PDF (app/private/cv/…, never in public/).
// A visitor never gets a direct file link — /api/cv-request emails them one of these,
// and /api/cv/download verifies it before streaming the file.
//
// Trade-off: tokens expire (default 30 min) but aren't tracked as single-use across
// requests, since that needs persistent storage (e.g. Vercel KV/Upstash) this project
// doesn't have yet. Short expiry is the main defense; add a store later for true
// single-use links.
import { createHmac, timingSafeEqual } from "node:crypto";

const DEFAULT_TTL_MS = 30 * 60 * 1000;

function b64url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function sign(payloadB64: string, secret: string) {
  return createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

export function issueCvToken(email: string, secret: string, ttlMs = DEFAULT_TTL_MS): string {
  const payload = JSON.stringify({ email, exp: Date.now() + ttlMs });
  const payloadB64 = b64url(payload);
  return `${payloadB64}.${sign(payloadB64, secret)}`;
}

export type CvTokenResult = { ok: true; email: string } | { ok: false; reason: "malformed" | "signature" | "expired" };

export function verifyCvToken(token: string, secret: string): CvTokenResult {
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false, reason: "malformed" };
  const [payloadB64, signature] = parts;

  const expected = sign(payloadB64, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { ok: false, reason: "signature" };

  let payload: { email: string; exp: number };
  try {
    payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
  } catch {
    return { ok: false, reason: "malformed" };
  }
  if (typeof payload.exp !== "number" || Date.now() > payload.exp) return { ok: false, reason: "expired" };
  if (typeof payload.email !== "string" || !payload.email) return { ok: false, reason: "malformed" };

  return { ok: true, email: payload.email };
}
