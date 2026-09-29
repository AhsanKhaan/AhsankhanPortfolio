"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}

// One observer for every FadeIn on the page; the animation itself is the .fade-in CSS
// transition in globals.css, so no per-element animation runtime runs on the main thread.
let observer: IntersectionObserver | null = null;

function observe(el: Element) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-inview", "");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "50px" },
  );
  observer.observe(el);
  return () => observer?.unobserve(el);
}

export default function FadeIn({ children, className, delay = 0, duration = 0.7, x = 0, y = 30 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) return observe(ref.current);
  }, []);

  const style = {
    "--fade-x": `${x}px`,
    "--fade-y": `${y}px`,
    "--fade-delay": `${delay}s`,
    "--fade-duration": `${duration}s`,
  } as CSSProperties;

  return (
    <div ref={ref} className={className ? `fade-in ${className}` : "fade-in"} style={style}>
      {children}
    </div>
  );
}
