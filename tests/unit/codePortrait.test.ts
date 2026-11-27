import { describe, expect, it } from "vitest";
import { buildGrid, isBackdrop, levelRows, levelRuns, segmentPerson, type RGB } from "@/lib/codePortrait";
import portrait from "@/data/codePortrait.json";

const TEAL: RGB = [0, 136, 123];

// A w x h RGBA image filled with `fill`, with `paint(x, y)` overriding single pixels.
function image(w: number, h: number, fill: RGB, paint: (x: number, y: number) => RGB | null = () => null) {
  const px = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const c = paint(x, y) ?? fill;
      px.set([c[0], c[1], c[2], 255], (y * w + x) * 4);
    }
  }
  return px;
}

describe("isBackdrop", () => {
  it("accepts the backdrop and its darker shadow shades", () => {
    expect(isBackdrop(TEAL, TEAL)).toBe(true);
    expect(isBackdrop([0, 77, 69], TEAL)).toBe(true);
    expect(isBackdrop([0, 115, 103], TEAL)).toBe(true);
  });

  it("rejects near-black hair, dark grey, skin and white", () => {
    for (const p of [[13, 13, 4], [30, 40, 45], [60, 70, 75], [167, 124, 117], [255, 255, 255]] as RGB[]) {
      expect(isBackdrop(p, TEAL)).toBe(false);
    }
  });
});

describe("segmentPerson", () => {
  // 12 x 12: teal backdrop, a 2px white outline ring around a dark 6 x 6 figure, with one
  // white "shirt" pixel in the figure's middle.
  const w = 12;
  const h = 12;
  const px = image(w, h, TEAL, (x, y) => {
    const inFigure = x >= 3 && x <= 8 && y >= 3 && y <= 8;
    const inRing = x >= 1 && x <= 10 && y >= 1 && y <= 10 && !inFigure;
    if (x === 5 && y === 5) return [250, 250, 250];
    if (inFigure) return [20, 20, 20];
    if (inRing) return [255, 255, 255];
    return null;
  });
  const mask = segmentPerson(px, w, h, TEAL, { outlineDepth: 2 });
  const at = (x: number, y: number) => mask[y * w + x];

  it("removes the backdrop and the light outline that touches it", () => {
    expect(at(0, 0)).toBe(0);
    expect(at(1, 1)).toBe(0);
    expect(at(2, 6)).toBe(0);
  });

  it("keeps the figure, including a white shirt deeper than the outline", () => {
    expect(at(3, 3)).toBe(1);
    expect(at(8, 8)).toBe(1);
    expect(at(5, 5)).toBe(1);
  });

  it("walks through an anti-aliased backdrop-to-white blend", () => {
    const blended = image(6, 1, TEAL, (x) => (x === 1 ? [128, 196, 189] : x >= 2 && x <= 3 ? [255, 255, 255] : x >= 4 ? [20, 20, 20] : null));
    const m = segmentPerson(blended, 6, 1, TEAL);
    expect(Array.from(m)).toEqual([0, 0, 0, 0, 1, 1]);
  });

  it("treats transparent pixels as backdrop", () => {
    const px2 = new Uint8ClampedArray([20, 20, 20, 0, 20, 20, 20, 255]);
    expect(Array.from(segmentPerson(px2, 2, 1, TEAL))).toEqual([0, 1]);
  });
});

describe("buildGrid", () => {
  it("marks cells without enough person pixels as empty", () => {
    const px = image(4, 2, [100, 100, 100]);
    const person = new Uint8Array([1, 1, 0, 0, 1, 1, 0, 0]);
    const g = buildGrid(px, person, 4, 2, 2, 1, 6);
    expect(g.grid).toEqual(["1."]);
  });

  it("spreads brightness over all levels, darkest to brightest", () => {
    const w = 10;
    const px = image(w, 1, [0, 0, 0], (x) => [x * 25, x * 25, x * 25]);
    const g = buildGrid(px, new Uint8Array(w).fill(1), w, 1, w, 1, 5);
    const levels = g.grid[0].split("").map(Number);
    expect(levels[0]).toBe(1);
    expect(levels[w - 1]).toBe(5);
    expect([...levels].sort((a, b) => a - b)).toEqual(levels);
  });
});

describe("levelRows", () => {
  const grid = { cols: 4, rows: 2, levels: 2, grid: ["12.2", "..11"] };
  const out = levelRows(grid, "ab c");

  it("writes each level's cells with the next glyph of the stream, spaces as ·", () => {
    // stream "ab·c": row 0 takes a, b, · and row 1 takes c, then wraps to a
    expect(out[0]).toEqual(["a", "  ca"]);
    expect(out[1]).toEqual([" b ·", ""]);
  });

  it("keeps every glyph in its own column", () => {
    for (const rows of out) for (const line of rows) expect(line.length).toBeLessThanOrEqual(grid.cols);
  });
});

describe("levelRuns", () => {
  it("groups consecutive cells of a level into [start, length] runs per row", () => {
    const runs = levelRuns({ cols: 6, rows: 2, levels: 2, grid: ["11.122", "222..1"] });
    expect(runs[0]).toEqual([[[0, 2], [3, 1]], [[5, 1]]]);
    expect(runs[1]).toEqual([[[4, 2]], [[0, 3]]]);
  });
});

describe("data/codePortrait.json", () => {
  it("matches its own size and level count", () => {
    expect(portrait.grid).toHaveLength(portrait.rows);
    for (const row of portrait.grid) {
      expect(row).toHaveLength(portrait.cols);
      expect(row).toMatch(new RegExp(`^[.1-${portrait.levels}]+$`));
    }
  });

  it("holds a figure: every level is used and the corners are empty", () => {
    const cells = portrait.grid.join("");
    for (let l = 1; l <= portrait.levels; l++) expect(cells).toContain(String(l));
    expect(portrait.grid[0][0]).toBe(".");
    expect(portrait.grid[0][portrait.cols - 1]).toBe(".");
  });
});
