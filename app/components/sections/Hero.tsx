// import React, { useState } from 'react'
import { BackgroundBeams } from '@/app/components/ui/BackgroundBeams'
import { NeonCard } from '@/app/components/ui/NeonCard';
import Image from 'next/image';
import { TypewriterEffectSmooth } from '../ui/TypewriterEffect';
import MagicButton from '../ui/MagicButton';
import { IconBriefcase2, IconMail } from "@tabler/icons-react";

const Hero = () => {






  const words = [
    { text: "Full" ,className: "text-blue-400/75 dark:text-blue-400/75" },
    { text: "Stack",className: "text-blue-400/75 dark:text-blue-400/75" },
    { text: "Developer", className: "text-emerald-400/25 dark:text-emerald-400/25 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent shadow-xl" },
  ];


  return (
    <>
      <BackgroundBeams />
      <section  id="home" className="relative flex flex-col md:flex-row items-center justify-between min-h-screen container mx-auto px-4 md:px-8 lg:px-12 xl:max-w-7xl">
        {/* Content Section */}
        <div className="z-10 flex-1 md:w-1/2 mt-20 md:mt-0 space-y-6 order-2 sm:order-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-200">
            <Image src="/assets/waving-hand-sign.svg" alt="Hand Wave" width={50} height={50} className="inline mx-2" />
            Hey, I&apos;m
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
            Let&apos;s create something amazing together!
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
              <MagicButton
                    title={"View my Work"}
                    icon={<IconBriefcase2 size={20} />}
                    position="left"
                    href="#projects"
                    otherClasses='text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 hover:bg-black dark:hover:bg-blue hover:text-black dark:hover:text-blue-900 dark:hover:font-bold transition-colors duration-300'
                  />
            <div className="relative">
              <MagicButton
                    title={"Get in Touch"}
                    icon={<IconMail size={20} />}
                    position="left"
                    href="mailto:ahsankhan.ubit@gmail.com"
                    otherClasses='border-2 border-transparent hover:border-blue-400 dark:hover:border-blue-400 color-black'
                  />
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 md:w-1/2 flex justify-center md:justify-end mt-12 md:mt-0 order-1 sm:order-2">
          <NeonCard className="rounded-full p-1" containerClassName="rounded-full">
            <Image
              src="/assets/Profile-v3.png"
              alt="Ahsan Khan - Full Stack Developer"
              width={450}
              height={450}
              className="rounded-full object-cover w-80 h-80"
              priority
            />
          </NeonCard>
        </div>

      </section>
    </>
  )
}

export default Hero