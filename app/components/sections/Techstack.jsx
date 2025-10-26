import React from 'react'
import FlipWords from '../ui/Flipwords';
import {   
    IconBrandReact,
    IconBrandNextjs,
    IconBrandTypescript,
    IconBrandTailwind,
 } from '@tabler/icons-react';

const Techstack = () => {

    const techLogos = [
    { node: <IconBrandReact />, title: "React", href: "https://react.dev" },
    { node: <IconBrandNextjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <IconBrandTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <IconBrandTailwind />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    ];
    return (
        <>
            <section id='tech' className='dark:bg-black min-h-screen'>
                <div className="font-bold flex flex-col justify-center items-center text-center h-full pt-20 pb-10">
                    {/* First line */}
                    <div className="text-6xl dark:bg-gradient-sky text-transparent bg-clip-text dark:font-bold py-4">
                        Fueling My Creations
                    </div>

                    {/* Second line */}
                    <div className="text-4xl font-bold flex items-center gap-2">
                        <span>The Tech Behind the</span>
                        <span className="inline-block min-w-[160px] text-center">
                            <FlipWords
                                words={["Build", "App", "Design", "Development"]}
                                duration={2000}
                                className="dark:text-blue-600 inline-block"
                            />
                        </span>
                    </div>
                </div>

            </section>

        </>
    )
}

export default Techstack