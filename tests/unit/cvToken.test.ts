import { createHmac } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import { issueCvToken, verifyCvToken } from "@/lib/cvToken";

const SECRET = "test-secret";

function signedToken(payload: string, secret = SECRET) {
  const payloadB64 = Buffer.from(payload).toString("base64url");
  const sig = createHmac("sha256", secret).update(payloadB64).digest("base64url");
  return `${payloadB64}.${sig}`;
}

describe("cvToken", () => {
  afterEach(() => vi.useRealTimers());

  it("round-trips the email", () => {
    const token = issueCvToken("a@example.com", SECRET);
    expect(verifyCvToken(token, SECRET)).toEqual({ ok: true, email: "a@example.com" });
  });

  it("rejects a wrong secret as signature", () => {
    const token = issueCvToken("a@example.com", SECRET);
    expect(verifyCvToken(token, "other-secret")).toEqual({ ok: false, reason: "signature" });
  });

  it("rejects a tampered payload as signature", () => {
    const [, sig] = issueCvToken("a@example.com", SECRET).split(".");
    const forged = Buffer.from(JSON.stringify({ email: "evil@example.com", exp: Date.now() + 1e6 })).toString("base64url");
    expect(verifyCvToken(`${forged}.${sig}`, SECRET)).toEqual({ ok: false, reason: "signature" });
  });

  it("rejects tokens without exactly one dot as malformed", () => {
    expect(verifyCvToken("nodots", SECRET)).toEqual({ ok: false, reason: "malformed" });
    expect(verifyCvToken("a.b.c", SECRET)).toEqual({ ok: false, reason: "malformed" });
  });

  it("rejects an expired token", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const token = issueCvToken("a@example.com", SECRET, 1000);
    expect(verifyCvToken(token, SECRET).ok).toBe(true);
    vi.setSystemTime(new Date("2026-01-01T00:00:01.001Z"));
    expect(verifyCvToken(token, SECRET)).toEqual({ ok: false, reason: "expired" });
  });

  it("rejects a correctly signed non-JSON payload as malformed", () => {
    expect(verifyCvToken(signedToken("not json"), SECRET)).toEqual({ ok: false, reason: "malformed" });
  });

  it("rejects a correctly signed payload without an email as malformed", () => {
    const token = signedToken(JSON.stringify({ exp: Date.now() + 60_000 }));
    expect(verifyCvToken(token, SECRET)).toEqual({ ok: false, reason: "malformed" });
  });
});
