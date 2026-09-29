"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { rafThrottle } from "@/lib/rafThrottle";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

// Word-by-word scroll reveal. A single throttled scroll handler writes one CSS variable
// (--reveal, 0..1) on the paragraph; each word computes its own opacity from it in CSS
// (.reveal-word in globals.css). Screen readers get the plain sentence.
export default function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Progress runs from the paragraph's top reaching 80% of the viewport to its bottom
    // reaching 20% — the same window as the original ["start 0.8", "end 0.2"] offsets.
    const update = rafThrottle(() => {
      const { top, height } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh * 0.8 - top) / (height + vh * 0.6);
      el.style.setProperty("--reveal", String(Math.min(1, Math.max(0, progress))));
    });

    // Only track scroll while the paragraph is on screen: reading its rect while the
    // section is skipped by content-visibility would force that section to lay out.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
      } else {
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      update.cancel();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <p ref={ref} className={className} style={{ "--words": words.length } as CSSProperties}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className="reveal-word" style={{ "--i": i } as CSSProperties}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </p>
  );
}
