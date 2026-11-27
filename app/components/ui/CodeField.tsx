"use client";
import { useEffect, useRef } from "react";
import { decodeState, layoutGlyphs, scrambleGlyph, spotlight } from "@/lib/codeField";
import { rafThrottle } from "@/lib/rafThrottle";

// Hero background: a faint field of real TypeScript (built from brand/profile.json by
// buildCodeSource) that decodes once on load and lights up in the brand gradient under
// the pointer.
//
// Cost model: the base text is painted once (one fillText per row), and the spotlight
// canvas redraws only the few hundred glyphs around the pointer, only while it moves.
// Nothing runs on a timer, so an idle page spends no CPU here, and nothing moves for
// longer than the ~1.4 s decode, so no pause control is needed.
// Reduced motion: the text is drawn at rest and the spotlight stays off.
// Touch screens: the decode plays once; there is no pointer to follow.

const DECODE_MS = 1400;
const BAND = 10; // scrambling columns ahead of the decoded text
const BASE_ALPHA = 0.085;
const SETTLE_MS = 140; // after the pointer stops, glyphs settle back to real code

export default function CodeField({ source }: { source: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLCanvasElement>(null);
  const lightRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const base = baseRef.current;
    const light = lightRef.current;
    const host = wrap?.parentElement;
    const bctx = base?.getContext("2d");
    const lctx = light?.getContext("2d");
    if (!wrap || !base || !light || !host || !bctx || !lctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    // Colours come from the brand tokens (app/brand.css), never hard-coded here.
    const root = getComputedStyle(document.documentElement);
    const ink = root.getPropertyValue("--color-text").trim();
    const accentA = root.getPropertyValue("--color-accent-start").trim();
    const accentB = root.getPropertyValue("--color-accent-end").trim();
    const family = getComputedStyle(wrap).fontFamily;

    let w = 0;
    let h = 0;
    let size = 13;
    let lineH = 19;
    let charW = 8;
    let cols = 0;
    let rows = 0;
    let lines: string[] = [];
    let lag: number[] = [];
    let decodeT = reduce ? 1 : 0;
    let decodeRaf = 0;
    let idleId = 0;
    let settleTimer = 0;
    let px = Number.NaN;
    let py = Number.NaN;

    const setup = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = w < 640 ? 11 : 13;
      lineH = Math.round(size * 1.45);
      for (const c of [base, light]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      for (const ctx of [bctx, lctx]) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.font = `${size}px ${family}`;
        ctx.textBaseline = "top";
      }
      charW = bctx.measureText("M").width || size * 0.6;
      cols = Math.ceil(w / charW) + 1;
      rows = Math.ceil(h / lineH) + 1;
      lines = layoutGlyphs(source, cols, rows);
      lag = lines.map(() => Math.floor(Math.random() * 14));
    };

    const drawBase = () => {
      bctx.clearRect(0, 0, w, h);
      bctx.globalAlpha = BASE_ALPHA;
      bctx.fillStyle = ink;
      for (let r = 0; r < rows; r++) {
        const y = r * lineH;
        if (decodeT >= 1) {
          bctx.fillText(lines[r], 0, y);
          continue;
        }
        let resolved = 0;
        let scramble = "";
        for (let c = 0; c < cols; c++) {
          const state = decodeState(c, decodeT, cols, BAND, lag[r]);
          if (state === "resolved") resolved = c + 1;
          else if (state === "scramble") scramble += scrambleGlyph(Math.random());
          else break;
        }
        if (resolved) bctx.fillText(lines[r].slice(0, resolved), 0, y);
        if (scramble) {
          bctx.globalAlpha = BASE_ALPHA * 3;
          bctx.fillStyle = accentB;
          bctx.fillText(scramble, resolved * charW, y);
          bctx.globalAlpha = BASE_ALPHA;
          bctx.fillStyle = ink;
        }
      }
      bctx.globalAlpha = 1;
    };

    const drawLight = (scrambling: boolean) => {
      lctx.clearRect(0, 0, w, h);
      if (Number.isNaN(px) || decodeT < 1) return;
      const radius = w < 1024 ? 130 : 180;
      const grad = lctx.createLinearGradient(px - radius, 0, px + radius, 0);
      grad.addColorStop(0, accentA);
      grad.addColorStop(1, accentB);
      lctx.fillStyle = grad;
      const r0 = Math.max(0, Math.floor((py - radius) / lineH));
      const r1 = Math.min(rows - 1, Math.ceil((py + radius) / lineH));
      const c0 = Math.max(0, Math.floor((px - radius) / charW));
      const c1 = Math.min(cols - 1, Math.ceil((px + radius) / charW));
      for (let r = r0; r <= r1; r++) {
        const cy = r * lineH + lineH / 2;
        for (let c = c0; c <= c1; c++) {
          let ch = lines[r][c];
          if (!ch || ch === " ") continue;
          const k = spotlight(Math.hypot(c * charW + charW / 2 - px, cy - py), radius);
          if (k < 0.03) continue;
          if (scrambling && Math.random() < k * 0.12) ch = scrambleGlyph(Math.random());
          lctx.globalAlpha = 0.12 + k * 0.88;
          lctx.fillText(ch, c * charW, r * lineH);
        }
      }
      lctx.globalAlpha = 1;
    };

    const runDecode = () => {
      const start = performance.now();
      const tick = (now: number) => {
        decodeT = Math.min(1, (now - start) / DECODE_MS);
        drawBase();
        if (decodeT < 1) decodeRaf = requestAnimationFrame(tick);
      };
      decodeRaf = requestAnimationFrame(tick);
    };

    const onMove = rafThrottle((x: number, y: number) => {
      const rect = wrap.getBoundingClientRect();
      px = x - rect.left;
      py = y - rect.top;
      drawLight(true);
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => drawLight(false), SETTLE_MS);
    });
    const handleMove = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const handleLeave = () => {
      onMove.cancel();
      window.clearTimeout(settleTimer);
      px = py = Number.NaN;
      drawLight(false);
    };

    const onResize = rafThrottle(() => {
      setup();
      drawBase();
      drawLight(false);
    });
    const observer = new ResizeObserver(() => onResize());

    let disposed = false;
    // load() rejects when one face in the stack (e.g. next/font's local() fallback) is
    // missing; the field still draws with whatever face is available, so carry on.
    const ready = document.fonts.load(`${size}px ${family}`).catch(() => undefined);
    ready.then(() => {
      if (disposed) return;
      setup();
      if (reduce) {
        drawBase();
      } else {
        // Start once the page is idle, so the sweep never competes with hydration.
        const go = () => runDecode();
        idleId = window.requestIdleCallback ? window.requestIdleCallback(go, { timeout: 1200 }) : window.setTimeout(go, 300);
      }
      observer.observe(wrap);
      if (!reduce && finePointer) {
        host.addEventListener("pointermove", handleMove, { passive: true });
        host.addEventListener("pointerleave", handleLeave);
      }
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(decodeRaf);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      window.clearTimeout(settleTimer);
      onMove.cancel();
      onResize.cancel();
      observer.disconnect();
      host.removeEventListener("pointermove", handleMove);
      host.removeEventListener("pointerleave", handleLeave);
    };
  }, [source]);

  return (
    <div ref={wrapRef} aria-hidden="true" className="code-field pointer-events-none absolute inset-0 z-0 overflow-hidden font-mono">
      <canvas ref={baseRef} className="absolute inset-0 h-full w-full" />
      <canvas ref={lightRef} className="absolute inset-0 h-full w-full" />
      <div className="code-field-veil absolute inset-0" />
    </div>
  );
}
