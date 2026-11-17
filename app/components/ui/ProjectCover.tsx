// Branded cover for projects without a screenshot (private repos, pre-launch products).
// Pure CSS: grid backdrop + aurora glow from brand tokens, the project name as the art.
const ProjectCover = ({ title, kicker, className = "" }: { title: string; kicker?: string; className?: string }) => (
  <div className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-brand-bg ${className}`}>
    <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
    <div className="aurora absolute inset-0" aria-hidden="true" />
    {kicker && (
      <span className="relative mb-3 rounded-full border border-brand-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-muted">
        {kicker}
      </span>
    )}
    <span className="hero-heading relative px-6 text-center font-display text-3xl font-black uppercase leading-none md:text-5xl">
      {title}
    </span>
  </div>
);

export default ProjectCover;
