// One-off generator for LinkedIn/GitHub profile + cover images, built from brand/tokens.json.
// Not part of the app build — run manually: node scripts/generate-social-images.mjs
import sharp from "sharp";
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const tokens = JSON.parse(readFileSync(path.join(root, "brand/tokens.json"), "utf-8"));
const c = tokens.primitive.color;
const BLUE = c["blue-400"];
const EMERALD = c["emerald-400"];
const BLACK = c["black"];
const TEXT = c["neutral-200"];
const MUTED = c["neutral-400"];

const outDir = path.join(root, "public/brand/social");
mkdirSync(outDir, { recursive: true });

const FONT = "Arial, Helvetica, sans-serif";

// The source photo sits on a flat teal backdrop with a white "sticker" outline around the person.
// Flood-fill from the teal through teal/outline-white pixels to isolate just the person.
async function cutoutPerson(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const n = W * H;
  const bgLike = new Uint8Array(n);
  const bg = new Uint8Array(n);
  const queue = new Int32Array(n);
  let head = 0;
  let tail = 0;

  for (let p = 0; p < n; p++) {
    const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2];
    const min = Math.min(r, g, b), max = Math.max(r, g, b);
    const tealish = g > r + 25 && b > r + 15;
    const outlineWhite = min > 185 && max - min < 14;
    bgLike[p] = tealish || outlineWhite ? 1 : 0;
    if (r < 10 && Math.abs(g - 136) < 12 && Math.abs(b - 123) < 12) {
      bg[p] = 1;
      queue[tail++] = p;
    }
  }
  while (head < tail) {
    const p = queue[head++];
    const x = p % W, y = (p / W) | 0;
    const neighbours = [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, y > 0 ? p - W : -1, y < H - 1 ? p + W : -1];
    for (const q of neighbours) {
      if (q >= 0 && !bg[q] && bgLike[q]) {
        bg[q] = 1;
        queue[tail++] = q;
      }
    }
  }

  // Absorb stray outline flecks the flood couldn't reach (walled off by 1px of anti-aliasing).
  for (let pass = 0; pass < 3; pass++) {
    const absorbed = [];
    for (let p = 0; p < n; p++) {
      if (bg[p]) continue;
      const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2];
      if (Math.min(r, g, b) <= 170 || Math.max(r, g, b) - Math.min(r, g, b) >= 18) continue;
      const x = p % W, y = (p / W) | 0;
      let nearBg = false;
      for (let dy = -2; !nearBg && dy <= 2; dy++) {
        for (let dx = -2; !nearBg && dx <= 2; dx++) {
          const xx = x + dx, yy = y + dy;
          if (xx >= 0 && xx < W && yy >= 0 && yy < H && bg[yy * W + xx]) nearBg = true;
        }
      }
      if (nearBg) absorbed.push(p);
    }
    for (const p of absorbed) bg[p] = 1;
  }

  // Erode 1px so the grey anti-aliasing between the old outline and the hair/blazer doesn't halo.
  const rgba = Buffer.alloc(n * 4);
  let top = H, minX = W, maxX = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      let person = !bg[p];
      for (let dy = -1; person && dy <= 1; dy++) {
        for (let dx = -1; person && dx <= 1; dx++) {
          const xx = x + dx, yy = y + dy;
          if (xx >= 0 && xx < W && yy >= 0 && yy < H && bg[yy * W + xx]) person = false;
        }
      }
      const o = p * 4;
      if (person) {
        rgba[o] = data[p * 3];
        rgba[o + 1] = data[p * 3 + 1];
        rgba[o + 2] = data[p * 3 + 2];
        rgba[o + 3] = 255;
        if (y < top) top = y;
      } else {
        rgba[o] = rgba[o + 1] = rgba[o + 2] = 18;
      }
    }
  }
  // Horizontal centre of the head, measured across the first ~120px of the silhouette.
  for (let y = top; y < top + 120; y++) {
    for (let x = 0; x < W; x++) {
      if (rgba[(y * W + x) * 4 + 3]) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
      }
    }
  }
  return { rgba, W, H, headTop: top, headCenterX: (minX + maxX) / 2 };
}

