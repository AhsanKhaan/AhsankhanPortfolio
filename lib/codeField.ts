// Pure helpers behind the hero's code field (app/components/ui/CodeField.tsx): the text
// it shows, how that text fills a grid, the one-time decode sweep and the pointer
// spotlight. No DOM here, so every rule is unit-tested in tests/unit/codeField.test.ts.

export interface CodeFieldProfile {
  name: string;
  title: string;
  location: string;
  backendStack?: string;
  availability: string[];
  metrics: { value: string; label: string }[];
}

// Glyphs a cell flickers through while it is decoding or under the pointer.
export const SCRAMBLE_GLYPHS = "#%&*+=<>/\\|{}[]$01";

const quote = (s: string) => JSON.stringify(s);

// The field reads as real TypeScript about the real person: every value comes from
// brand/profile.json, so it never claims something the rest of the site doesn't.
export function buildCodeSource(p: CodeFieldProfile): string {
  const metrics = p.metrics
    .map((m) => `{ value: ${quote(m.value)}, label: ${quote(m.label)} }`)
    .join(", ");
  return [
    `import type { Engineer, Metric } from "@/types";`,
    `export const engineer: Engineer = {`,
    `name: ${quote(p.name)}, title: ${quote(p.title)}, location: ${quote(p.location)},`,
    `frontend: ["React", "Next.js", "TypeScript", "Tailwind"],`,
    p.backendStack ? `backend: ${quote(p.backendStack)},` : "",
    `availability: [${p.availability.map(quote).join(", ")}],`,
    `};`,
    `export const metrics: Metric[] = [${metrics}];`,
    `export async function ship(feature: Feature): Promise<Release> {`,
    `const plan = await scope(feature); const tests = await writeTests(plan);`,
    `const build = await implement(plan, { a11y: true, perf: "budgeted" });`,
    `await review(build, tests); return deploy(build, { preview: true });`,
    `}`,
  ]
    .filter(Boolean)
    .join(" ");
}

// Collapses all whitespace so the code flows as one continuous stream, then cuts it into
// `rows` lines of exactly `cols` characters, repeating the stream as often as needed.
export function layoutGlyphs(source: string, cols: number, rows: number): string[] {
  if (cols <= 0 || rows <= 0) return [];
  const stream = source.replace(/\s+/g, " ").trim() + " ";
  const need = cols * rows;
  const text = stream.repeat(Math.ceil(need / stream.length));
  const lines: string[] = [];
  for (let r = 0; r < rows; r++) lines.push(text.slice(r * cols, (r + 1) * cols));
  return lines;
}

// Maps a random number in [0, 1) to a scramble glyph.
export function scrambleGlyph(rand: number): string {
  const i = Math.min(SCRAMBLE_GLYPHS.length - 1, Math.max(0, Math.floor(rand * SCRAMBLE_GLYPHS.length)));
  return SCRAMBLE_GLYPHS[i];
}

export type CellState = "hidden" | "scramble" | "resolved";

// The load-time sweep, left to right: at progress t (0..1) a front crosses the row, with a
// band of `band` scrambling columns ahead of the resolved text. `lag` (in columns) delays a
// row so the edge reads ragged rather than ruled.
export function decodeState(col: number, t: number, cols: number, band: number, lag = 0): CellState {
  const front = Math.max(0, Math.min(1, t)) * (cols + band + lag) - lag;
  if (col < front - band) return "resolved";
  if (col < front) return "scramble";
  return "hidden";
}

// Spotlight strength for a cell `distance` px from the pointer: 1 at the centre, easing
// smoothly to 0 at `radius` and beyond.
export function spotlight(distance: number, radius: number): number {
  if (radius <= 0 || distance >= radius) return 0;
  const x = 1 - Math.max(0, distance) / radius;
  return x * x * (3 - 2 * x);
}

// The same sweep as decodeState, as two column counts for a whole row: cells before
// `resolved` show their code, cells from `resolved` up to `scrambled` are scrambling, and
// the rest are hidden. Lets a canvas draw only the cells that changed since the last frame.
export function decodeSpan(t: number, cols: number, band: number, lag = 0): { resolved: number; scrambled: number } {
  const front = Math.max(0, Math.min(1, t)) * (cols + band + lag) - lag;
  const clampCols = (n: number) => Math.max(0, Math.min(cols, Math.ceil(n)));
  return { resolved: clampCols(front - band), scrambled: clampCols(front) };
}
