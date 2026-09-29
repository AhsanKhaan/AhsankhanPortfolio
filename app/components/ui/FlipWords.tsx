import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

// Rotating words, done entirely in CSS: every word sits in the same grid cell (so the box
// is always as wide as the longest word and nothing shifts) and runs the same keyframes,
// staggered by one slot each. No timers, no React re-renders, compositor-only properties.
export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const n = words.length;
  const slot = 100 / n;
  const edge = slot * 0.15;
  const name = `flip-words-${n}`;

  return (
    <span className={cn("relative inline-grid px-2 text-left", className)}>
      <style>{`
        @keyframes ${name} {
          0% { opacity: 0; transform: translateY(0.5em); }
          ${edge}% { opacity: 1; transform: none; }
          ${slot}% { opacity: 1; transform: none; }
          ${slot + edge}%, 100% { opacity: 0; transform: translateY(-0.5em); }
        }
      `}</style>
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden="true"
          data-first={i === 0 || undefined}
          className="flip-word col-start-1 row-start-1 whitespace-nowrap"
          style={{ animation: `${name} ${n * duration}ms ease-out ${i * duration}ms infinite both` } as CSSProperties}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

export default FlipWords;
