import { afterEach, describe, expect, it, vi } from "vitest";
import { isRateLimited } from "@/lib/rateLimit";

describe("isRateLimited", () => {
  afterEach(() => vi.useRealTimers());

  it("does not limit the first call", () => {
    expect(isRateLimited("rl-first", 1000)).toBe(false);
  });

  it("limits a second call within the window", () => {
    expect(isRateLimited("rl-second", 1000)).toBe(false);
    expect(isRateLimited("rl-second", 1000)).toBe(true);
  });

  it("allows again after the window passes", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    expect(isRateLimited("rl-window", 1000)).toBe(false);
    vi.advanceTimersByTime(999);
    expect(isRateLimited("rl-window", 1000)).toBe(true);
    vi.setSystemTime(new Date("2026-01-01T00:00:02Z"));
    expect(isRateLimited("rl-window", 1000)).toBe(false);
  });

  it("tracks keys independently", () => {
    expect(isRateLimited("rl-key-a", 1000)).toBe(false);
    expect(isRateLimited("rl-key-b", 1000)).toBe(false);
    expect(isRateLimited("rl-key-a", 1000)).toBe(true);
  });
});
