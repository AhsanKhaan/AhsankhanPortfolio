"use client";

import { useEffect, useRef, type Ref } from "react";
import Image from "next/image";
import { rafThrottle } from "@/lib/rafThrottle";
import { marqueeImages } from "@/data/profile";

const row1 = marqueeImages.slice(0, 6);
const row2 = marqueeImages.slice(6);

// Two rows of project screenshots that slide in opposite directions as the page scrolls.
// The scroll handler writes each row's transform directly (at most once per frame) rather
// than through React state, so scrolling never re-renders the 33 image tiles.
const Marquee = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const update = rafThrottle(() => {
      const section = sectionRef.current;
      if (!section || !row1Ref.current || !row2Ref.current) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3 - 200;
      row1Ref.current.style.transform = `translateX(${offset}px)`;
      row2Ref.current.style.transform = `translateX(${-offset}px)`;
    });
    // Only track scroll while the rows are on screen: reading layout while the section is
    // skipped by content-visibility would force it to lay out.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        update();
        window.addEventListener("scroll", update, { passive: true });
      } else {
        window.removeEventListener("scroll", update);
      }
    });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
      update.cancel();
    };
  }, []);

  return (
    <section ref={sectionRef} aria-label="Screenshots of my work" className="flex flex-col gap-3 overflow-hidden pt-12 pb-10 sm:pt-16 md:pt-20">
      <Row ref={row1Ref} images={row1} initialX={-200} />
      <Row ref={row2Ref} images={row2} initialX={200} />
    </section>
  );
};

function Row({ ref, images, initialX }: { ref: Ref<HTMLDivElement>; images: typeof marqueeImages; initialX: number }) {
  const tripled = [...images, ...images, ...images];
  return (
    <div ref={ref} className="flex w-max gap-3" style={{ transform: `translateX(${initialX}px)`, willChange: "transform" }}>
      {tripled.map((img, i) => (
        <div
          key={i}
          className="relative h-[180px] w-[280px] shrink-0 overflow-hidden rounded-2xl border border-brand-border bg-brand-surface sm:h-[270px] sm:w-[420px]"
          aria-hidden={i >= images.length ? true : undefined}
        >
          <Image src={img.src} alt={i < images.length ? img.alt : ""} fill sizes="(min-width: 640px) 420px, 280px" className="object-cover object-top" />
        </div>
      ))}
    </div>
  );
}

export default Marquee;
