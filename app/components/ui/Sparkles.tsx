"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type SparklesProps = {
  className?: string;
  particleColor?: string;
  particleDensity?: number;
  minSize?: number;
  maxSize?: number;
};

type Particle = { x: number; y: number; r: number; vx: number; vy: number; a: number; da: number };

const rand = (min: number, max: number) => min + Math.random() * (max - min);

// Drifting, twinkling star field on a plain 2D canvas. It is set up on first scroll into
// view, animates only while visible, and draws one still frame under reduced motion.
export const SparklesCore = ({ className, particleColor = "#ffffff", particleDensity = 120, minSize = 1, maxSize = 3 }: SparklesProps) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = particleColor;
      // Same density model as tsparticles: particleDensity particles per 400x400 area.
      const count = Math.round(((width * height) / (400 * 400)) * particleDensity);
      particles = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = rand(0.05, 0.4);
        return {
          x: rand(0, width),
          y: rand(0, height),
          r: rand(minSize, maxSize),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          a: rand(0.1, 1),
          da: rand(0.005, 0.02) * (Math.random() < 0.5 ? -1 : 1),
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Particles are 1-2px across, where a square is indistinguishable from a circle
      // and far cheaper to fill than an arc path.
      for (const p of particles) {
        ctx.globalAlpha = p.a;
        ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
      }
    };

    const step = () => {
      for (const p of particles) {
        p.x = (p.x + p.vx + width) % width;
        p.y = (p.y + p.vy + height) % height;
        p.a += p.da;
        if (p.a <= 0.1 || p.a >= 1) {
          p.da = -p.da;
          p.a = Math.min(1, Math.max(0.1, p.a));
        }
      }
      draw();
      frame = requestAnimationFrame(step);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return stop();
      if (!particles.length) {
        setup();
        draw();
        canvas.style.opacity = "1";
      }
      if (!reduce && !frame) frame = requestAnimationFrame(step);
    });
    io.observe(canvas);

    return () => {
      stop();
      io.disconnect();
    };
  }, [particleColor, particleDensity, minSize, maxSize]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn("h-full w-full opacity-0 transition-opacity duration-1000", className)}
    />
  );
};
