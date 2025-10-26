'use client'
import React,{ useState } from 'react'
import MagicButton from '../ui/MagicButton';
import { IconBriefcase } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import animationData from "@/data/confetti.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })
const DownloadCV = () => {

    const [isDownloading, setIsDownloading] = useState(false);
    const handleDownloadCV = () => {
        setIsDownloading(true);

        // Simulate download process
        const link = document.createElement("a");
        link.href = "/data/AhsanKhanSrSoftwareEngineer.pdf"; // Path to your CSV file
        link.download = "AhsanKhanSrSoftwareEngineer.pdf";
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