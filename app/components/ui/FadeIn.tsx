import type { CSSProperties, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}

// Scroll reveal with zero JavaScript: a CSS scroll-driven animation (animation-timeline:
// view(), see .fade-in in globals.css). Nothing hydrates, so pages no longer pay for ~50
// client islands and an IntersectionObserver. Browsers without scroll timelines, and
// visitors who prefer reduced motion, simply see the content.
// `delay` staggers siblings by starting their reveal slightly later in the scroll range;
// `duration` is kept for API compatibility (the scroll position drives timing).
export default function FadeIn({ children, className, delay = 0, x = 0, y = 30 }: FadeInProps) {
  const style = {
    "--fade-x": `${x}px`,
    "--fade-y": `${y}px`,
    "--fade-delay": delay,
  } as CSSProperties;

  return (
    <div className={className ? `fade-in ${className}` : "fade-in"} style={style}>
      {children}
    </div>
  );
}