// ---------- 1. LinkedIn / GitHub profile picture (800x800, circular) ----------
async function profilePicture() {
  const size = 800;
  const person = await cutoutPerson(path.join(root, "public/assets/ahsankhan.png"));

  // LinkedIn's own guidance: face fills roughly 60% of the frame, a little headroom above the hair.
  const scale = 1.6;
  const headroom = 70;
  const scaledW = Math.round(person.W * scale);
  const scaledH = Math.round(person.H * scale);
  const left = Math.round(size / 2 - person.headCenterX * scale);
  const top = Math.round(headroom - person.headTop * scale);

  const resized = await sharp(person.rgba, { raw: { width: person.W, height: person.H, channels: 4 } })
    .resize(scaledW, scaledH, { kernel: "lanczos3" })
    .png()
    .toBuffer();
  // Feather only the alpha so the cut-out edge (mostly hair) reads soft instead of stair-stepped.
  const softAlpha = await sharp(resized).extractChannel(3).blur(1.4).raw().toBuffer();
  // Separate pipeline: sharp runs removeAlpha after joinChannel regardless of call order.
  const rgb = await sharp(resized).removeAlpha().sharpen({ sigma: 0.6 }).raw().toBuffer();
  const scaledPerson = await sharp(rgb, { raw: { width: scaledW, height: scaledH, channels: 3 } })
    .joinChannel(softAlpha, { raw: { width: scaledW, height: scaledH, channels: 1 } })
    .png()
    .toBuffer();

  // Clip to the canvas — the scaled photo overhangs the bottom edge.
  const visibleW = Math.min(scaledW, size - Math.max(left, 0));
  const visibleH = Math.min(scaledH, size - Math.max(top, 0));
  const personLayer = await sharp(scaledPerson)
    .extract({ left: Math.max(-left, 0), top: Math.max(-top, 0), width: visibleW, height: visibleH })
    .toBuffer();

  // Studio-style backdrop: lit slate behind the head, falling off to the brand's deep ink at the edges.
  const backdrop = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <defs>
      <radialGradient id="studio" cx="50%" cy="40%" r="62%">
        <stop offset="0%" stop-color="#4B5E7A"/>
        <stop offset="45%" stop-color="#26354B"/>
        <stop offset="100%" stop-color="#0B1220"/>
      </radialGradient>
    </defs>
    <rect width="${size}" height="${size}" fill="url(#studio)"/>
  </svg>`;

  const circleMask = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`;

  const ringWidth = 10;
  const ring = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <defs>
      <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${BLUE}"/>
        <stop offset="100%" stop-color="${EMERALD}"/>
      </linearGradient>
    </defs>
    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - ringWidth / 2 - 1}" fill="none" stroke="url(#ring)" stroke-width="${ringWidth}"/>
  </svg>`;

  const flattened = await sharp(Buffer.from(backdrop))
    .composite([{ input: personLayer, left: Math.max(left, 0), top: Math.max(top, 0) }])
    .png()
    .toBuffer();

  await sharp(flattened)
    .composite([
      { input: Buffer.from(circleMask), blend: "dest-in" },
      { input: Buffer.from(ring) },
    ])
    .png()
    .toFile(path.join(outDir, "profile-picture.png"));

  console.log("Wrote profile-picture.png (800x800, circular)");
}

// ---------- 2. LinkedIn cover banner (1584x396) ----------
async function linkedinCover() {
  const w = 1584;
  const h = 396;
  // LinkedIn overlays the round profile photo over roughly the bottom-left ~300x300px —
  // keep that zone clear and anchor content to the right two-thirds.
  const stack = ["React", "Next.js", "TypeScript", "Node.js", "Java", "PHP"];
  const chipGap = 14;
  let chipX = 620;
  const chipY = h - 96;
  const chips = stack
    .map((s) => {
      const chipW = 22 + s.length * 12;
      const svgChip = `
        <rect x="${chipX}" y="${chipY}" width="${chipW}" height="40" rx="20" fill="rgba(96,165,250,0.10)" stroke="rgba(96,165,250,0.35)" stroke-width="1.5"/>
        <text x="${chipX + chipW / 2}" y="${chipY + 26}" font-family="${FONT}" font-size="16" font-weight="600" fill="${TEXT}" text-anchor="middle">${s}</text>`;
      chipX += chipW + chipGap;
      return svgChip;
    })
    .join("\n");

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="headline" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${BLUE}"/>
        <stop offset="100%" stop-color="${EMERALD}"/>
      </linearGradient>
      <radialGradient id="glow" cx="80%" cy="30%" r="70%">
        <stop offset="0%" stop-color="${EMERALD}" stop-opacity="0.16"/>
        <stop offset="100%" stop-color="${EMERALD}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="${BLACK}"/>
    <rect width="${w}" height="${h}" fill="url(#glow)"/>

    <text x="620" y="150" font-family="${FONT}" font-size="58" font-weight="900" fill="url(#headline)">AHSAN KHAN</text>
    <text x="620" y="196" font-family="${FONT}" font-size="24" font-weight="400" fill="${MUTED}" letter-spacing="0.5">Senior Full Stack &amp; Frontend Engineer</text>

    <text x="620" y="248" font-family="${FONT}" font-size="19" font-weight="400" fill="${TEXT}">Fintech &amp; food-tech platforms · 100K+ users served · open to relocate, remote &amp; freelance</text>

    ${chips}
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(path.join(outDir, "linkedin-cover.png"));
  console.log("Wrote linkedin-cover.png (1584x396)");
}

// ---------- 3. GitHub profile README banner (1200x300) ----------
async function githubBanner() {
  const w = 1200;
  const h = 300;
  const stack = ["React", "Next.js", "TypeScript", "Node.js", "Java", "PHP", "MongoDB", "PostgreSQL"];
  const chipGap = 12;
  let chipX = 60;
  const chipY = h - 76;
  const chips = stack
    .map((s) => {
      const chipW = 20 + s.length * 11;
      const svgChip = `
        <rect x="${chipX}" y="${chipY}" width="${chipW}" height="36" rx="18" fill="rgba(96,165,250,0.10)" stroke="rgba(96,165,250,0.35)" stroke-width="1.5"/>
        <text x="${chipX + chipW / 2}" y="${chipY + 24}" font-family="${FONT}" font-size="14" font-weight="600" fill="${TEXT}" text-anchor="middle">${s}</text>`;
      chipX += chipW + chipGap;
      return svgChip;
    })
    .join("\n");

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="headline" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${BLUE}"/>
        <stop offset="100%" stop-color="${EMERALD}"/>
      </linearGradient>
      <radialGradient id="glow" cx="15%" cy="50%" r="60%">
        <stop offset="0%" stop-color="${BLUE}" stop-opacity="0.14"/>
        <stop offset="100%" stop-color="${BLUE}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="${BLACK}"/>
    <rect width="${w}" height="${h}" fill="url(#glow)"/>

    <text x="60" y="108" font-family="${FONT}" font-size="46" font-weight="900" fill="url(#headline)">AHSAN KHAN</text>
    <text x="60" y="146" font-family="${FONT}" font-size="20" font-weight="400" fill="${MUTED}">Senior Full Stack &amp; Frontend Engineer · github.com/AhsanKhaan</text>
    <text x="60" y="182" font-family="${FONT}" font-size="16" font-weight="400" fill="${TEXT}">Building fintech &amp; food-tech platforms with React, Next.js, Java, Node.js and PHP</text>

    ${chips}
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(path.join(outDir, "github-banner.png"));
  console.log("Wrote github-banner.png (1200x300)");
}

await profilePicture();
await linkedinCover();
await githubBanner();
console.log("Done. Files in public/brand/social/");
