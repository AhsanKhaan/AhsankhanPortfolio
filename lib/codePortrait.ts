// Pure helpers behind the hero's code portrait: cut the person out of the profile photo,
// shrink it to a grid of brightness levels, and lay code glyphs over that grid.
// scripts/build-code-portrait.mjs runs the first two once and writes data/codePortrait.json;
// app/components/ui/CodePortrait.tsx draws the result. Tested in tests/unit/codePortrait.test.ts.

export type RGB = readonly [number, number, number];

export interface PortraitGrid {
  cols: number;
  rows: number;
  levels: number;
  // One string per row: "." for no person, "1".."levels" from darkest to brightest.
  grid: string[];
}

export interface SegmentOptions {
  bgDistance?: number; // how far (RGB) a pixel may sit from the nearest shade of the backdrop
  blendDistance?: number; // how far a pixel may sit from a backdrop-to-white blend
  outlineDepth?: number; // how far (px) the light sticker outline reaches from the backdrop
}

const WHITE: RGB = [255, 255, 255];

const isLight = (r: number, g: number, b: number) =>
  Math.min(r, g, b) >= 170 && Math.max(r, g, b) - Math.min(r, g, b) <= 60;

// Distance from colour p to the nearest point on the segment a→b in RGB space.
function segmentDistance(p: RGB, a: RGB, b: RGB): number {
  const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const len2 = ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2];
  const t = len2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * ab[0] + (p[1] - a[1]) * ab[1] + (p[2] - a[2]) * ab[2]) / len2)) : 0;
  return Math.hypot(p[0] - (a[0] + t * ab[0]), p[1] - (a[1] + t * ab[1]), p[2] - (a[2] + t * ab[2]));
}

// True for any shade of the backdrop colour (s · bg for s in 0.4..1.15), so the photo's
// own drop shadow on the backdrop counts as backdrop. Every shade line passes near black,
// so the pixel must also carry the backdrop's tint (its colour minus its own grey), at
// least half as strongly as that shade would; near-black hair and a dark suit do not.
export function isBackdrop(p: RGB, bg: RGB, maxDistance = 40): boolean {
  const len2 = bg[0] * bg[0] + bg[1] * bg[1] + bg[2] * bg[2];
  if (!len2) return false;
  const s = (p[0] * bg[0] + p[1] * bg[1] + p[2] * bg[2]) / len2;
  if (s < 0.4 || s > 1.15) return false;
  if (Math.hypot(p[0] - s * bg[0], p[1] - s * bg[1], p[2] - s * bg[2]) >= maxDistance) return false;
  const bgGrey = (bg[0] + bg[1] + bg[2]) / 3;
  const pGrey = (p[0] + p[1] + p[2]) / 3;
  const tint = [bg[0] - bgGrey, bg[1] - bgGrey, bg[2] - bgGrey];
  const tint2 = tint[0] * tint[0] + tint[1] * tint[1] + tint[2] * tint[2];
  if (!tint2) return true; // a grey backdrop has no tint to compare
  const along = ((p[0] - pGrey) * tint[0] + (p[1] - pGrey) * tint[1] + (p[2] - pGrey) * tint[2]) / tint2;
  return along >= 0.5 * s;
}

// 1 where the pixel belongs to the person. The backdrop is transparent pixels plus every
// shade of the backdrop colour; the light "sticker" outline is found by a breadth-first
// walk out of the backdrop, through light pixels and the anti-aliased blends between the
// backdrop and white, at most `outlineDepth` pixels deep, so a white shirt deeper inside
// the figure is kept.
export function segmentPerson(rgba: ArrayLike<number>, w: number, h: number, bg: RGB, opts: SegmentOptions = {}): Uint8Array {
  const bgDistance = opts.bgDistance ?? 40;
  const blendDistance = opts.blendDistance ?? 45;
  const outlineDepth = opts.outlineDepth ?? 18;
  const n = w * h;
  const removed = new Uint8Array(n);
  const depth = new Uint16Array(n);
  const queue = new Int32Array(n);
  const rgb = (i: number): RGB => [rgba[i * 4], rgba[i * 4 + 1], rgba[i * 4 + 2]];
  let head = 0;
  let tail = 0;

  for (let i = 0; i < n; i++) {
    if (rgba[i * 4 + 3] < 128 || isBackdrop(rgb(i), bg, bgDistance)) {
      removed[i] = 1;
      queue[tail++] = i;
    }
  }

  while (head < tail) {
    const i = queue[head++];
    if (depth[i] >= outlineDepth) continue;
    const x = i % w;
    const y = (i - x) / w;
    // A transparent pixel's colour means nothing, so blends are only walked from an
    // opaque one (the backdrop or the outline); from transparency only light pixels pass.
    const from = rgba[i * 4 + 3] >= 128 ? rgb(i) : null;
    const next = [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1];
    for (const j of next) {
      if (j < 0 || removed[j]) continue;
      const p = rgb(j);
      if (!isLight(p[0], p[1], p[2]) && (!from || segmentDistance(p, from, WHITE) >= blendDistance)) continue;
      removed[j] = 1;
      depth[j] = depth[i] + 1;
      queue[tail++] = j;
    }
  }

  const person = new Uint8Array(n);
  for (let i = 0; i < n; i++) person[i] = removed[i] ? 0 : 1;
  return person;
}

