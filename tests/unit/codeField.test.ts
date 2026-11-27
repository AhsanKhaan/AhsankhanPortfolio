import { describe, expect, it } from "vitest";
import {
  SCRAMBLE_GLYPHS,
  buildCodeSource,
  decodeState,
  layoutGlyphs,
  scrambleGlyph,
  spotlight,
} from "@/lib/codeField";
import { profile } from "@/data/profile";

describe("buildCodeSource", () => {
  const source = buildCodeSource(profile);

  it("is built from the real profile, so the field never claims anything new", () => {
    expect(source).toContain(JSON.stringify(profile.name));
    expect(source).toContain(JSON.stringify(profile.title));
    expect(source).toContain(JSON.stringify(profile.location));
    for (const m of profile.metrics) expect(source).toContain(JSON.stringify(m.value));
  });

  it("is one line of code with no raw newlines", () => {
    expect(source).not.toMatch(/\n/);
  });

  it("leaves out the backend line when there is no backend stack", () => {
    const withoutBackend = buildCodeSource({ ...profile, backendStack: undefined });
    expect(withoutBackend).not.toContain("backend:");
  });
});

describe("layoutGlyphs", () => {
  it("fills exactly rows x cols, repeating the stream when it is short", () => {
    const lines = layoutGlyphs("const a = 1;", 7, 5);
    expect(lines).toHaveLength(5);
    for (const line of lines) expect(line).toHaveLength(7);
    expect(lines.join("")).toBe("const a = 1; ".repeat(3).slice(0, 35));
  });

  it("collapses whitespace into single spaces", () => {
    expect(layoutGlyphs("a\n\n   b\tc", 6, 1)[0]).toBe("a b c ");
  });

  it("returns nothing for an empty grid", () => {
    expect(layoutGlyphs("abc", 0, 4)).toEqual([]);
    expect(layoutGlyphs("abc", 4, 0)).toEqual([]);
  });
});

describe("scrambleGlyph", () => {
  it("always returns a glyph from the scramble set, even at the edges", () => {
    for (const r of [0, 0.25, 0.5, 0.999999, 1, -0.5]) {
      expect(SCRAMBLE_GLYPHS).toContain(scrambleGlyph(r));
    }
  });
});

describe("decodeState", () => {
  const cols = 100;
  const band = 10;

  it("starts fully hidden and ends fully resolved", () => {
    expect(decodeState(0, 0, cols, band)).toBe("hidden");
    expect(decodeState(cols - 1, 1, cols, band)).toBe("resolved");
  });

  it("shows a scramble band just ahead of the resolved text", () => {
    // front = 0.5 * 110 = 55: resolved below 45, scrambling 45..54, hidden from 55
    expect(decodeState(44, 0.5, cols, band)).toBe("resolved");
    expect(decodeState(45, 0.5, cols, band)).toBe("scramble");
    expect(decodeState(54, 0.5, cols, band)).toBe("scramble");
    expect(decodeState(55, 0.5, cols, band)).toBe("hidden");
  });

  it("holds a lagging row back but still finishes it at t = 1", () => {
    expect(decodeState(40, 0.5, cols, band, 12)).toBe("scramble");
    expect(decodeState(cols - 1, 1, cols, band, 12)).toBe("resolved");
  });

  it("clamps t outside 0..1", () => {
    expect(decodeState(0, -1, cols, band)).toBe("hidden");
    expect(decodeState(cols - 1, 2, cols, band)).toBe("resolved");
  });
});

describe("spotlight", () => {
  it("is 1 at the centre, 0 at and past the radius", () => {
    expect(spotlight(0, 100)).toBe(1);
    expect(spotlight(100, 100)).toBe(0);
    expect(spotlight(250, 100)).toBe(0);
  });

  it("eases smoothly and never increases with distance", () => {
    expect(spotlight(50, 100)).toBeCloseTo(0.5);
    let last = 1;
    for (let d = 0; d <= 100; d += 5) {
      const k = spotlight(d, 100);
      expect(k).toBeLessThanOrEqual(last);
      last = k;
    }
  });

  it("is 0 for a zero radius", () => {
    expect(spotlight(0, 0)).toBe(0);
  });
});
