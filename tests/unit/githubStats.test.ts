import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { combineYears, isGithubStats, quarterOf, quarterRange, quartersFromDays, roundDown, type YearCollection } from "@/lib/githubStats";
import stats from "@/data/githubStats.json";
import fixture from "../fixtures/github-contributions.json";

describe("quarterOf / quarterRange", () => {
  it("maps dates to quarters", () => {
    expect(quarterOf("2026-01-01")).toBe("2026-Q1");
    expect(quarterOf("2026-03-31")).toBe("2026-Q1");
    expect(quarterOf("2026-04-01")).toBe("2026-Q2");
    expect(quarterOf("2026-12-31")).toBe("2026-Q4");
  });

  it("lists every quarter across year boundaries, inclusive", () => {
    expect(quarterRange("2020-11-05", "2021-05-01")).toEqual(["2020-Q4", "2021-Q1", "2021-Q2"]);
    expect(quarterRange("2026-12-01", "2026-12-31")).toEqual(["2026-Q4"]);
  });
});

describe("quartersFromDays", () => {
  it("sums days into quarters, keeps empty quarters, ignores padding days outside the range", () => {
    const days = [
      { date: "2019-12-30", contributionCount: 50 },
      { date: "2020-01-05", contributionCount: 2 },
      { date: "2020-02-10", contributionCount: 3 },
      { date: "2020-10-01", contributionCount: 4 },
      { date: "2021-01-02", contributionCount: 9 },
    ];
    expect(quartersFromDays(days, "2020-01-01", "2020-12-31")).toEqual([
      { quarter: "2020-Q1", contributions: 5 },
      { quarter: "2020-Q2", contributions: 0 },
      { quarter: "2020-Q3", contributions: 0 },
      { quarter: "2020-Q4", contributions: 4 },
    ]);
  });
});

describe("combineYears", () => {
  it("adds the yearly totals and builds the quarter series", () => {
    const s = combineYears(fixture as YearCollection[], "2020-01-01", "2021-09-30", "2021-10-01T00:00:00.000Z");
    expect(s).toMatchObject({ source: "github-graphql", since: "2020-01-01", commits: 505, pullRequests: 52, privateContributions: 30 });
    expect(s.quarters.map((q) => q.quarter)).toEqual(["2020-Q1", "2020-Q2", "2020-Q3", "2020-Q4", "2021-Q1", "2021-Q2", "2021-Q3"]);
    expect(s.quarters[0].contributions).toBe(9); // the 2019 padding day is left out
    expect(s.quarters[3].contributions).toBe(2);
    expect(s.quarters[6].contributions).toBe(6);
    expect(isGithubStats(s)).toBe(true);
  });
});

describe("roundDown", () => {
  it("shows an at-least figure: hundreds from 1,000, tens below, exact under 10", () => {
    expect(roundDown(1342)).toBe("1,300+");
    expect(roundDown(1300)).toBe("1,300+");
    expect(roundDown(57)).toBe("50+");
    expect(roundDown(10)).toBe("10+");
    expect(roundDown(8)).toBe("8");
    expect(roundDown(0)).toBe("0");
  });
});

describe("isGithubStats", () => {
  it("rejects a malformed file", () => {
    expect(isGithubStats(null)).toBe(false);
    expect(isGithubStats({ ...stats, commits: -1 })).toBe(false);
    expect(isGithubStats({ ...stats, quarters: [] })).toBe(false);
    expect(isGithubStats({ ...stats, quarters: [{ quarter: "2026-Q5", contributions: 1 }] })).toBe(false);
    expect(isGithubStats({ ...stats, generatedAt: "not a date" })).toBe(false);
  });
});

describe("data/githubStats.json", () => {
  it("is a valid stats file with consecutive quarters", () => {
    expect(isGithubStats(stats)).toBe(true);
    const qs = stats.quarters.map((q) => q.quarter);
    // first day of the first quarter to first day of the last quarter
    const start = (q: string) => `${q.slice(0, 4)}-${String((Number(q.slice(-1)) - 1) * 3 + 1).padStart(2, "0")}-01`;
    expect(qs).toEqual(quarterRange(start(qs[0]), start(qs[qs.length - 1])));
  });
});

describe("scripts/fetch-github-stats.mjs", () => {
  it("writes a valid stats file from a recorded response", () => {
    const out = join(mkdtempSync(join(tmpdir(), "ghstats-")), "stats.json");
    execFileSync(process.execPath, ["scripts/fetch-github-stats.mjs", "--fixture", "tests/fixtures/github-contributions.json", "--out", out], { stdio: "pipe" });
    const written = JSON.parse(readFileSync(out, "utf8"));
    expect(isGithubStats(written)).toBe(true);
    expect(written).toMatchObject({ commits: 505, pullRequests: 52, privateContributions: 30 });
  });
});
