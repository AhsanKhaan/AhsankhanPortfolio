'use client'
import React,{useState,useRef} from 'react'
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
import Lottie from "lottie-react";
import animationData from "@/data/confetti.json";
import { motion } from "framer-motion";
import { IconClipboard, IconCheck } from "@tabler/icons-react";
import MagicButton from '../ui/MagicButton';

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





  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "hsu@jsmastery.pro";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Your_Resume.pdf";
    link.click();
  };
  return (

    <>
      <BackgroundBeams className="text-2xl" />
      <section className="flex flex-col md:flex-row  items-center gap-8 md:gap-8 mt-14 container mx-auto px-6 md:px-12 max-w-screen-lg">
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
                { text: "Software Engineer" },
              ]}
              className="mt-0 text-4xl md:text-4xl font-bold bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]  text-transparent bg-clip-text"
            />
            <section className="flex flex-col items-center justify-center text-center  px-4">
              <p className="text-lg max-w-2xl">
                Hi, I'm a passionate developer crafting amazing digital experiences.
                Let's collaborate to build something innovative! Feel free to reach out at
                {/* <span className="text-blue-500 cursor-pointer ml-2" onClick={handleCopyEmail}>
                  {email}
                  {emailCopied ? (
                    <IconCheck size={16} className="inline ml-1 text-green-500" />
                  ) : (
                    <IconClipboard size={16} className="inline ml-1" />
                  )}
                </span> */}
              </p>
              <div className="flex gap-4 mt-6">
                <div
                className={`absolute -bottom-5 right-0 ${copied ? "block" : "block"
                  }`}
              >
                {/* <img src="/confetti.gif" alt="confetti" /> */}
                <Lottie options={defaultOptions} height={200} width={400} />
              </div>

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IconClipboard />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />

              </div>
            </section>

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