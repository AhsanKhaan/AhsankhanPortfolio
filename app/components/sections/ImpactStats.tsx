import FadeIn from "../ui/FadeIn";
import { profile } from "@/data/profile";

const ImpactStats = () => {
  return (
    <section aria-labelledby="impact-heading" className="px-5 py-16 sm:px-8 md:px-10">
      <h2 id="impact-heading" className="sr-only">
        Impact in numbers
      </h2>
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {profile.metrics.map((m, i) => (
          <li key={m.label}>
            <FadeIn delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col gap-2 rounded-brand-lg border border-brand-border bg-brand-surface p-5">
                <span className="hero-heading font-display text-4xl font-black leading-none md:text-5xl xl:text-4xl 2xl:text-5xl">{m.value}</span>
                <span className="text-sm leading-snug text-brand-muted">{m.label}</span>
              </div>
            </FadeIn>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ImpactStats;
