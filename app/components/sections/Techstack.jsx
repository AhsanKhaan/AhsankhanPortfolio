'use client'
import React from "react";
import FlipWords from "../ui/FlipWords";
import { LogoLoop } from "../ui/LogoLoop";
import SpotlightCard from "../clientComponents/SpotlightCard/SpotlightCard";
import SectionKicker from "../ui/SectionKicker";
import {
  IconBrandGithub,
  IconBrandLaravel,
  IconBrandMongodb,
  IconBrandMysql,
  IconBrandReact,
  IconBrandNodejs,
  IconBrandTypescript,
  IconBrandJavascript,
  IconBrandPhp,
  IconBrandPython,
  IconBrandNextjs,
  IconBrandWordpress,
  IconBrandTailwind,
  IconBrandFigma,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandAws,
  IconBrandWebflow,
  IconCode,
  IconDatabase,
  IconLockFilled
} from "@tabler/icons-react";

const Techstack = () => {
  const techLogos = [
    { node: <IconBrandGithub size={40} />, title: "GitHub", href: "https://github.com" },
    { node: <IconBrandMongodb size={40} />, title: "MongoDB", href: "https://www.mongodb.com" },
    { node: <IconBrandMysql size={40} />, title: "MySQL", href: "https://www.mysql.com/" },
    { node: <IconBrandLaravel size={40} />, title: "Laravel", href: "https://laravel.com/" },
    { node: <IconBrandReact size={40} />, title: "React", href: "https://react.dev" },
    { node: <IconBrandNodejs size={40} />, title: "Node.js", href: "https://nodejs.org" },
    { node: <IconBrandTypescript size={40} />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <IconBrandJavascript size={40} />, title: "JavaScript" },
    { node: <IconBrandPhp size={40} />, title: "PHP", href: "https://www.php.net/" },
    { node: <IconBrandPython size={40} />, title: "Python", href: "https://www.python.org/" },
    { node: <IconBrandNextjs size={40} />, title: "Next.js", href: "https://nextjs.org/" },
    { node: <IconBrandWordpress size={40} />, title: "WordPress", href: "https://wordpress.org/" },
    { node: <IconBrandTailwind size={40} />, title: "Tailwind", href: "https://tailwindcss.com/" },
    { node: <IconBrandFigma size={40} />, title: "Figma", href: "https://figma.com/" },
    { node: <IconBrandHtml5 size={40} />, title: "HTML5" },
    { node: <IconBrandCss3 size={40} />, title: "CSS3" },
    { node: <IconBrandAws size={40} />, title: "AWS", href: "https://aws.amazon.com" },
    { node: <IconBrandWebflow size={40} />, title: "Webflow", href: "https://webflow.com" },
  ];

  // Four areas of expertise, one card each.
  const expertise = [
    { Icon: IconCode, title: "Full Stack Development", text: "End-to-end web application design, development, and deployment across multiple frameworks." },
    { Icon: IconDatabase, title: "Database Design", text: "Expert in relational and NoSQL databases with optimization and migration expertise." },
    { Icon: IconBrandAws, title: "AWS & Linux", text: "Server setup, configuration, migration, and cloud infrastructure management." },
    { Icon: IconLockFilled, title: "Security & OWASP", text: "Implements industry-standard security practices and compliance protocols in applications." },
  ];

  return (
    <section id="tech-stack" className="px-5 py-16 sm:px-8 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <SectionKicker id="tech-stack" label="Tech stack" />
          <h2
            className="hero-heading font-display font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 110px)" }}
          >
            Fueling my creations
          </h2>
        </div>

        {/* Subtitle with FlipWords */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 text-xl font-semibold text-brand-text sm:text-2xl md:text-3xl">
          <span>The Tech Behind the</span>
          <FlipWords words={["Build", "App", "Design", "Development"]} duration={2000} className="text-brand-accent-start" />
        </div>

        {/* Logo Loop Container */}
        <div className="w-full overflow-hidden rounded-brand-lg border border-brand-border bg-brand-surface p-6 sm:p-8 md:p-10">
          <LogoLoop
            logos={techLogos}
            speed={100}
            direction="left"
            logoHeight={40}
            gap={32}
            pauseOnHover
            scaleOnHover
            fadeOut
            ariaLabel="Technologies I work with"
            className="max-w-full"
          />
        </div>

        <h3 className="mb-6 mt-16 text-center font-display text-2xl font-medium uppercase text-brand-text md:text-4xl">
          Technical expertise
        </h3>
        <ul className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {expertise.map(({ Icon, title, text }) => (
            <li key={title}>
              <SpotlightCard className="h-full" spotlightColor="color-mix(in srgb, var(--color-accent-start) 20%, transparent)">
                <div className="flex items-center justify-center p-2 text-brand-accent-start">
                  <Icon size={44} aria-hidden="true" />
                </div>
                <h4 className="py-2 text-center font-display text-xl font-medium uppercase text-brand-text">{title}</h4>
                <p className="text-base text-brand-muted">{text}</p>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Techstack;
