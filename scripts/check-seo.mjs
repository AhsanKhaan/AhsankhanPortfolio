// On-page SEO gate for the production build (modelled on Calculator Porch's seo-checks).
// Reads the prerendered HTML Next writes to <distDir>/server/app and fails on any page that
// breaks a rule below. Run after `npm run build` (CI does this in ci.yml).
//   node scripts/check-seo.mjs            -> checks .next (or $NEXT_DIST_DIR)
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const distDir = process.env.NEXT_DIST_DIR || ".next";
const appDir = join(distDir, "server", "app");
const SITE = "https://ahsankhaan.vercel.app";

// Public, indexable pages. Internal tools (/brand) are not listed on purpose.
const pages = {
  "/": "index.html",
  "/agency": "agency.html",
  "/contributions": "contributions.html",
  "/for": "for.html",
  "/for/tech-recruiters": "for/tech-recruiters.html",
  "/for/remote-hiring": "for/remote-hiring.html",
  "/for/relocation-sponsorship": "for/relocation-sponsorship.html",
  "/for/talent-acquisition": "for/talent-acquisition.html",
  "/cv": "cv.html",
};

const rules = { titleMin: 30, titleMax: 65, descMin: 70, descMax: 160 };

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];

const failures = [];
const titles = new Map();
const descriptions = new Map();

if (!existsSync(appDir)) {
  console.error(`check-seo: ${appDir} not found. Run the production build first.`);
  process.exit(2);
}

for (const [route, file] of Object.entries(pages)) {
  const path = join(appDir, file);
  const fail = (msg) => failures.push(`${route}: ${msg}`);
  if (!existsSync(path)) {
    fail(`not prerendered (${file} missing)`);
    continue;
  }
  const html = readFileSync(path, "utf8");
  const head = html.split("</head>")[0];

  const title = decode(head.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  if (!title) fail("no <title>");
  else if (title.length < rules.titleMin || title.length > rules.titleMax)
    fail(`title is ${title.length} chars (want ${rules.titleMin}-${rules.titleMax}): "${title}"`);
  if (titles.has(title)) fail(`duplicate title with ${titles.get(title)}`);
  titles.set(title, route);

  const descTag = head.match(/<meta name="description"[^>]*>/)?.[0];
  const desc = decode(descTag ? attr(descTag, "content") ?? "" : "");
  if (!desc) fail("no meta description");
  else if (desc.length < rules.descMin || desc.length > rules.descMax)
    fail(`description is ${desc.length} chars (want ${rules.descMin}-${rules.descMax})`);
  if (desc && descriptions.has(desc)) fail(`duplicate description with ${descriptions.get(desc)}`);
  descriptions.set(desc, route);

  const canonicalTag = head.match(/<link rel="canonical"[^>]*>/)?.[0];
  const canonical = canonicalTag ? attr(canonicalTag, "href") : undefined;
  const expected = route === "/" ? SITE : `${SITE}${route}`;
  if (!canonical) fail("no canonical");
  else if (canonical.replace(/\/$/, "") !== expected.replace(/\/$/, "")) fail(`canonical ${canonical}, expected ${expected}`);

  if (/<meta name="robots" content="[^"]*noindex/.test(head)) fail("page is noindex");
  if (!/<html[^>]* lang="en"/.test(html)) fail('missing <html lang="en">');
  if (!/<meta name="viewport"/.test(head)) fail("no viewport meta");

  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) fail(`${h1s} <h1> elements (want exactly 1)`);

  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\balt="/.test(img)) fail(`img without alt: ${img.slice(0, 80)}`);
  }

  for (const block of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(block[1]);
    } catch {
      fail("JSON-LD block does not parse");
    }
  }
}

if (failures.length) {
  console.error(`check-seo: ${failures.length} problem(s)\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log(`check-seo: ${Object.keys(pages).length} pages pass (title, description, canonical, h1, alt, JSON-LD, lang, viewport)`);
