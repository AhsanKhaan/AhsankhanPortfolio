// Turns the profile photo into data/codePortrait.json, the brightness grid the hero's code
// portrait draws (app/components/ui/CodePortrait.tsx). Run it again after changing the photo:
//
//   node scripts/build-code-portrait.mjs [photo] [cols]
//
// The photo itself is never modified. sharp ships with Next.js, so nothing extra is needed.
import { writeFileSync } from "node:fs";
import sharp from "sharp";
import { buildGrid, segmentPerson } from "../lib/codePortrait.ts";

const photo = process.argv[2] ?? "public/assets/Profile-v3.png";
const cols = Number(process.argv[3] ?? 120);
const LEVELS = 6;
// Cell width / cell height. Rows are a little shorter than a glyph is tall (CodePortrait
// squeezes the glyphs to fit), which doubles the vertical detail of the face.
const CELL_ASPECT = 0.8;

const { data, info } = await sharp(photo).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;

// The backdrop colour is the photo's top-centre pixel (the flat disc behind the person).
const top = Math.floor(w / 2) * 4 + 4 * w * 4;
const bg = [data[top], data[top + 1], data[top + 2]];

const person = segmentPerson(data, w, h, bg);
const rows = Math.round(cols * (h / w) * CELL_ASPECT);
const grid = buildGrid(data, person, w, h, cols, rows, LEVELS);

writeFileSync("data/codePortrait.json", JSON.stringify({ source: photo, width: w, height: h, ...grid }) + "\n");
console.log(`code portrait: ${cols}x${rows} cells, ${LEVELS} levels, backdrop rgb(${bg.join(", ")}) → data/codePortrait.json`);
