import { sectionNumber, type HomeSectionId } from "@/lib/sectionIndex";

// The mono label above a section heading: "01 —— About" on the homepage, or
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
      className={`mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-brand-muted ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      {n ? (
        <span className="bg-brand-accent bg-clip-text font-bold tracking-[0.05em] text-transparent">{n}</span>
      ) : (
        <span className="text-brand-accent-end">{"//"}</span>
      )}
      <span className="h-px w-8 bg-brand-border" />
      <span>{label}</span>
    </p>
  );
}
