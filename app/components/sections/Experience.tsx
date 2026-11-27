import React from "react";
import Link from "next/link";
import { IconBrandGithub, IconMail, IconBrandLinkedin } from "@tabler/icons-react";
import { MeteorsCard } from "../ui/MeteorsCard";
import SectionKicker from "../ui/SectionKicker";
import Timeline from "../ui/Timeline";
import { profile } from "@/data/profile";

// Display text for a profile link: the URL without its scheme.
const bare = (url: string) => url.replace(/^https?:\/\//, "");

const links = [
  { Icon: IconBrandGithub, href: profile.links.github, label: bare(profile.links.github).toLowerCase(), external: true },
  { Icon: IconMail, href: `mailto:${profile.email}`, label: profile.email, external: false },
  { Icon: IconBrandLinkedin, href: profile.links.linkedin, label: bare(profile.links.linkedin), external: true },
];

// Experience: the section heading (docs/DESIGN.md display style), then the profile card
// (a sticky sidebar from md) beside the timeline of roles.
const Experience = () => {
  return (
    <section id="experience" className="px-5 pt-20 sm:px-8 md:px-10">
      <div className="text-center">
        <SectionKicker id="experience" label="Experience" />
        <h2
          className="hero-heading font-display font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 8vw, 110px)" }}
        >
          My journey
        </h2>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="flex w-full flex-col items-center text-center md:w-1/3">
          <MeteorsCard number={12}>
            <p className="mb-4 text-base text-brand-text">
              A passionate Software Engineer having 6+ Years Experience in web development. I am a tech enthusiast who loves
              crafting scalable applications and exploring new technologies.
            </p>
            <ul className="mt-2 flex w-full flex-col items-start gap-1">
              {links.map(({ Icon, href, label, external }) => (
                <li key={href}>
                  <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex min-h-[44px] items-center gap-3 text-base font-medium text-brand-accent-start transition-colors duration-200 hover:text-brand-text"
                  >
                    <Icon size={22} className="shrink-0 text-brand-text" aria-hidden="true" />
                    <span className="break-all text-left">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </MeteorsCard>
        </div>
        <div className="w-full md:flex-1">
          <Timeline />
        </div>
      </div>
    </section>
  );
};

export default Experience;
