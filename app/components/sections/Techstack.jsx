'use client'
import React from "react";
import FlipWords from "../ui/FlipWords";
import { LogoLoop } from "../ui/LogoLoop";
import SpotlightCard from "../clientComponents/SpotlightCard/SpotlightCard";
import {
  IconBrandGithub,
  IconBrandDocker,
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
    { node: <IconBrandDocker size={40} />, title: "Docker", href: "https://docker.com" },
    { node: <IconBrandMongodb size={40} />, title: "MongoDB", href: "https://www.mongodb.com" },
    { node: <IconBrandMysql size={40} />, title: "MySQL", href: "https://www.mysql.com/" },
    { node: <IconBrandLaravel size={40} />, title: "Laravel", href: "https://laravel.com/" },
    { node: <IconBrandReact size={40} />, title: "React", href: "https://react.dev" },
    { node: <IconBrandNodejs size={40} />, title: "Node.js", href: "https://nodejs.org" },
    { node: <IconBrandTypescript size={40} />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <IconBrandJavascript size={40} />, title: "JavaScript", href: "#" },
    { node: <IconBrandPhp size={40} />, title: "PHP", href: "https://www.php.net/" },
    { node: <IconBrandPython size={40} />, title: "Python", href: "https://www.python.org/" },
    { node: <IconBrandNextjs size={40} />, title: "Next.js", href: "https://nextjs.org/" },
    { node: <IconBrandWordpress size={40} />, title: "WordPress", href: "https://wordpress.org/" },
    { node: <IconBrandTailwind size={40} />, title: "Tailwind", href: "https://tailwindcss.com/" },
    { node: <IconBrandFigma size={40} />, title: "Figma", href: "https://figma.com/" },
    { node: <IconBrandHtml5 size={40} />, title: "HTML5", href: "#" },
    { node: <IconBrandCss3 size={40} />, title: "CSS3", href: "#" },
    { node: <IconBrandAws size={40} />, title: "AWS", href: "https://aws.amazon.com" },
    { node: <IconBrandWebflow size={40} />, title: "Webflow", href: "https://webflow.com" },
  ];

  return (
    <section id="tech">
      <div className="dark:color-base min-h-screen flex flex-col justify-center items-center px-4 py-16">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-6xl dark:bg-gradient-sky text-transparent bg-clip-text dark:font-bold py-4">
            Fueling My Creations
          </h2>
        </div>

        {/* Subtitle with FlipWords */}
        <div className="text-xl sm:text-2xl md:text-3xl font-semibold flex flex-wrap justify-center items-center gap-2 mb-10 text-slate-200">
          <span>The Tech Behind the</span>
          <span className="inline-block min-w-[120px] sm:min-w-[160px] text-center">
            <FlipWords
              words={["Build", "App", "Design", "Development"]}
              duration={2000}
              className="dark:text-blue-600 inline-block"
            />
          </span>
        </div>

        {/* Logo Loop Container */}
        <div className="w-full mx-4 rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-md shadow-lg p-6 sm:p-8 md:p-10 overflow-hidden">
          <LogoLoop
            logos={techLogos}
            speed={100}
            direction="left"
            logoHeight={40}
            gap={32}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#0f172a"
            ariaLabel="Technology partners"
            className="max-w-full"
          />
        </div>
      </div>
      <h2 className="text-6xl dark:bg-gradient-sky text-transparent bg-clip-text dark:font-bold py-4 justify-center items-center text-center">
        Technical Expertise
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
        <div class="p-4">
          <SpotlightCard className="custom-spotlight-card h-full" spotlightColor="rgba(50, 109, 194, 0.2)">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className=" flex items-center justify-center p-2"><IconCode size={50} /></div>
                <h3 className="text-2xl font-bold mb-2 text-center py-2">Full Stack Development</h3>
                <p className="text-base text-slate-200">
                  End-to-end web application design, development, and deployment across multiple frameworks.
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>

        <div class="p-4">
          <SpotlightCard className="custom-spotlight-card h-full" spotlightColor="rgba(50, 109, 194, 0.2)">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className=" flex items-center justify-center p-2"><IconDatabase size={50} /></div>
                <h3 className="text-2xl font-bold mb-2 text-center py-2">Database Design</h3>
                <p className="text-base text-slate-200">
                  Expert in relational and NoSQL databases with optimization and migration expertise.
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>

        <div class="p-4">
          <SpotlightCard className="custom-spotlight-card h-full" spotlightColor="rgba(50, 109, 194, 0.2)">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className=" flex items-center justify-center p-2"><IconBrandAws size={50} /></div>
                <h3 className="text-2xl font-bold mb-2 text-center py-2">AWS & linux</h3>
                <p className="text-base text-slate-200">
                  Server setup, configuration, migration, and cloud infrastructure management.
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>

        <div class="p-4">
          <SpotlightCard className="custom-spotlight-card h-full" spotlightColor="rgba(50, 109, 194, 0.2)">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className=" flex items-center justify-center p-2"><IconLockFilled size={50} /></div>

                <h3 className="text-2xl font-bold mb-2 text-center align-center py-2">Security & OWASP</h3>
                <p className="text-base text-slate-200">
                  Implements industry-standard security practices and compliance protocols in applications.
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>

    </section>
  );
};

export default Techstack;
