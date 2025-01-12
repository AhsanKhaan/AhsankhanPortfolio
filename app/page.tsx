import React from 'react'
import Hero from './components/sections/Hero'
import Navbar from './components/sections/Navbar'
// import { HeroHighlight } from './components/Hero'
import {
  IconBrandGithub,
  IconMail,
  IconBrandLinkedin
} from "@tabler/icons-react";


const page = () => {
  const links = [

  
    
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
  return (
    <div>
      <Navbar  items={links}/>
      <Hero />
      <div >
      </div>
    </div>
  )
}

export default page