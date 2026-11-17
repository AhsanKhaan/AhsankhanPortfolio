import React, { Suspense } from 'react'
import SiteNav from './components/sections/SiteNav'
import Hero from './components/sections/Hero'
import ImpactStats from './components/sections/ImpactStats';
import Marquee from './components/sections/Marquee';
import About from './components/sections/About';
import DomainFit from './components/sections/DomainFit';
import Services from './components/sections/Services';
import Experience from './components/sections/Experience';
import Techstack from './components/sections/Techstack';
import CaseStudies from './components/sections/CaseStudies';
import FeaturedProjects from './components/sections/FeaturedProjects';
import AgenticAI from './components/sections/AgenticAI';
import WorkWithMe from './components/sections/WorkWithMe';
import RecruiterFAQ from './components/sections/RecruiterFAQ';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import FadeIn from './components/ui/FadeIn';

// Skips rendering work for a section until it nears the viewport (see .defer-render).
// sm/lg are the section's measured heights on mobile and on tablet/desktop.
const Deferred = ({ sm, lg, children }: { sm: number; lg: number; children: React.ReactNode }) => (
  <div className="defer-render" style={{ "--h-sm": `${sm}px`, "--h-lg": `${lg}px` } as React.CSSProperties}>
    {/* Its own Suspense boundary, so React hydrates each section in a separate task
        instead of one long task for the whole page. */}
    <Suspense>{children}</Suspense>
  </div>
);

const page = () => {
  return (
    <div className="bg-brand-bg" style={{ overflowX: "clip" }}>
      <SiteNav onHome />
      <main>
        <Hero />
        <Deferred sm={641} lg={412}>
          <ImpactStats />
        </Deferred>
        <Deferred sm={460} lg={672}>
          <Marquee />
        </Deferred>
        <Deferred sm={812} lg={698}>
          <About />
        </Deferred>
        <Deferred sm={1380} lg={908}>
          <DomainFit />
        </Deferred>
        <Deferred sm={1409} lg={1468}>
          <Services />
        </Deferred>
        <Deferred sm={5543} lg={3596}>
          <FadeIn y={50} duration={0.5}>
            <Experience />
          </FadeIn>
        </Deferred>
        <Deferred sm={2200} lg={1386}>
          <FadeIn y={50} duration={0.5}>
            <Techstack />
          </FadeIn>
        </Deferred>
        <Deferred sm={2962} lg={2422}>
          <CaseStudies />
        </Deferred>
        <Deferred sm={4377} lg={2418}>
          <FadeIn y={50} duration={0.5}>
            <FeaturedProjects />
          </FadeIn>
        </Deferred>
        <Deferred sm={2910} lg={1598}>
          <AgenticAI />
        </Deferred>
        <Deferred sm={1498} lg={932}>
          <WorkWithMe />
        </Deferred>
        <Deferred sm={952} lg={780}>
          <RecruiterFAQ />
        </Deferred>
        <Deferred sm={1175} lg={992}>
          <Contact />
        </Deferred>
      </main>
      <Footer />
    </div>
  )
}

export default page
