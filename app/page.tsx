import React from 'react'
import { IconBrandGithub, IconMail, IconBrandLinkedin } from "@tabler/icons-react";
import Navbar from './components/sections/Navbar'
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
import AILab from './components/sections/AILab';
import WorkWithMe from './components/sections/WorkWithMe';
import RecruiterFAQ from './components/sections/RecruiterFAQ';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import SmoothScroll from './components/ui/SmoothScroll';
import { profile } from '@/data/profile';

const iconClass = "h-6 w-6 text-brand-text";

const page = () => {
  const socialLinks = [
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className={iconClass} aria-hidden="true" />,
      href: profile.links.linkedin,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className={iconClass} aria-hidden="true" />,
      href: profile.links.github,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      title: "Email",
      icon: <IconMail className={iconClass} aria-hidden="true" />,
      href: `mailto:${profile.email}`,
    },
  ];

  const links = [
    { title: "About", icon: null, href: "#about" },
    { title: "Services", icon: null, href: "#services" },
    { title: "Experience", icon: null, href: "#experience" },
    { title: "Projects", icon: null, href: "#case-studies" },
    { title: "FAQ", icon: null, href: "#faq" },
    { title: "Contact", icon: null, href: "#contact" },
  ];

  return (
    <div className="bg-brand-bg" style={{ overflowX: "clip" }}>
      <Navbar items={links} socialLinks={socialLinks} />
      <main>
        <Hero />
        <ImpactStats />
        <Marquee />
        <About />
        <DomainFit />
        <Services />
        <SmoothScroll>
          <Experience />
        </SmoothScroll>
        <SmoothScroll>
          <Techstack />
        </SmoothScroll>
        <CaseStudies />
        <SmoothScroll>
          <FeaturedProjects />
        </SmoothScroll>
        <AILab />
        <WorkWithMe />
        <RecruiterFAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default page
