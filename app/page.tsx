import React from 'react'
import Hero from './components/sections/Hero'
import Navbar from './components/sections/Navbar'
import SmoothScroll from './components/ui/SmoothScroll';
// import { HeroHighlight } from './components/Hero'
// import {
//   IconBrandGithub,
//   IconMail,
//   IconBrandLinkedin
// } from "@tabler/icons-react";
import { IconBrandGithub, IconExchange, IconBriefcase, IconMail, IconBrandLinkedin } from "@tabler/icons-react";
import { FloatingNav } from '@/app/components/ui/FloatingNav';
import Experience from './components/sections/Experience';
const page = () => {
  const fixedIcons = [



    {
      title: "Linkedin",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://linkedin.com/in/ahsankhaan",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/ahsankhaan",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      title: "Contact Me",
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "mailto:ahsankhan.ubit@gmail.com",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  const links = [
    // {
    //   name: "Home",
    //   icon: (
    //     <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   link: "#",
    // },

    {
      name: "Experience",
      icon: (
        <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      link: "#experience",
    },
    // {
    //   name: "Education",
    //   icon: (
    //     <IconSchool className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   link: "#",
    // },
    // {
    //   name: "Skills",
    //   icon: (
    //     <IconBulb className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   link: "#",
    // },
    {
      name: "Projects",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      link: "#",
    },
    // {
    //   name: "GitHub",
    //   icon: (
    //     <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   link: "https://github.com/ahsankhaan",
    //   target: "_blank",
    //   rel: "noopener noreferrer",
    // },
    // {
    //   name: "LinkedIn",
    //   icon: (
    //     <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   link: "https://linkedin.com/in/ahsankhaan",
    //   target: "_blank",
    //   rel: "noopener noreferrer",
    // },
    // {
    //   name:"Email",
    //   icon: (
    //     <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   link: "mailto:ahsankhan.ubit@gmail.com",
    //   target: "_blank",
    // }
  ];
  return (
    <div>
      <Navbar items={fixedIcons} />
      <FloatingNav navItems={links} />
      <SmoothScroll>
        <Hero />
      </SmoothScroll>
      <SmoothScroll>
        <Experience />
      </SmoothScroll>

    </div>
  )
}

export default page