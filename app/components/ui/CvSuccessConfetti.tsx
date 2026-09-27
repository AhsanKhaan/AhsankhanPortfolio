"use client";

// Split into its own chunk (loaded via next/dynamic from CvRequestForm) so the 600KB+
// animation JSON never ships in the initial page bundle — only on a successful send.
import Lottie from "lottie-react";
import animationData from "@/data/confetti.json";

export default function CvSuccessConfetti({ className }: { className?: string }) {
  return <Lottie animationData={animationData} loop={false} className={className} />;
}
