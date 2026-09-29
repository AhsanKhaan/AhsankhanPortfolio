"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { rafThrottle } from "@/lib/rafThrottle";

interface MagnetProps {
  children: ReactNode;
  className?: string;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}

// Mouse-following magnetic hover: pulls the element toward the cursor while it is
// within `padding` px of the element's edge.
export default function Magnet({
  children,
  className,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // rAF-throttled: raw mousemove can fire 100+/sec, and each tick did a layout read
    // (getBoundingClientRect) plus two setStates — unbounded, that was slowing click
    // response sitewide, not just near this element. Capping to one check per frame,
    // and skipping the setState entirely when nothing actually changed, means this
    // does zero work whenever the cursor isn't near the element.
    const onMove = rafThrottle((e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const within = Math.abs(dx) < width / 2 + padding && Math.abs(dy) < height / 2 + padding;

      setActive((prev) => (prev === within ? prev : within));
      setOffset((prev) => {
        const next = within ? { x: dx / strength, y: dy / strength } : { x: 0, y: 0 };
        return prev.x === next.x && prev.y === next.y ? prev : next;
      });
    });

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      onMove.cancel();
    };
  }, [padding, strength]);

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: active ? activeTransition : inactiveTransition,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
