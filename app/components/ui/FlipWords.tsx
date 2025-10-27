"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.8,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          scale: 1.8,
          filter: "blur(6px)",
          position: "absolute",
          transition: {
            opacity: { duration: 0.3 },
            y: { type: "spring", stiffness: 200, damping: 20 },
            filter: { duration: 0.2, ease: "easeOut" },
          },
        }}
        className={cn(
          "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-2",
          className
        )}
        key={currentWord}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              opacity: { duration: 0.3, delay: wordIndex * 0.2 },
              y: { type: "spring", stiffness: 120, damping: 12 },
              filter: { duration: 0.25, ease: "easeOut" },
            }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  opacity: {
                    duration: 0.2,
                    delay: wordIndex * 0.2 + letterIndex * 0.05,
                  },
                  y: { type: "spring", stiffness: 140, damping: 14 },
                  filter: { duration: 0.2, ease: "easeOut" },
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default FlipWords;
