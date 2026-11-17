import { cn } from "@/lib/utils";
import React from "react";

// Deterministic 0..1 value per meteor and channel. This is a server component, so the
// values were already fixed at build time; a seeded hash keeps render pure (react-hooks/purity).
const rand = (idx: number, channel: number) => {
  const x = Math.sin(idx * 12.9898 + channel * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <>
      {meteors.map((el, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: 0,
            left: Math.floor(rand(idx, 1) * (400 - -400) + -400) + "px",
            animationDelay: rand(idx, 2) * (0.8 - 0.2) + 0.2 + "s",
            animationDuration: Math.floor(rand(idx, 3) * (10 - 2) + 2) + "s",
          }}
        ></span>
      ))}
    </>
  );
};
