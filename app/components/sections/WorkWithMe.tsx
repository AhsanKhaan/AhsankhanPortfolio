import { IconBuildingSkyscraper, IconWorld, IconCode, IconArrowRight, IconBrandLinkedin } from "@tabler/icons-react";
import FadeIn from "../ui/FadeIn";
import { workModes, profile } from "@/data/profile";

const icons = { fulltime: IconBuildingSkyscraper, remote: IconWorld, freelance: IconCode };

const WorkWithMe = () => {
  return (
    <section id="work-with-me" className="rounded-t-[40px] bg-brand-surface px-5 py-20 sm:rounded-t-[50px] sm:px-8 md:rounded-t-[60px] md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn y={40}>
          <h2
            className="hero-heading font-display mb-14 text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 9vw, 120px)" }}
          >
            Work with me
          </h2>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-3">
          {workModes.map((mode, i) => {
            const Icon = icons[mode.inquiry];
            return (
              <FadeIn key={mode.inquiry} delay={i * 0.1} className="h-full">
                <article className="flex h-full flex-col rounded-brand-xl border border-brand-border bg-brand-bg p-6 md:p-8">
                  <Icon className="mb-4 h-9 w-9 text-brand-accent-start" stroke={1.5} aria-hidden="true" />
                  <h3 className="font-display mb-4 text-xl font-medium uppercase text-brand-text">{mode.title}</h3>
                  <ul className="mb-8 space-y-2 text-brand-muted">
                    {mode.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <a
                    href={`#contact-${mode.inquiry}`}
                    className="mt-auto inline-flex min-h-[44px] items-center gap-2 font-medium uppercase tracking-widest text-brand-text hover:opacity-70 transition-opacity"
                  >
                    {mode.cta} <IconArrowRight size={18} aria-hidden="true" />
                  </a>
                  {mode.inquiry === "fulltime" && (
                    <a
                      href={profile.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex min-h-[44px] items-center gap-2 text-sm text-brand-muted hover:text-brand-text"
                    >
                      <IconBrandLinkedin size={16} aria-hidden="true" /> Or view my LinkedIn
                    </a>
                  )}
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkWithMe;
