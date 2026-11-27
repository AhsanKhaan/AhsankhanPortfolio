"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { rafThrottle } from "@/lib/rafThrottle";

// Gives a portrait image the hero's 3D motion: a CSS 3D stage that turns toward the pointer
// on desktop and plays one 4.2 s look-around once the page is idle (data-look; keyframes
// in app/globals.css). The turn is a CSS transform, so it costs no repaint of the image.
// Reduced motion: nothing moves.

const MAX_TURN_Y = 16; // degrees
const MAX_TURN_X = 8;

export default function TiltPortrait({ children, className = "" }: { children: ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const host = root?.closest("section");
    if (!root || !host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const look = () => {
      root.dataset.look = "";
    };
    const idleId = window.requestIdleCallback ? window.requestIdleCallback(look, { timeout: 2500 }) : window.setTimeout(look, 1500);

    const turn = rafThrottle((x: number, y: number) => {
      const rect = root.getBoundingClientRect();
      const dx = (x - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
      const dy = (y - (rect.top + rect.height / 2)) / (window.innerHeight / 2);
      root.style.setProperty("--ry", `${Math.max(-1, Math.min(1, dx)) * MAX_TURN_Y}deg`);
      root.style.setProperty("--rx", `${Math.max(-1, Math.min(1, -dy)) * MAX_TURN_X}deg`);
    });
    const handleMove = (e: PointerEvent) => {
      delete root.dataset.look; // the pointer takes over from the look-around
      turn(e.clientX, e.clientY);
    };
    const handleLeave = () => {
      turn.cancel();
      root.style.setProperty("--ry", "0deg");
      root.style.setProperty("--rx", "0deg");
    };
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (finePointer) {
      host.addEventListener("pointermove", handleMove, { passive: true });
      host.addEventListener("pointerleave", handleLeave);
    }

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      turn.cancel();
      host.removeEventListener("pointermove", handleMove);
      host.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className={`code-portrait relative ${className}`}>
      <div className="code-portrait-stage">{children}</div>
    </div>
  );
}
