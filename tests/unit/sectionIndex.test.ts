import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME_SECTIONS, sectionNumber } from "@/lib/sectionIndex";

// Which component renders each numbered section on the homepage.
const componentFor: Record<(typeof HOME_SECTIONS)[number], string> = {
  about: "About",
  "domain-fit": "DomainFit",
  services: "Services",
  "case-studies": "CaseStudies",
  "ai-lab": "AgenticAI",
  "work-with-me": "WorkWithMe",
  faq: "RecruiterFAQ",
  contact: "Contact",
};

describe("sectionNumber", () => {
  it("numbers homepage sections from 01 in order", () => {
    expect(sectionNumber("about")).toBe("01");
    expect(sectionNumber("services")).toBe("03");
    expect(sectionNumber("contact")).toBe(String(HOME_SECTIONS.length).padStart(2, "0"));
  });

  it("returns null for a section that is not numbered", () => {
    expect(sectionNumber("experience")).toBeNull();
    expect(sectionNumber("")).toBeNull();
  });
});

describe("HOME_SECTIONS", () => {
  const page = readFileSync(join(process.cwd(), "app/page.tsx"), "utf8");

  it("matches the order app/page.tsx renders the sections in", () => {
    const positions = HOME_SECTIONS.map((id) => page.indexOf(`<${componentFor[id]} />`));
    for (const p of positions) expect(p).toBeGreaterThan(-1);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it("each numbered section renders a kicker with its own id", () => {
    for (const id of HOME_SECTIONS) {
      const file = readFileSync(join(process.cwd(), "app/components/sections", `${componentFor[id]}.tsx`), "utf8");
      expect(file).toContain(`<SectionKicker id="${id}"`);
    }
  });
});
