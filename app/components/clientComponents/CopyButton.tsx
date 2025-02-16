'use client'
import React,{ useState} from 'react'
import MagicButton from '../ui/MagicButton';
import { IconCheck,IconClipboard } from "@tabler/icons-react";
import Lottie from "lottie-react";
import animationData from "@/data/confetti.json";
const CopyButton = ({email}:{email: string}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <>
    <MagicButton
                    title={copied ? "Email Copied!" : "Copy Email"}
                    icon={copied ? <IconCheck size={20} /> : <IconClipboard size={20} />}
                    position="left"
                    handleClick={handleCopy}
                    otherClasses='border-2 border-transparent hover:border-blue-400 dark:hover:border-blue-400 color-black'
                  />
                  {copied && (
                    <Lottie 
                      animationData={animationData}
                      loop={false}
                      className="absolute -bottom-20 right-0 w-48 h-48"
                    />
                  )}
    </>
  )
}

export default CopyButton