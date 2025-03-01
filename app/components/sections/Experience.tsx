import React from 'react'
import { SparklesHeading } from '../ui/SparklesHeading'
import { MeteorsCard } from '../ui/MeteorsCard'
import { IconBrandGithub, IconMail, IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";

const Experience = () => {
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
                <div >
                    <SparklesHeading heading="Experience" />
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 bg-gray-900 p-6 flex flex-col items-center text-center rounded-lg shadow-lg">



                        <MeteorsCard number={12}>
                            <h1 className="font-bold text-4xl  mb-2 m-auto dark:bg-gradient-sky bg-clip-text text-transparent">Ahsan Khan</h1>
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
                    <div className="w-full md:flex-1 bg-green-200 p-4 ">

                        Section 2
                    </div>
                </div>
            </section>
        </>
    )
}

export default Experience