import type { CSSProperties } from "react";
import Image from "next/image";
import { IconMapPin, IconWorld, IconBriefcase, IconBrandLinkedin } from "@tabler/icons-react";
import Magnet from "../ui/Magnet";
import { ContactButton, GhostButton } from "../ui/BrandButtons";
import CvTriggerLink from "../ui/CvTriggerLink";
import CodeField from "../ui/CodeField";
import CodePortrait from "../ui/CodePortrait";
import { heroAvailability, heroPortrait, profile } from "@/data/profile";
import { buildCodeSource } from "@/lib/codeField";

const chipIcons = { location: IconMapPin, world: IconWorld, briefcase: IconBriefcase };

const codeSource = buildCodeSource(profile);
const years = profile.metrics.find((m) => m.label.startsWith("Years"))?.value;

const rise = (delay: number, y: number) => ({ "--rise-delay": `${delay}s`, "--rise-y": `${y}px` }) as CSSProperties;

const Hero = () => {
  return (
    <section id="home" className="hero-height relative flex flex-col overflow-x-clip pt-20">
      {/* Decorative code texture behind everything (z-0); see CodeField for its cost model. */}
      <CodeField source={codeSource} />

      <p
        data-code-clear
        className="rise relative z-30 mx-auto mt-3 flex w-fit items-center justify-center gap-2.5 px-4 text-xs font-medium uppercase tracking-widest text-brand-muted"
        style={rise(0.05, 12)}
      >
        <span className="status-dot" aria-hidden="true" />
        <span>Open to work</span>
        <span className="hidden sm:inline">
          {years ? `· ${years} yrs in production ` : ""}· {profile.location}
        </span>
      </p>

      {/* `relative z-30` makes this a positioned element so it actually participates in
          z-index stacking — without it, a plain in-flow box always paints BELOW the
          portrait's `position:absolute` below, no matter what z-index either has. */}
      <div data-code-clear className="rise rise-lcp relative z-30 overflow-hidden px-2" style={rise(0.15, 40)}>
        <h1 className="hero-heading font-display w-full whitespace-nowrap text-center font-black uppercase leading-none tracking-tight text-[15vw] mt-2 sm:mt-1 md:-mt-3 drop-shadow-[0_6px_28px_rgba(0,0,0,0.55)]">
          Hi, i&apos;m Ahsan
        </h1>
      </div>

      {/* Portrait — sits behind the heading (z-10 vs the heading's z-30) and behind the
          bottom CTA row (z-20), so it never covers any text; a frosted glass halo gives
          it a premium look where the heading passes in front of it. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[240px] -translate-x-1/2 -translate-y-1/2 sm:w-[300px] md:top-auto md:bottom-0 md:w-[360px] md:translate-y-0 lg:w-[420px]">
        {heroPortrait === "code" ? (
          // The photo drawn in code (CodePortrait). The photo itself is unchanged; set
          // heroPortrait to "photo" in data/profile.ts to show it again.
          <div className="rise relative" style={rise(0.6, 30)}>
            <div aria-hidden="true" className="code-portrait-backdrop absolute inset-[-12%]" />
            <CodePortrait source={codeSource} label={`${profile.name}, ${profile.title}, drawn in code`} className="w-full" />
            <noscript>
              <Image src="/assets/Profile-v3.png" alt={`${profile.name}, ${profile.title}`} width={450} height={522} className="absolute inset-0 h-auto w-full" />
            </noscript>
          </div>
        ) : (
          <div className="rise rise-lcp relative" style={rise(0.6, 30)}>
            {/* Glass halo */}
            <div
              aria-hidden="true"
              className="absolute inset-[-6%] rounded-full bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-[0_20px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/15"
            />
            <Magnet padding={150} strength={3} className="pointer-events-auto relative">
              <Image
                src="/assets/Profile-v3.png"
                alt="Ahsan Khan, Senior Full Stack & Frontend Engineer"
                width={450}
                height={522}
                sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, (min-width: 640px) 300px, 240px"
                priority
                fetchPriority="high"
                className="h-auto w-full select-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
              />
            </Magnet>
          </div>
        )}
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between gap-4 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <div data-code-clear className="rise max-w-[180px] sm:max-w-[240px] md:max-w-[300px]" style={rise(0.35, 20)}>
          <h2 className="font-light uppercase leading-snug tracking-wide text-brand-text" style={{ fontSize: "clamp(0.8rem, 1.4vw, 1.5rem)" }}>
            Senior Full Stack &amp; Frontend Developer building React, Next.js &amp; fintech platforms
          </h2>
          <ul className="mt-4 hidden flex-col gap-2 sm:flex" aria-label="Availability">
            {heroAvailability.map(({ icon, label }) => {
              const Icon = chipIcons[icon];
              return (
                <li
                  key={label}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-3 py-1 text-xs text-brand-text"
                >
                  <Icon size={14} className="text-brand-accent-end" aria-hidden="true" />
                  {label}
                </li>
              );
            })}
          </ul>
        </div>

        <div data-code-clear className="rise flex flex-col items-end gap-3" style={rise(0.5, 20)}>
          <ContactButton href="#contact">Hire Me</ContactButton>
          <GhostButton href={profile.links.linkedin} external className="bg-black/40 backdrop-blur-sm">
            <IconBrandLinkedin size={16} aria-hidden="true" /> View LinkedIn
          </GhostButton>
          <CvTriggerLink className="min-h-[44px] text-xs uppercase tracking-widest text-brand-muted underline underline-offset-4 hover:text-brand-text" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
