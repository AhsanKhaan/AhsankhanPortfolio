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
    //   title: "Home",
    //   icon: (
    //     <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   href: "#",
    // },

    {
      title: "Experience",
      icon: (
        <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#experience",
    },
    // {
    //   title: "Education",
    //   icon: (
    //     <IconSchool className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   href: "#",
    // },
    // {
    //   title: "Skills",
    //   icon: (
    //     <IconBulb className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   href: "#",
    // },
    {
      title: "Projects",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    // {
    //   title: "GitHub",
    //   icon: (
    //     <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   href: "https://github.com/ahsankhaan",
    //   target: "_blank",
    //   rel: "noopener noreferrer",
    // },
    // {
    //   title: "LinkedIn",
    //   icon: (
    //     <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   href: "https://linkedin.com/in/ahsankhaan",
    //   target: "_blank",
    //   rel: "noopener noreferrer",
    // },
    // {
    //   title:"Email",
    //   icon: (
    //     <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   href: "mailto:ahsankhan.ubit@gmail.com",
    //   target: "_blank",
    // }
  ];
  return (
    <div>
      <Navbar items={links} socialLinks={fixedIcons}/>
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