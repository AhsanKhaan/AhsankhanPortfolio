'use client'
import React,{ useState } from 'react'
import MagicButton from '../ui/MagicButton';
import { IconBriefcase } from "@tabler/icons-react";
import Lottie from "lottie-react";
import animationData from "@/data/confetti.json";
const DownloadCV = () => {

    const [isDownloading, setIsDownloading] = useState(false);
    const handleDownloadCV = () => {
        setIsDownloading(true);

        // Simulate download process
        const link = document.createElement("a");
        link.href = "/data/portfolio.csv"; // Path to your CSV file
        link.download = "Ahsan_Khan_Portfolio.csv";
        link.click();

        // Stop animation after 2 seconds
        setTimeout(() => setIsDownloading(false), 2000);
    };
    return (
        <>
            <MagicButton
                title="Download CV"
                icon={<IconBriefcase size={20} />}
                position="right"
                handleClick={handleDownloadCV}
                otherClasses="text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 hover:bg-black dark:hover:bg-blue hover:text-black dark:hover:text-blue-900 dark:hover:font-bold transition-colors duration-300"
            />
            {isDownloading && (
                <Lottie
                    animationData={animationData}
                    loop={false}
                    className="absolute bottom-0 right-0 transform -translate-x-1/2 w-200 h-200"
                />
            )}
        </>
    )
}

export default DownloadCV