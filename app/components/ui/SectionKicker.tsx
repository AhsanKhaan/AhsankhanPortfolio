import { sectionNumber, type HomeSectionId } from "@/lib/sectionIndex";

// The label above a section heading (docs/DESIGN.md "Labels": Geist 500, uppercase,
// tracking-widest; the number in solid accent-start, as gradient text needs 16px+): "01 —— About" on the homepage, or
// "// About" where the section is reused without a number (e.g. /contributions).
// Purely visual (the h2 below says the same), so it is hidden from screen readers.
export default function SectionKicker({
  id,
  label,
  align = "center",
  numbered = true,
}: {
  id: HomeSectionId;
  label: string;
  align?: "center" | "start";
  numbered?: boolean;
}) {
  const n = numbered ? sectionNumber(id) : null;
  return (
    <p
      aria-hidden="true"
      className={`mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-brand-muted ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      {n ? (
        <span className="text-brand-accent-start">{n}</span>
      ) : (
        <span className="text-brand-accent-start">{"//"}</span>
      )}
      <span className="h-px w-8 bg-brand-border" />
      <span>{label}</span>
    </p>
  );
}
