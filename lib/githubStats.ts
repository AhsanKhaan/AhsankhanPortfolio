// Pure helpers for the GitHub stats on /contributions. scripts/fetch-github-stats.mjs uses
// them to turn GitHub's GraphQL contribution data into data/githubStats.json (refreshed
// monthly by .github/workflows/github-stats.yml), and data/contributions.ts uses them to
// display it. Tested in tests/unit/githubStats.test.ts.

export interface QuarterCount {
  quarter: string; // "2026-Q4"
  contributions: number;
}

export interface GithubStats {
  source: string; // "github-graphql" for a live refresh, or the export it was seeded from
  generatedAt: string; // ISO date
  since: string; // ISO date the counts start from
  commits: number;
  pullRequests: number;
  privateContributions: number;
  quarters: QuarterCount[];
}

export interface YearCollection {
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  restrictedContributionsCount: number;
  contributionCalendar: { weeks: { contributionDays: { date: string; contributionCount: number }[] }[] };
}

// "2026-11-27" -> "2026-Q4"
export function quarterOf(date: string): string {
  const [year, month] = date.split("-").map(Number);
  return `${year}-Q${Math.floor((month - 1) / 3) + 1}`;
}

// Every quarter from `from` to `to` inclusive, oldest first, so quarters without any
// contributions still show as empty bars.
export function quarterRange(from: string, to: string): string[] {
  const [fy, fq] = quarterOf(from).split("-Q").map(Number);
  const [ty, tq] = quarterOf(to).split("-Q").map(Number);
  const out: string[] = [];
  for (let y = fy, q = fq; y < ty || (y === ty && q <= tq); q === 4 ? (y++, (q = 1)) : q++) out.push(`${y}-Q${q}`);
  return out;
}

// Sums daily calendar counts into quarters between `from` and `to`. Days outside that
// range (calendars pad whole weeks) are ignored.
export function quartersFromDays(days: { date: string; contributionCount: number }[], from: string, to: string): QuarterCount[] {
  const totals = new Map(quarterRange(from, to).map((q) => [q, 0]));
  for (const d of days) {
    if (d.date < from || d.date > to) continue;
    const q = quarterOf(d.date);
    if (totals.has(q)) totals.set(q, (totals.get(q) ?? 0) + d.contributionCount);
  }
  return Array.from(totals, ([quarter, contributions]) => ({ quarter, contributions }));
}

// Combines one contributionsCollection per year into the stats file's shape.
export function combineYears(years: YearCollection[], from: string, to: string, generatedAt: string): GithubStats {
  const days = years.flatMap((y) => y.contributionCalendar.weeks.flatMap((w) => w.contributionDays));
  return {
    source: "github-graphql",
    generatedAt,
    since: from,
    commits: years.reduce((n, y) => n + y.totalCommitContributions, 0),
    pullRequests: years.reduce((n, y) => n + y.totalPullRequestContributions, 0),
    privateContributions: years.reduce((n, y) => n + y.restrictedContributionsCount, 0),
    quarters: quartersFromDays(days, from, to),
  };
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
    count(s.commits) &&
    count(s.pullRequests) &&
    count(s.privateContributions) &&
    Array.isArray(s.quarters) &&
    s.quarters.length > 0 &&
    s.quarters.every(
      (q) => q && typeof q === "object" && /^\d{4}-Q[1-4]$/.test((q as QuarterCount).quarter) && count((q as QuarterCount).contributions),
    )
  );
}
