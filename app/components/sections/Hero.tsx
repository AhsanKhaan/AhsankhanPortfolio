import Image from "next/image";
import { IconMapPin, IconWorld, IconBriefcase, IconBrandLinkedin } from "@tabler/icons-react";
import FadeIn from "../ui/FadeIn";
import Magnet from "../ui/Magnet";
import { ContactButton, GhostButton } from "../ui/BrandButtons";
import CvTriggerLink from "../ui/CvTriggerLink";
import { heroAvailability, profile } from "@/data/profile";

const chipIcons = { location: IconMapPin, world: IconWorld, briefcase: IconBriefcase };

const Hero = () => {
  return (
    <section id="home" className="relative flex h-screen min-h-[640px] flex-col overflow-x-clip pt-20">
      {/* `relative z-30` makes this a positioned element so it actually participates in
          z-index stacking — without it, a plain in-flow box always paints BELOW the
          portrait's `position:absolute` below, no matter what z-index either has. */}
      <FadeIn delay={0.15} y={40} className="relative z-30 overflow-hidden px-2">
        <h1 className="hero-heading font-display w-full whitespace-nowrap text-center font-black uppercase leading-none tracking-tight text-[15vw] mt-6 sm:mt-4 md:-mt-2 drop-shadow-[0_6px_28px_rgba(0,0,0,0.55)]">
          Hi, i&apos;m Ahsan
        </h1>
      </FadeIn>

      {/* Portrait — sits behind the heading (z-10 vs the heading's z-30) and behind the
          bottom CTA row (z-20), so it never covers any text; a frosted glass halo gives
          it a premium look where the heading passes in front of it. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[240px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[300px] sm:translate-y-0 md:w-[360px] lg:w-[420px]">
        <FadeIn delay={0.6} y={30} className="relative">
          {/* Glass halo */}
          <div
            aria-hidden="true"
            className="absolute inset-[-6%] rounded-full bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-[0_20px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/15 backdrop-blur-2xl"
          />
          <Magnet padding={150} strength={3} className="pointer-events-auto relative">
            <Image
              src="/assets/Profile-v3.png"
              alt="Ahsan Khan, Senior Full Stack & Frontend Engineer"
              width={450}
              height={522}
              priority
              className="h-auto w-full select-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
            />
          </Magnet>
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between gap-4 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20} className="max-w-[180px] sm:max-w-[240px] md:max-w-[300px]">
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
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="flex flex-col items-end gap-3">
          <ContactButton href="#contact">Hire Me</ContactButton>
          <GhostButton href={profile.links.linkedin} external className="bg-black/40 backdrop-blur-sm">
            <IconBrandLinkedin size={16} aria-hidden="true" /> View LinkedIn
          </GhostButton>
          <CvTriggerLink className="min-h-[44px] text-xs uppercase tracking-widest text-brand-muted underline underline-offset-4 hover:text-brand-text" />
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
