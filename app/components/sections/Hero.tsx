import React from 'react'
import { BackgroundBeams } from '@/app/components/ui/BackgroundBeams'
import { FloatingDock } from '@/app/components/ui/FloatingDock'
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconBulb,
  IconBriefcase,
  IconSchool,
} from "@tabler/icons-react";
import { NeonCard } from '@/app/components/ui/NeonCard';
import Image from 'next/image';
const Hero = () => {


  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Experience",
      icon: (
        <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Education",
      icon: (
        <IconSchool className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Skills",
      icon: (
        <IconBulb className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Projects",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
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
  ];
  return (

    <>
      <BackgroundBeams className='text-2xl' />
      <section className="flex flex-col md:flex-row md:justify-center md:items-center md:gap-10 mt-14">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-4xl font-bold">Full Stack Developer</h1>
          <p className="text-lg">Key Skills: Next.js, React, Tailwind CSS, Framer Motion, Node.js, Express.js, MongoDB, PostgreSQL</p>
        </div>
        <div className='mx-auto max-w-none z-20  rounded-full items-center md:items-end'>


        <NeonCard
          className="rounded-full "
          containerClassName="my-4 rounded-full "
        >
        <Image
          src="/assets/Profile-v3.png"
          alt="Ahsan Khan"
          width={300}
          height={300}
          style={{ borderRadius: "50%" ,marginLeft:"10px",marginRight:"10px"}}
          className="object-cover rounded-full"
        />
      </NeonCard>
        </div>
      </section>
      <FloatingDock items={links} desktopClassName='relative flex justify-center text-2xl align-middle fixed bottom-10 left-1/2 transform -translate-x-1/2' />
    </>
  )
}

export default Hero