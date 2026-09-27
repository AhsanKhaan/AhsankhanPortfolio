"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { rafThrottle } from "@/lib/rafThrottle";
import { marqueeImages } from "@/data/profile";

const row1 = marqueeImages.slice(0, 6);
const row2 = marqueeImages.slice(6);

// Two rows of project screenshots that slide in opposite directions as the page scrolls.
const Marquee = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const updateOffset = () => {
      const el = sectionRef.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    // rAF-throttled: native scroll events can fire well past 60/sec, and each one
    // queued a React re-render of the whole 33-tile marquee — unbounded, that was
    // adding to the click-response delay elsewhere on the page during/just after a
    // scroll. Capped to once per animation frame instead.
    const onScroll = rafThrottle(updateOffset);
    updateOffset();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      onScroll.cancel();
    };
  }, [reduce]);

  return (
    <section ref={sectionRef} aria-label="Screenshots of my work" className="flex flex-col gap-3 overflow-hidden pt-12 pb-10 sm:pt-16 md:pt-20">
      <Row images={row1} transform={`translateX(${offset - 200}px)`} />
      <Row images={row2} transform={`translateX(${-(offset - 200)}px)`} />
    </section>
  );
};

function Row({ images, transform }: { images: typeof marqueeImages; transform: string }) {
  const tripled = [...images, ...images, ...images];
  return (
    <div className="flex w-max gap-3" style={{ transform, willChange: "transform" }}>
      {tripled.map((img, i) => (
        <div
          key={i}
          className="relative h-[180px] w-[280px] shrink-0 overflow-hidden rounded-2xl border border-brand-border bg-brand-surface sm:h-[270px] sm:w-[420px]"
          aria-hidden={i >= images.length ? true : undefined}
        >
          <Image src={img.src} alt={i < images.length ? img.alt : ""} fill sizes="420px" className="object-cover object-top" />
        </div>
      ))}
    </div>
  );
}

export default Marquee;
