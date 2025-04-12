import React from 'react'
import { SparklesHeading } from '../ui/SparklesHeading'
import { MeteorsCard } from '../ui/MeteorsCard'
import { IconBrandGithub, IconMail, IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { Timeline } from '../ui/Timeline';

const Experience = () => {
    const timelineData = [
        {
          title: "2024",
          content: (
            <div>
              <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                Built and launched Aceternity UI and Aceternity UI Pro from scratch
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="https://assets.aceternity.com/templates/startup-1.webp"
                  alt="startup template"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
                <Image
                  src="https://assets.aceternity.com/templates/startup-2.webp"
                  alt="startup template"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
                <Image
                  src="https://assets.aceternity.com/templates/startup-3.webp"
                  alt="startup template"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
                <Image
                  src="https://assets.aceternity.com/templates/startup-4.webp"
                  alt="startup template"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
              </div>
            </div>
          ),
        },
        {
          title: "Early 2023",
          content: (
            <div>
              <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                I usually run out of copy, but when I see content this big, I try to
                integrate lorem ipsum.
              </p>
              <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                Lorem ipsum is for people who are too lazy to write copy. But we are
                not. Here are some more example of beautiful designs I built.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="https://assets.aceternity.com/pro/hero-sections.png"
                  alt="hero template"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
                <Image
                  src="https://assets.aceternity.com/features-section.png"
                  alt="feature template"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
                <Image
                  src="https://assets.aceternity.com/pro/bento-grids.png"
                  alt="bento template"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
                <Image
                  src="https://assets.aceternity.com/cards.png"
                  alt="cards template"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
              </div>
            </div>
          ),
        },
        {
          title: "Changelog",
          content: (
            <div>
              <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                Deployed 5 new components on Aceternity today
              </p>
              <div className="mb-8">
                <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                  ✅ Card grid component
                </div>
                <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                  ✅ Startup template Aceternity
                </div>
                <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                  ✅ Random file upload lol
                </div>
                <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                  ✅ Himesh Reshammiya Music CD
                </div>
                <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                  ✅ Salman Bhai Fan Club registrations open
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="https://assets.aceternity.com/pro/hero-sections.png"
                  alt="hero template"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
                <Image
                  src="https://assets.aceternity.com/features-section.png"
                  alt="feature template"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
                <Image
                  src="https://assets.aceternity.com/pro/bento-grids.png"
                  alt="bento template"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
                <Image
                  src="https://assets.aceternity.com/cards.png"
                  alt="cards template"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
              </div>
            </div>
          ),
        },
      ];
    return (
        <>
            <section id='experience' className='dark:bg-black min-h-screen'>
                {/* <div className='dark:bg-darkSection my-10 dark:bg-gray' id='experience'>
                    <h1 className='text-3xl font-bold text-center'>Experience</h1>
                    <div className='flex flex-col md:flex-row justify-between items-center my-10'>
                        <div className='flex flex-col md:w-1/2'>
                            <h2 className='text-2xl font-semibold'>Frontend Developer</h2>
                            <p className='text-lg text-gray-500'>Company Name</p>
                            <p className='text-lg text-gray-500'>May 2021 - Present</p>
                            <ul className='list-disc list-inside'>
                                <li>Worked on a project</li>
                                <li>Worked on a project</li>
                                <li>Worked on a project</li>
                            </ul>
                        </div>
                        <div className='flex flex-col md:w-1/2'>
                            <h2 className='text-2xl font-semibold'>Backend Developer</h2>
                            <p className='text-lg text-gray-500'>Company Name</p>
                            <p className='text-lg text-gray-500'>May 2021 - Present</p>
                            <ul className='list-disc list-inside'>
                                <li>Worked on a project</li>
                                <li>Worked on a project</li>
                                <li>Worked on a project</li>
                            </ul>
                        </div>
                    </div>
                </div> */}
                
                    <SparklesHeading heading="MY JOURNEY" />
                
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 bg-gray-900 p-6 flex flex-col items-center text-center rounded-lg shadow-lg">



                        <MeteorsCard number={12}>
                            {/* <h1 className="font-bold text-4xl  mb-2 m-auto dark:bg-gradient-sky bg-clip-text text-transparent">Ahsan Khan</h1> */}
                            <p className="font-normal text-base text-slate-200 mb-4">
                                A passionate Software Engineer having 5+ Years Expereince in web development. I am a tech enthusiast who loves crafting scalable applications and exploring new technologies.
                            </p>
                            <div className="w-full flex flex-col items-start mt-4 space-y-3">
                                <div className="flex items-center gap-3">
                                    <IconBrandGithub size={24} className="text-white" />
                                    <Link href="https://github.com/ahsankhaan" target="_blank" className="text-lg font-medium text-blue-400 hover:text-blue-300 ">
                                        github.com/ahsankhaan
                                    </Link>
                                </div>
                                <div className="flex items-center gap-3">
                                    <IconMail size={24} className="text-white" />
                                    <Link href="mailto:ahsankhan.ubit@gmail.com" className="text-lg font-medium text-blue-400 hover:text-blue-300">
                                        ahsankhan.ubit@gmail.com
                                    </Link>
                                </div>
                                <div className="flex items-center gap-3">
                                    <IconBrandLinkedin size={24} className="text-white" />
                                    <Link href="https://linkedin.com/in/ahsankhaan" target="_blank" className="text-lg font-medium text-blue-400 hover:text-blue-300">
                                        linkedin.com/in/ahsankhaan
                                    </Link>
                                </div>
                            </div>
                        </MeteorsCard>
                    </div>
                    <div className="w-full md:flex-1 bg-black p-4 ">

                        <Timeline data={timelineData} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Experience