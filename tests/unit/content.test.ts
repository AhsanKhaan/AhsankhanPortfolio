import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { agentTeam, agencyServices, agencyWork, freelanceProfiles } from "@/data/agency";
import { featuredRepos } from "@/data/contributions";
import { caseStudies, services } from "@/data/profile";

const root = process.cwd();
// Skills installed locally instead of vendored (see AGENTS.md → Agent team).
const notVendored = new Set(["ui-ux-pro-max"]);

function filesUnder(dir: string, ext: RegExp): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return filesUnder(p, ext);
    return ext.test(name) ? [p] : [];
  });
}

describe("agent team", () => {
  it("lists only agents that exist in .claude/agents", () => {
    for (const a of agentTeam) {
      expect(existsSync(join(root, ".claude/agents", `${a.id}.md`)), `${a.id}.md`).toBe(true);
    }
  });

  it("has unique ids", () => {
    expect(new Set(agentTeam.map((a) => a.id)).size).toBe(agentTeam.length);
  });

  it("names only skills that are vendored or listed as installed locally", () => {
    for (const skill of agentTeam.flatMap((a) => a.skills)) {
      if (notVendored.has(skill)) continue;
      const dir = join(root, "vendor/skills", skill);
      expect(existsSync(dir) && readdirSync(dir).length > 0, skill).toBe(true);
    }
  });
});

describe("content rules", () => {
  const siteFiles = [...filesUnder(join(root, "app"), /\.(tsx?|jsx?)$/), ...filesUnder(join(root, "data"), /\.ts$/), join(root, "public/llms.txt")];

  it("never links the private AK Site Kit repository", () => {
    for (const f of siteFiles) {
      expect(readFileSync(f, "utf8"), f).not.toMatch(/github\.com\/AhsanKhaan\/aksitekit/i);
    }
    expect(featuredRepos.find((r) => r.name === "AK Site Kit")?.link).toBeUndefined();
    expect(agencyWork.find((w) => w.title === "AK Site Kit")?.link).toBeUndefined();
  });

  it("does not claim Docker as a skill", () => {
    const text = JSON.stringify({ services, agencyServices, featuredRepos, caseStudies });
    expect(text).not.toMatch(/docker/i);
  });

  it("offers AI agents, Claude Code and n8n automation", () => {
    const names = [...services.map((s) => s.name), ...agencyServices.map((s) => s.name)].join(" | ");
    expect(names).toMatch(/Claude Code/);
    expect(names).toMatch(/n8n/);
    expect(names).toMatch(/AI agents/i);
  });

  it("shows Calculator Porch as a case study with its site link", () => {
    expect(caseStudies.find((c) => c.title === "Calculator Porch")?.link).toBe("https://calculatorporch.com");
  });

  it("only renders freelance profiles that are https links", () => {
    for (const p of freelanceProfiles.filter((p) => p.href)) {
      expect(p.href, p.platform).toMatch(/^https:\/\//);
    }
  });
});
