// Refreshes data/githubStats.json (the commits, pull requests and per-quarter chart on
// /contributions) from GitHub's GraphQL API. Run monthly by .github/workflows/github-stats.yml;
// run it yourself any time:
//
//   GH_STATS_TOKEN=<token> node scripts/fetch-github-stats.mjs
//   node scripts/fetch-github-stats.mjs --fixture tests/fixtures/github-contributions.json
//
// GH_STATS_TOKEN is a read-only fine-grained token (README.md, "GitHub stats"). The API
// allows one year per query, so it asks once per year since SINCE. Nothing is written
// unless every query succeeds and the result passes the same check the page relies on.
import { readFileSync, writeFileSync } from "node:fs";
import { combineYears, isGithubStats } from "../lib/githubStats.ts";

const SINCE = "2020-01-01";
const OUT = "data/githubStats.json";
const profile = JSON.parse(readFileSync("brand/profile.json", "utf8"));
const login = new URL(profile.links.github).pathname.split("/").filter(Boolean)[0];

const QUERY = `query ($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      totalPullRequestContributions
      restrictedContributionsCount
      contributionCalendar { weeks { contributionDays { date contributionCount } } }
    }
  }
}`;

// One { from, to } window per calendar year, the last one ending now.
function yearWindows(since, now) {
  const windows = [];
  for (let y = Number(since.slice(0, 4)); y <= now.getUTCFullYear(); y++) {
    const from = y === Number(since.slice(0, 4)) ? `${since}T00:00:00Z` : `${y}-01-01T00:00:00Z`;
    const to = y === now.getUTCFullYear() ? now.toISOString() : `${y}-12-31T23:59:59Z`;
    windows.push({ from, to });
  }
  return windows;
}

async function fetchYear(token, from, to) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "User-Agent": "portfolio-github-stats" },
    body: JSON.stringify({ query: QUERY, variables: { login, from, to } }),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${from.slice(0, 4)}: ${(await res.text()).slice(0, 200)}`);
  const body = await res.json();
  if (body.errors?.length) throw new Error(`GitHub API error for ${from.slice(0, 4)}: ${body.errors.map((e) => e.message).join("; ")}`);
  const collection = body.data?.user?.contributionsCollection;
  if (!collection) throw new Error(`No contributions returned for ${login} in ${from.slice(0, 4)}`);
  return collection;
}

const now = new Date();
const fixtureArg = process.argv.indexOf("--fixture");
let years;
if (fixtureArg > -1) {
  years = JSON.parse(readFileSync(process.argv[fixtureArg + 1], "utf8"));
} else {
  const token = process.env.GH_STATS_TOKEN;
  if (!token) {
    console.error("GH_STATS_TOKEN is not set (README.md, \"GitHub stats\").");
    process.exit(1);
  }
  years = [];
  for (const { from, to } of yearWindows(SINCE, now)) years.push(await fetchYear(token, from, to));
}

const stats = combineYears(years, SINCE, now.toISOString().slice(0, 10), now.toISOString());
if (!isGithubStats(stats)) {
  console.error("Refusing to write: the result does not have the expected shape.");
  process.exit(1);
}
if (stats.commits + stats.pullRequests === 0) {
  console.error("Refusing to write: GitHub returned no commits or pull requests at all (check the token).");
  process.exit(1);
}
const out = process.argv.includes("--out") ? process.argv[process.argv.indexOf("--out") + 1] : OUT;
writeFileSync(out, JSON.stringify(stats, null, 2) + "\n");
console.log(`github stats: ${stats.commits} commits, ${stats.pullRequests} PRs, ${stats.privateContributions} private, ${stats.quarters.length} quarters → ${out}`);
