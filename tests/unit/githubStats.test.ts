import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { isGithubStats, isOwnCommit, quarterOf, quarterRange, quartersFromDates, roundDown, summarize } from "@/lib/githubStats";
import stats from "@/data/githubStats.json";
import major from "@/data/majorProjects.json";
import history from "../fixtures/github-history.json";

const base = { owner: major.owner, repos: major.repos, authorEmails: major.authorEmails, since: "2020-01-01", to: "2026-12-31", generatedAt: "2026-12-01T00:00:00.000Z", reposRead: 3 };

describe("quarterOf / quarterRange", () => {
  it("maps dates (with or without a time) to quarters", () => {
    expect(quarterOf("2026-01-01")).toBe("2026-Q1");
    expect(quarterOf("2026-03-31T23:00:00+05:00")).toBe("2026-Q1");
    expect(quarterOf("2026-04-01")).toBe("2026-Q2");
    expect(quarterOf("2026-12-31")).toBe("2026-Q4");
  });

  it("lists every quarter across year boundaries, inclusive", () => {
    expect(quarterRange("2020-11-05", "2021-05-01")).toEqual(["2020-Q4", "2021-Q1", "2021-Q2"]);
  });
});

describe("quartersFromDates", () => {
  it("counts dates into quarters, keeps quiet quarters, ignores dates outside the range", () => {
    expect(quartersFromDates(["2019-12-30", "2020-01-05", "2020-02-10T08:00:00Z", "2020-10-01", "2021-01-02"], "2020-01-01", "2020-12-31")).toEqual([
      { quarter: "2020-Q1", commits: 2 },
      { quarter: "2020-Q2", commits: 0 },
      { quarter: "2020-Q3", commits: 0 },
      { quarter: "2020-Q4", commits: 1 },
    ]);
  });
});

describe("isOwnCommit", () => {
  it("matches every one of Ahsan's addresses, ignoring case, and nobody else", () => {
    for (const e of major.authorEmails) expect(isOwnCommit(e.toUpperCase(), major.authorEmails)).toBe(true);
    expect(isOwnCommit("muhammadshariq.64@gmail.com", major.authorEmails)).toBe(false);
  });
});

describe("summarize", () => {
  const s = summarize({ ...base, commits: history.commits, pullRequests: history.pullRequests });

  it("counts only Ahsan's commits, in listed repos, from 2020, each commit once", () => {
    // a1, a2 (cip-2026, both addresses), a3 once (shared by two repos). Not b1 (someone else),
    // c1 (practice repo, not listed) or d1 (2019).
    expect(s.commits).toBe(3);
    expect(s.quarters.find((q) => q.quarter === "2020-Q1")?.commits).toBe(1);
    expect(s.quarters.find((q) => q.quarter === "2026-Q2")?.commits).toBe(1);
    expect(s.quarters.find((q) => q.quarter === "2026-Q4")?.commits).toBe(1);
  });

  it("counts only pull requests on Ahsan's listed repos", () => {
    expect(s.pullRequests).toBe(1);
  });

  it("produces a valid stats file", () => {
    expect(s).toMatchObject({ source: "git-history", since: "2020-01-01", repos: 3 });
    expect(isGithubStats(s)).toBe(true);
  });
});

describe("roundDown", () => {
  it("shows an at-least figure: hundreds from 1,000, tens below, exact under 10", () => {
    expect(roundDown(1342)).toBe("1,300+");
    expect(roundDown(383)).toBe("380+");
    expect(roundDown(10)).toBe("10+");
    expect(roundDown(8)).toBe("8");
  });
});

describe("isGithubStats", () => {
  it("rejects a malformed file", () => {
    expect(isGithubStats(null)).toBe(false);
    expect(isGithubStats({ ...stats, commits: -1 })).toBe(false);
    expect(isGithubStats({ ...stats, quarters: [] })).toBe(false);
    expect(isGithubStats({ ...stats, quarters: [{ quarter: "2026-Q5", commits: 1 }] })).toBe(false);
    expect(isGithubStats({ ...stats, generatedAt: "not a date" })).toBe(false);
  });
});

describe("data files", () => {
  it("githubStats.json is valid and its quarters run without gaps", () => {
    expect(isGithubStats(stats)).toBe(true);
    const qs = stats.quarters.map((q) => q.quarter);
    const start = (q: string) => `${q.slice(0, 4)}-${String((Number(q.slice(-1)) - 1) * 3 + 1).padStart(2, "0")}-01`;
    expect(qs).toEqual(quarterRange(start(qs[0]), start(qs[qs.length - 1])));
  });

  it("majorProjects.json leaves out semester and practice repositories", () => {
    expect(major.repos.length).toBeGreaterThan(0);
    for (const r of major.repos) expect(r).not.toMatch(/semester|practice|assignment|test$|^test/i);
  });
});

describe("scripts/fetch-github-stats.mjs", () => {
  it("writes a valid stats file from recorded history", () => {
    const out = join(mkdtempSync(join(tmpdir(), "ghstats-")), "stats.json");
    execFileSync(process.execPath, ["scripts/fetch-github-stats.mjs", "--fixture", "tests/fixtures/github-history.json", "--out", out], { stdio: "pipe" });
    const written = JSON.parse(readFileSync(out, "utf8"));
    expect(isGithubStats(written)).toBe(true);
    expect(written).toMatchObject({ commits: 3, pullRequests: 1 });
  });
});
