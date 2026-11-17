// Lighthouse gate (Lighthouse 13.6: Performance, Accessibility, Best Practices, SEO and
// Agentic Browsing). Runs the pinned Lighthouse CLI against a running production server
// and fails when a page drops below the budgets in factory.config.json → budgets.lighthouse.
//   npm run build && npm start   (or NEXT_DIST_DIR=.next-preview ... next start -p 3100)
//   node scripts/lighthouse-gate.mjs http://localhost:3000
// Performance is checked on the desktop preset against a hard floor, and on mobile against
// a floor with 100 as the target (reported, not failed), because simulated slow-4G mobile
// scores vary by a few points between runs and machines.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const LIGHTHOUSE = "lighthouse@13.6.0";
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const paths = process.argv.slice(3).length ? process.argv.slice(3) : ["/", "/agency", "/contributions", "/for", "/cv"];
const budgets = JSON.parse(readFileSync("factory.config.json", "utf8")).budgets.lighthouse;
const out = mkdtempSync(join(tmpdir(), "lh-"));
const npx = process.platform === "win32" ? "npx.cmd" : "npx";

function run(url, preset, categories) {
  const file = join(out, `${preset}-${url.replace(/\W+/g, "_")}.json`);
  const args = ["-y", LIGHTHOUSE, url, "--quiet", "--output=json", `--output-path=${file}`, "--chrome-flags=--headless=new --no-sandbox"];
  if (preset === "desktop") args.push("--preset=desktop");
  if (categories) args.push(`--only-categories=${categories.join(",")}`);
  execFileSync(npx, args, { stdio: "inherit", shell: process.platform === "win32" });
  const report = JSON.parse(readFileSync(file, "utf8"));
  return Object.fromEntries(Object.values(report.categories).map((c) => [c.id, Math.round(c.score * 100)]));
}

const required = {
  accessibility: budgets.accessibility,
  "best-practices": budgets.bestPractices,
  seo: budgets.seo,
  "agentic-browsing": budgets.agenticBrowsing,
};

const failures = [];
const notes = [];
for (const path of paths) {
  const url = base + path;
  const mobile = run(url, "mobile");
  for (const [id, min] of Object.entries(required)) {
    if ((mobile[id] ?? 0) < min) failures.push(`${path} ${id} ${mobile[id]} < ${min}`);
  }
  if (mobile.performance < budgets.performanceMobileFloor)
    failures.push(`${path} mobile performance ${mobile.performance} < ${budgets.performanceMobileFloor}`);
  else if (mobile.performance < budgets.performanceTarget)
    notes.push(`${path} mobile performance ${mobile.performance} (target ${budgets.performanceTarget})`);

  const desktop = run(url, "desktop", ["performance"]);
  if (desktop.performance < budgets.performanceDesktop)
    failures.push(`${path} desktop performance ${desktop.performance} < ${budgets.performanceDesktop}`);

  console.log(
    `${path.padEnd(16)} mobile ${Object.entries(mobile).map(([k, v]) => `${k}:${v}`).join(" ")} | desktop performance:${desktop.performance}`,
  );
}

if (notes.length) console.log(`\nBelow target (not failing):\n  ${notes.join("\n  ")}`);
if (failures.length) {
  console.error(`\nlighthouse-gate: ${failures.length} budget failure(s)\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log("\nlighthouse-gate: all budgets met");
