"use client";

import { useEffect } from "react";

// Below-the-fold sections use `content-visibility: auto` with estimated heights
// (.defer-render in globals.css). Jumping to an anchor through unrendered sections
// lands on the estimate, then the page shifts as they render: the "jerk" on nav clicks.
// Before any in-page jump, render every section for real (html.render-all) so the
// browser scrolls to the true position. The cost is paid once, on the first jump.
function renderAll() {
  document.documentElement.classList.add("render-all");
}

function isInPageHashLink(a: HTMLAnchorElement) {
  if (!a.hash) return false;
  return a.origin === window.location.origin && a.pathname === window.location.pathname;
}

export default function InPageNav() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (a && isInPageHashLink(a)) renderAll();
    };
    // Capture phase: runs before Next's Link handler and the browser's default scroll.
    document.addEventListener("click", onClick, true);

    // Arriving from another page with a hash (/#contact): re-aim once sections are real.
    const { hash } = window.location;
    if (hash.length > 1) {
      renderAll();
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
    }
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
