// Numbers for the homepage's section kickers ("01 — About"). Keep this list in the order
// app/page.tsx renders the sections; tests/unit/sectionIndex.test.ts fails if they drift.
export const HOME_SECTIONS = [
  "about",
  "domain-fit",
  "services",
  "case-studies",
  "ai-lab",
  "work-with-me",
  "faq",
  "contact",
] as const;

export type HomeSectionId = (typeof HOME_SECTIONS)[number];

// "01", "02", … for a homepage section; null for anything else.
export function sectionNumber(id: string): string | null {
  const i = (HOME_SECTIONS as readonly string[]).indexOf(id);
  return i < 0 ? null : String(i + 1).padStart(2, "0");
}