const luminance = (r: number, g: number, b: number) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

// Shrinks the masked photo to cols x rows cells. A cell needs `minCoverage` of its pixels
// on the person to count; its brightness is then stretched between the 2nd and 98th
// percentile of all person cells, so the face uses the whole range of levels.
export function buildGrid(
  rgba: ArrayLike<number>,
  person: ArrayLike<number>,
  w: number,
  h: number,
  cols: number,
  rows: number,
  levels: number,
  minCoverage = 0.45,
): PortraitGrid {
  const lum = new Float64Array(cols * rows).fill(Number.NaN);
  for (let r = 0; r < rows; r++) {
    const y0 = Math.floor((r * h) / rows);
    const y1 = Math.max(y0 + 1, Math.floor(((r + 1) * h) / rows));
    for (let c = 0; c < cols; c++) {
      const x0 = Math.floor((c * w) / cols);
      const x1 = Math.max(x0 + 1, Math.floor(((c + 1) * w) / cols));
      let count = 0;
      let sum = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = y * w + x;
          if (!person[i]) continue;
          count++;
          sum += luminance(rgba[i * 4], rgba[i * 4 + 1], rgba[i * 4 + 2]);
        }
      }
      if (count / ((x1 - x0) * (y1 - y0)) >= minCoverage) lum[r * cols + c] = sum / count;
    }
  }

  const values = Array.from(lum).filter((v) => !Number.isNaN(v)).sort((a, b) => a - b);
  const lo = values.length ? values[Math.floor(values.length * 0.02)] : 0;
  const hi = values.length ? values[Math.min(values.length - 1, Math.floor(values.length * 0.98))] : 1;
  const span = Math.max(1e-6, hi - lo);

  const grid: string[] = [];
  for (let r = 0; r < rows; r++) {
    let line = "";
    for (let c = 0; c < cols; c++) {
      const v = lum[r * cols + c];
      if (Number.isNaN(v)) {
        line += ".";
        continue;
      }
      const t = Math.max(0, Math.min(1, (v - lo) / span));
      line += String(1 + Math.min(levels - 1, Math.floor(t * levels)));
    }
    grid.push(line);
  }
  return { cols, rows, levels, grid };
}

// For each level, one string per row holding only that level's glyphs (spaces elsewhere),
// so a canvas draws a whole level with one fillText per row. Glyphs come from `source`,
// read as one continuous stream with spaces shown as "·" so the figure has no holes.
export function levelRows(p: PortraitGrid, source: string): string[][] {
  const stream = source.replace(/\s+/g, "·") || "·";
  const out: string[][] = Array.from({ length: p.levels }, () => []);
  let k = 0;
  for (let r = 0; r < p.rows; r++) {
    const lines: string[] = Array.from({ length: p.levels }, () => "");
    for (let c = 0; c < p.cols; c++) {
      const cell = p.grid[r][c];
      const level = cell === "." ? 0 : Number(cell);
      const glyph = level ? stream[k++ % stream.length] : " ";
      for (let l = 1; l <= p.levels; l++) lines[l - 1] += l === level ? glyph : " ";
    }
    for (let l = 0; l < p.levels; l++) out[l].push(lines[l].replace(/\s+$/, ""));
  }
  return out;
}

// For each level, per row, the runs of consecutive cells at that level as [startCol,
// length], so a canvas fills a whole run with one rectangle.
export function levelRuns(p: PortraitGrid): [number, number][][][] {
  const out: [number, number][][][] = Array.from({ length: p.levels }, () => []);
  for (let r = 0; r < p.rows; r++) {
    const rowRuns: [number, number][][] = Array.from({ length: p.levels }, () => []);
    let c = 0;
    while (c < p.cols) {
      const cell = p.grid[r][c];
      let end = c + 1;
      while (end < p.cols && p.grid[r][end] === cell) end++;
      if (cell !== ".") rowRuns[Number(cell) - 1].push([c, end - c]);
      c = end;
    }
    for (let l = 0; l < p.levels; l++) out[l].push(rowRuns[l]);
  }
  return out;
}
