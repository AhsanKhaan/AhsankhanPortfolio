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
import { TypewriterEffectSmooth } from '../ui/TypewriterEffect';
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
      <BackgroundBeams className="text-2xl" />
      <section className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-8 mt-14 container mx-auto px-6 md:px-12 max-w-screen-lg">
        {/* Left Section: Text */}
        <div className=" bg-background flex flex-col justify-center px-4">
          {/* <!-- Left Section: Text --> */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            {/* <!-- 'Hey, I am' Text --> */}
          
            <h1 className="text-4xl md:text-5xl font-light  text-white">
              Hey, I am
            </h1>

            {/* <!-- 'Ahsan Khan' Text with Gradient --> */}
            <h2 className="text-4xl md:text-5xl font-bold  bg-text-gradient text-transparent bg-clip-text">
              Ahsan Khan
            </h2>

            {/* <!-- 'Full Stack Developer' Text with Green Gradient Theme --> */}
            
            <TypewriterEffectSmooth 
              words={[
                { text: "Senior Software Engineer" }
              ]}
              className="mt-0 text-4xl md:text-4xl font-bold bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]  text-transparent bg-clip-text"
            />
          </div>
        </div>


        {/* Right Section: Neon Card */}
        <div className="flex justify-center md:ml-auto">
          <NeonCard
            className="rounded-full"
            containerClassName="my-4 rounded-full"
          >
            <Image
              src="/assets/Profile-v3.png"
              alt="Ahsan Khan"
              width={300}
              height={300}
              style={{ borderRadius: "50%" }}
              className="object-cover rounded-full"
            />
          </NeonCard>
        </div>
      </section>
      <FloatingDock
        items={links}
        desktopClassName="relative flex justify-center text-2xl align-middle fixed bottom-10 left-1/2 transform -translate-x-1/2"
      />

    </>
  )
}

export default Hero