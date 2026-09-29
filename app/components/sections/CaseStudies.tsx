"use client";

import { useEffect, useRef, type Ref } from "react";
import Image from "next/image";
import { IconExternalLink } from "@tabler/icons-react";
import FadeIn from "../ui/FadeIn";
import { GhostButton } from "../ui/BrandButtons";
import { rafThrottle } from "@/lib/rafThrottle";
import { caseStudies, type CaseStudy } from "@/data/profile";

const targetScale = (i: number) => 1 - (caseStudies.length - 1 - i) * 0.03;

// Sticky stacking cards: each card pins and scales down slightly as the next one arrives.
// Progress runs 0 → 1 from the container's top reaching the viewport top to its bottom
// reaching the viewport bottom; card i shrinks over [i/n, 1] of that. The handler only
// runs while the section is on screen and writes transforms directly (no re-render).
const CaseStudies = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const n = caseStudies.length;

    const update = rafThrottle(() => {
      const { top, height } = container.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -top / scrollable)) : 0;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const start = i / n;
        const t = Math.min(1, Math.max(0, (progress - start) / (1 - start)));
        card.style.transform = `scale(${1 + (targetScale(i) - 1) * t})`;
      });
    });

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        update();
        window.addEventListener("scroll", update, { passive: true });
      } else {
        window.removeEventListener("scroll", update);
      }
    });
    io.observe(container);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
      update.cancel();
    };
  }, []);

  return (
    <section id="case-studies" className="relative bg-brand-bg px-5 pt-20 sm:px-8 md:px-10">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-display mb-6 text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Case studies
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-brand-muted">
          Problem, my role, and the measurable result.
        </p>
      </FadeIn>
      <div ref={containerRef} className="mx-auto max-w-6xl">
        {caseStudies.map((c, i) => (
          <Card
            key={c.title}
            study={c}
            index={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
};

function Card({ study, index, ref }: { study: CaseStudy; index: number; ref: Ref<HTMLElement> }) {
  return (
    <div className="sticky top-24 flex min-h-[85vh] items-start md:top-32">
      <article
        ref={ref}
        style={{ top: `${index * 28}px` }}
        className="relative w-full origin-top rounded-[32px] border-2 [border-color:color-mix(in_srgb,var(--color-accent-start)_40%,transparent)] bg-brand-bg p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.6)] sm:rounded-[44px] sm:p-6 md:rounded-[56px] md:p-8"
      >
        <header className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="font-display font-black leading-none text-brand-text" style={{ fontSize: "clamp(2.5rem, 7vw, 96px)" }} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-1">
            <span className="w-fit rounded-full border border-brand-border px-3 py-1 text-xs uppercase tracking-widest text-brand-muted">
              {study.category}
            </span>
            <h3 className="font-display text-2xl font-medium uppercase text-brand-text md:text-4xl">{study.title}</h3>
          </div>
          {study.link && (
            <GhostButton href={study.link} external className="ml-auto">
              Live project <IconExternalLink size={16} aria-hidden="true" />
            </GhostButton>
          )}
        </header>

        <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
          <div className="flex flex-col gap-5 text-brand-text">
            <dl className="flex flex-col gap-5">
              <div>
                <dt className="mb-1 text-xs uppercase tracking-widest text-brand-muted">Problem</dt>
                <dd>{study.problem}</dd>
              </div>
              <div>
                <dt className="mb-1 text-xs uppercase tracking-widest text-brand-muted">My role</dt>
                <dd>{study.role}</dd>
              </div>
              <div>
                <dt className="mb-1 text-xs uppercase tracking-widest text-brand-muted">Impact</dt>
                <dd>
                  <ul className="list-disc space-y-1 pl-5 marker:text-brand-accent-end">
                    {study.impact.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
              {study.stack.map((t) => (
                <li key={t} className="rounded-md border border-brand-border bg-brand-surface px-2.5 py-1 text-xs text-brand-text">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[220px] overflow-hidden rounded-[24px] border border-brand-border bg-brand-surface sm:min-h-[320px] md:rounded-[40px]">
            <Image src={study.image} alt={`${study.title} screenshot`} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover object-top" />
          </div>
        </div>
      </article>
    </div>
  );
}

export default CaseStudies;
