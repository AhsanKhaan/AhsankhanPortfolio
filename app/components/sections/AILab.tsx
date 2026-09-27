import { IconSparkles } from "@tabler/icons-react";
import FadeIn from "../ui/FadeIn";
import { aiLab, type LearningStatus } from "@/data/profile";

const statusStyle: Record<LearningStatus, string> = {
  Learning: "border-brand-border text-brand-muted",
  Building: "border-brand-accent-start text-brand-accent-start",
  Applied: "border-brand-accent-end text-brand-accent-end",
};

const AILab = () => {
  return (
    <section id="ai-lab" className="px-5 py-20 sm:px-8 md:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn y={40}>
          <div className="mb-3 flex items-center gap-3">
            <IconSparkles className="h-6 w-6 text-brand-accent-end" aria-hidden="true" />
            <span className="rounded-full border border-brand-border px-3 py-1 text-xs uppercase tracking-widest text-brand-muted">
              In progress
            </span>
          </div>
          <h2 className="hero-heading font-display font-black uppercase leading-none tracking-tight" style={{ fontSize: "clamp(2.5rem, 8vw, 110px)" }}>
            AI Lab
          </h2>
          <p className="mb-12 mt-4 max-w-2xl text-lg text-brand-muted">
            What I&apos;m learning and building as I move toward AI engineering: LLM features, built on the same production engineering fundamentals.
          </p>
        </FadeIn>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiLab.map((item, i) => (
            <li key={item.name}>
              <FadeIn delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-brand-lg border border-brand-border bg-brand-surface p-6">
                  <span className={`w-fit rounded-full border px-3 py-0.5 text-xs font-medium uppercase tracking-widest ${statusStyle[item.status]}`}>
                    {item.status}
                  </span>
                  <h3 className="font-display text-xl font-medium text-brand-text">{item.name}</h3>
                  <p className="text-brand-muted">{item.detail}</p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AILab;
