// Refreshes data/githubStats.json (the contributions, pull requests and per-quarter chart on
// /contributions) from the major projects listed in data/majorProjects.json. Run monthly by
// .github/workflows/github-stats.yml; run it yourself any time:
//
//   GH_STATS_TOKEN=<token> node scripts/fetch-github-stats.mjs
//   node scripts/fetch-github-stats.mjs --fixture tests/fixtures/github-history.json --out /tmp/stats.json
//
// Commits are read from each repository's own git history (every branch, no merges), so
// they count whichever of Ahsan's addresses they carry, including the old one GitHub cannot
// credit. Pull requests come from GitHub's GraphQL API. With GH_STATS_TOKEN (read-only;
// README.md, "GitHub stats") private repositories are read too; without it, only public ones
// are, and the pull-request count is kept from the current file. Nothing is written unless
// the result passes the same check the page relies on.
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { isGithubStats, summarize } from "../lib/githubStats.ts";

const SINCE = "2020-01-01";
const OUT = "data/githubStats.json";
const arg = (name) => (process.argv.includes(name) ? process.argv[process.argv.indexOf(name) + 1] : undefined);
const out = arg("--out") ?? OUT;
const config = JSON.parse(readFileSync("data/majorProjects.json", "utf8"));
const token = process.env.GH_STATS_TOKEN;
const now = new Date();

// Every non-merge commit on every branch of one repository, as { hash, repo, email, date }.
function readHistory(repo) {
  const dir = mkdtempSync(join(tmpdir(), `gh-${repo}-`));
  // The token goes in a header, never in the URL, so it cannot show up in git's messages.
  const auth = token ? ["-c", `http.extraHeader=Authorization: Basic ${Buffer.from(`x-access-token:${token}`).toString("base64")}`] : [];
  try {
    execFileSync("git", [...auth, "clone", "--quiet", "--bare", "--filter=blob:none", `https://github.com/${config.owner}/${repo}.git`, dir], {
      stdio: "pipe",
      env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
    });
    const log = execFileSync("git", ["-C", dir, "log", "--all", "--no-merges", `--since=${SINCE}`, "--format=%H%x09%ae%x09%aI"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    return log
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [hash, email, date] = line.split("\t");
        return { hash, repo, email, date };
      });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// Ahsan's pull requests (any repository), as { owner, repo, createdAt }, newest first.
async function readPullRequests() {
  const prs = [];
  let after = null;
  for (let page = 0; page < 20; page++) {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "User-Agent": "portfolio-github-stats" },
      body: JSON.stringify({
        query: `query ($login: String!, $after: String) { user(login: $login) { pullRequests(first: 100, after: $after, orderBy: { field: CREATED_AT, direction: DESC }) { nodes { createdAt repository { name owner { login } } } pageInfo { hasNextPage endCursor } } } }`,
        variables: { login: config.owner, after },
      }),
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const body = await res.json();
    if (body.errors?.length) throw new Error(`GitHub API error: ${body.errors.map((e) => e.message).join("; ")}`);
    const conn = body.data.user.pullRequests;
    for (const n of conn.nodes) prs.push({ owner: n.repository.owner.login, repo: n.repository.name, createdAt: n.createdAt });
    if (!conn.pageInfo.hasNextPage || conn.nodes.at(-1)?.createdAt < SINCE) break;
    after = conn.pageInfo.endCursor;
  }
  return prs;
}

let commits = [];
let pullRequests = [];
let reposRead = 0;
const fixture = arg("--fixture");
if (fixture) {
  ({ commits, pullRequests } = JSON.parse(readFileSync(fixture, "utf8")));
  reposRead = new Set(commits.map((c) => c.repo)).size;
} else {
  const skipped = [];
  for (const repo of config.repos) {
    try {
      commits.push(...readHistory(repo));
      reposRead++;
    } catch {
      skipped.push(repo);
    }
  }
  if (skipped.length) console.warn(`Not read (${token ? "missing or no access" : "private, no token"}): ${skipped.join(", ")}`);
  if (token && skipped.length > config.repos.length / 2) {
    console.error("Refusing to write: most repositories could not be read (check the token's repository access).");
    process.exit(1);
  }
  if (token) {
    pullRequests = await readPullRequests();
  } else if (existsSync(OUT)) {
    console.warn("No GH_STATS_TOKEN: keeping the pull-request count from the current file.");
  }
}

const stats = summarize({
  commits,
  pullRequests,
  owner: config.owner,
  repos: config.repos,
  reposRead,
  authorEmails: config.authorEmails,
  since: SINCE,
  to: now.toISOString().slice(0, 10),
  generatedAt: now.toISOString(),
});
if (!fixture && !token && existsSync(OUT)) stats.pullRequests = JSON.parse(readFileSync(OUT, "utf8")).pullRequests ?? 0;
if (!isGithubStats(stats) || stats.commits === 0) {
  console.error("Refusing to write: the result is malformed or has no commits at all.");
  process.exit(1);
}
writeFileSync(out, JSON.stringify(stats, null, 2) + "\n");
console.log(`github stats: ${stats.commits} commits and ${stats.pullRequests} PRs across ${stats.repos} repos → ${out}`);
