// 'use client'
// import React, { useState } from 'react'
import { BackgroundBeams } from '@/app/components/ui/BackgroundBeams'
import { FloatingDock } from '@/app/components/ui/FloatingDock'
import { IconBrandGithub, IconBrandX, IconExchange, IconHome, IconBulb, IconBriefcase, IconSchool } from "@tabler/icons-react";
import { NeonCard } from '@/app/components/ui/NeonCard';
import Image from 'next/image';
import { TypewriterEffectSmooth } from '../ui/TypewriterEffect';
import Lottie from "lottie-react";
import animationData from "@/data/confetti.json";
import { IconClipboard, IconCheck } from "@tabler/icons-react";
import MagicButton from '../ui/MagicButton';
import DownloadCV from '../clientComponents/DownloadCV';
import CopyButton from '../clientComponents/CopyButton';

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





  const words = [
    { text: "Full" ,className: "text-blue-400/75 dark:text-blue-400/75" },
    { text: "Stack",className: "text-blue-400/75 dark:text-blue-400/75" },
    { text: "Developer", className: "text-emerald-400/25 dark:text-emerald-400/25 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent shadow-xl" },
  ];


  return (
    <>
      <BackgroundBeams />
      <section className="relative flex flex-col md:flex-row items-center justify-between min-h-screen container mx-auto px-4 md:px-8 lg:px-12 xl:max-w-7xl">
        {/* Content Section */}
        <div className="z-10 flex-1 md:w-1/2 mt-20 md:mt-0 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-200">
            Hey, I'm
          </h1>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Ahsan Khan
          </h2>
          
          <TypewriterEffectSmooth 
            words={words} 
            className="text-4xl md:text-4xl lg:text-5xl font-semibold"
          />

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl">
            Passionate full-stack developer specializing in modern web technologies. 
            With 5+ years of experience building scalable applications and digital experiences. 
            Let's create something amazing together!
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <DownloadCV />
            <div className="relative">
              <CopyButton email="ahsankhan.ubit@gmail.com" />
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 md:w-1/2 flex justify-center md:justify-end mt-12 md:mt-0">
          <NeonCard className="rounded-full p-1" containerClassName="rounded-full">
            <Image
              src="/assets/Profile-v3.png"
              alt="Ahsan Khan - Full Stack Developer"
              width={450}
              height={450}
              className="rounded-full object-cover "
              priority
            />
          </NeonCard>
        </div>

        <FloatingDock
          items={links}
          desktopClassName="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-blur-lg rounded-full px-4 py-2 shadow-xl"
          mobileClassName="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-blur-lg rounded-full px-2 py-1"
        />
      </section>
    </>
  )
}

export default Hero