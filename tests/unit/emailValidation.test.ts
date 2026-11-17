import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("node:dns/promises", () => ({ resolveMx: vi.fn() }));

import { resolveMx } from "node:dns/promises";
import { checkEmail } from "@/lib/emailValidation";

const mx = vi.mocked(resolveMx);

function dnsError(code: string) {
  return Object.assign(new Error(code), { code });
}

describe("checkEmail", () => {
  beforeEach(() => {
    mx.mockReset();
  });

  it("rejects an invalid format without a DNS lookup", async () => {
    expect((await checkEmail("not-an-email")).valid).toBe(false);
    expect(mx).not.toHaveBeenCalled();
  });

  it("rejects a disposable domain without a DNS lookup", async () => {
    expect((await checkEmail("someone@mailinator.com")).valid).toBe(false);
    expect(mx).not.toHaveBeenCalled();
  });

  it("accepts when MX records exist", async () => {
    mx.mockResolvedValue([{ exchange: "mx.gmail.com", priority: 10 }]);
    expect(await checkEmail("person@gmail.com")).toEqual({ valid: true });
    expect(mx).toHaveBeenCalledWith("gmail.com");
  });

  it("rejects an empty MX array", async () => {
    mx.mockResolvedValue([]);
    expect((await checkEmail("person@gmail.com")).valid).toBe(false);
  });

  it.each(["ENOTFOUND", "ENODATA"])("rejects on %s", async (code) => {
    mx.mockRejectedValue(dnsError(code));
    expect((await checkEmail("person@gmail.com")).valid).toBe(false);
  });

  it("lets inconclusive errors through", async () => {
    mx.mockRejectedValue(dnsError("ETIMEOUT"));
    expect(await checkEmail("person@gmail.com")).toEqual({ valid: true });
  });
});
