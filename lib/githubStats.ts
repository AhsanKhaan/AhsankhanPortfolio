// Pure helpers for the GitHub numbers on /contributions. scripts/fetch-github-stats.mjs uses
// them to turn the git history of the major projects (data/majorProjects.json) and their
// pull requests into data/githubStats.json, refreshed monthly by
// .github/workflows/github-stats.yml; data/contributions.ts uses them to display it.
// Tested in tests/unit/githubStats.test.ts.

export interface QuarterCount {
  quarter: string; // "2026-Q4"
  commits: number;
}

export interface GithubStats {
  source: string; // "git-history" for a refresh, or what the file was seeded from
  generatedAt: string; // ISO date
  since: string; // ISO date the counts start from
  repos: number; // major projects counted
  commits: number; // commits authored (no merges) in those repos since `since`
  pullRequests: number; // pull requests opened in those repos since `since`
  quarters: QuarterCount[];
}

// "2026-11-27" or "2026-11-27T10:00:00+05:00" -> "2026-Q4"
export function quarterOf(date: string): string {
  const [year, month] = date.slice(0, 10).split("-").map(Number);
  return `${year}-Q${Math.floor((month - 1) / 3) + 1}`;
}

// Every quarter from `from` to `to` inclusive, oldest first, so quiet quarters still
// show as empty bars.
export function quarterRange(from: string, to: string): string[] {
  const [fy, fq] = quarterOf(from).split("-Q").map(Number);
  const [ty, tq] = quarterOf(to).split("-Q").map(Number);
  const out: string[] = [];
  for (let y = fy, q = fq; y < ty || (y === ty && q <= tq); q === 4 ? (y++, (q = 1)) : q++) out.push(`${y}-Q${q}`);
  return out;
}

// Counts commit dates into quarters between `from` and `to` (dates outside are ignored).
export function quartersFromDates(dates: string[], from: string, to: string): QuarterCount[] {
  const totals = new Map(quarterRange(from, to).map((q) => [q, 0]));
  for (const d of dates) {
    const day = d.slice(0, 10);
    if (day < from || day > to) continue;
    const q = quarterOf(day);
    if (totals.has(q)) totals.set(q, (totals.get(q) ?? 0) + 1);
  }
  return Array.from(totals, ([quarter, commits]) => ({ quarter, commits }));
}

// True when a commit's author email is one of Ahsan's addresses (case-insensitive).
export function isOwnCommit(email: string, authorEmails: string[]): boolean {
  const e = email.trim().toLowerCase();
  return authorEmails.some((a) => a.toLowerCase() === e);
}

// Display style used on the page, an "at least" figure: 1342 -> "1,300+", 57 -> "50+",
// 8 -> "8". Rounds down to hundreds from 1,000 and to tens below.
export function roundDown(n: number): string {
  if (n < 10) return String(Math.max(0, Math.floor(n)));
  const step = n >= 1000 ? 100 : 10;
  return `${(Math.floor(n / step) * step).toLocaleString("en-US")}+`;
}

// True when a parsed data/githubStats.json has the shape the page needs.
export function isGithubStats(v: unknown): v is GithubStats {
  if (!v || typeof v !== "object") return false;
  const s = v as Record<string, unknown>;
  const count = (x: unknown) => typeof x === "number" && Number.isInteger(x) && x >= 0;
  return (
    typeof s.source === "string" &&
    typeof s.generatedAt === "string" &&
    !Number.isNaN(Date.parse(s.generatedAt)) &&
    typeof s.since === "string" &&
    count(s.repos) &&
    count(s.commits) &&
    count(s.pullRequests) &&
    Array.isArray(s.quarters) &&
    s.quarters.length > 0 &&
    s.quarters.every((q) => q && typeof q === "object" && /^\d{4}-Q[1-4]$/.test((q as QuarterCount).quarter) && count((q as QuarterCount).commits))
  );
}

export interface RawCommit {
  hash: string;
  repo: string;
  email: string;
  date: string; // ISO author date
}

export interface RawPullRequest {
  owner: string;
  repo: string;
  createdAt: string;
}

// Builds the stats file from raw history: only Ahsan's own commits (any of his addresses)
// and his pull requests, only in the listed repos, only from `since` to `to`. A commit that
// appears in two repositories (one copied from the other) is counted once.
export function summarize(input: {
  commits: RawCommit[];
  pullRequests: RawPullRequest[];
  owner: string;
  repos: string[];
  reposRead: number;
  authorEmails: string[];
  since: string;
  to: string;
  generatedAt: string;
}): GithubStats {
  const listed = new Set(input.repos.map((r) => r.toLowerCase()));
  const inRange = (d: string) => d.slice(0, 10) >= input.since && d.slice(0, 10) <= input.to;
  const seen = new Set<string>();
  const commits = input.commits.filter((c) => {
    if (!listed.has(c.repo.toLowerCase()) || !isOwnCommit(c.email, input.authorEmails) || !inRange(c.date) || seen.has(c.hash)) return false;
    seen.add(c.hash);
    return true;
  });
  const pullRequests = input.pullRequests.filter(
    (p) => p.owner.toLowerCase() === input.owner.toLowerCase() && listed.has(p.repo.toLowerCase()) && inRange(p.createdAt),
  );
  return {
    source: "git-history",
    generatedAt: input.generatedAt,
    since: input.since,
    repos: input.reposRead,
    commits: commits.length,
    pullRequests: pullRequests.length,
    quarters: quartersFromDates(
      commits.map((c) => c.date),
      input.since,
      input.to,
    ),
  };
}
