"use client";
import { useEffect, useRef } from "react";
import portrait from "@/data/codePortrait.json";
import { levelRows, levelRuns } from "@/lib/codePortrait";
import { decodeState, scrambleGlyph } from "@/lib/codeField";
import { rafThrottle } from "@/lib/rafThrottle";

// The profile photo redrawn as code: data/codePortrait.json (built from the photo by
// scripts/build-code-portrait.mjs) gives each cell a brightness level, and every cell is
// written with the next glyph of the same TypeScript the hero's code field shows.
//
// Look: dark levels (hair, suit) are faint code; bright levels are blocks of the accent
// gradient with the code cut into them, like ponytail.dev's figure, so the face reads at
// any size.
// 3D: the levels sit on three canvases at different depths (dark at the back, bright at
// the front) inside a CSS 3D stage, so turning the stage gives real parallax. The turn is
// a CSS transform: it costs no canvas redraw. It follows the pointer on desktop and plays
// one 4 s look-around after the decode everywhere else.
// Reduced motion: drawn at rest, no decode, no turn.
// Colours: the brand's vertical accent gradient, from the tokens in app/brand.css.

const DECODE_MS = 1600;
const BAND_ROWS = 6;
const LAYER_DEPTH = [-30, 0, 30]; // px: levels 1-2, 3-4, 5-6
const MAX_TURN_Y = 20; // degrees
const MAX_TURN_X = 10;

const BLOCK_FROM = 3; // levels from here up are drawn as lit blocks
const CLEAR_PAD = 8; // px of portrait erased around overlapping [data-code-clear] text

const layerOf = (level: number) => (level <= 2 ? 0 : level <= 4 ? 1 : 2);
// Glyph-only levels: faint to medium; block levels: from dim to nearly solid.
const alphaOf = (level: number) =>
  level < BLOCK_FROM ? 0.3 + (level - 1) * 0.22 : 0.32 + ((level - BLOCK_FROM) / (portrait.levels - BLOCK_FROM)) * 0.63;

export default function CodePortrait({ source, label, className = "" }: { source: string; label: string; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const canvases = canvasRefs.current.filter((c): c is HTMLCanvasElement => !!c);
    const ctxs = canvases.map((c) => c.getContext("2d"));
    const host = root?.closest("section");
    if (!root || !host || canvases.length !== LAYER_DEPTH.length || ctxs.some((c) => !c)) return;
    const layers = ctxs as CanvasRenderingContext2D[];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const tokens = getComputedStyle(document.documentElement);
    const accentA = tokens.getPropertyValue("--color-accent-start").trim();
    const accentB = tokens.getPropertyValue("--color-accent-end").trim();
    const ground = tokens.getPropertyValue("--color-bg").trim();
    const family = getComputedStyle(root).fontFamily;
    const byLevel = levelRows(portrait, source); // [level - 1][row]
    const runs = levelRuns(portrait); // [level - 1][row] -> [start, length][]

    let w = 0;
    let h = 0;
    let lineH = 6;
    let cellW = 4;
    let dpr = 1;
    let squeeze = 1; // horizontal scale that makes one glyph advance exactly one cell
    let clear: { x: number; y: number; w: number; h: number }[] = [];
    let decodeT = reduce ? 1 : 0;
    let raf = 0;
    let idleId = 0;
    let gradient: CanvasGradient | null = null;

    const setup = () => {
      const rect = root.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      layers[0].font = `10px ${family}`;
      const ratio = layers[0].measureText("M").width / 10 || 0.6;
      lineH = h / portrait.rows;
      cellW = w / portrait.cols;
      const size = lineH; // glyphs as tall as a row...
      squeeze = cellW / (size * ratio); // ...and squeezed to one cell wide
      // Text that overlaps the portrait on mid-size screens keeps its contrast: the
      // portrait is erased behind it.
      clear = Array.from(host.querySelectorAll<HTMLElement>("[data-code-clear]"), (el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - rect.left - CLEAR_PAD, y: r.top - rect.top - CLEAR_PAD, w: r.width + 2 * CLEAR_PAD, h: r.height + 2 * CLEAR_PAD };
      }).filter((r) => r.x < w && r.y < h && r.x + r.w > 0 && r.y + r.h > 0);
      canvases.forEach((c, i) => {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
        const ctx = layers[i];
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.font = `${size}px ${family}`;
        ctx.textBaseline = "top";
      });
      gradient = layers[0].createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, accentA);
      gradient.addColorStop(1, accentB);
    };

    const text = (ctx: CanvasRenderingContext2D, line: string, y: number) => {
      ctx.setTransform(dpr * squeeze, 0, 0, dpr, 0, 0);
      ctx.fillText(line, 0, y);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      layers.forEach((ctx) => ctx.clearRect(0, 0, w, h));
      for (let l = 1; l <= portrait.levels; l++) {
        const ctx = layers[layerOf(l)];
        const lines = byLevel[l - 1];
        const block = l >= BLOCK_FROM;
        for (let r = 0; r < portrait.rows; r++) {
          const line = lines[r];
          if (!line) continue;
          const state = decodeState(r, decodeT, portrait.rows, BAND_ROWS);
          if (state === "hidden") break;
          const y = r * lineH;
          if (state === "scramble") {
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = accentB;
            text(ctx, line.replace(/\S/g, () => scrambleGlyph(Math.random())), y);
            continue;
          }
          ctx.globalAlpha = alphaOf(l);
          ctx.fillStyle = gradient ?? accentA;
          if (!block) {
            text(ctx, line, y);
            continue;
          }
          for (const [c0, len] of runs[l - 1][r]) ctx.fillRect(c0 * cellW, y, len * cellW + 0.4, lineH + 0.4);
          ctx.globalAlpha = 0.5;
          ctx.fillStyle = ground;
          text(ctx, line, y);
        }
      }
      layers.forEach((ctx) => {
        ctx.globalAlpha = 1;
        for (const r of clear) ctx.clearRect(r.x, r.y, r.w, r.h);
      });
    };

    const decode = () => {
      const begin = performance.now();
      const tick = (now: number) => {
        decodeT = Math.min(1, (now - begin) / DECODE_MS);
        draw();
        if (decodeT < 1) raf = requestAnimationFrame(tick);
        else root.dataset.look = "";
      };
      raf = requestAnimationFrame(tick);
    };

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

    const onResize = rafThrottle(() => {
      setup();
      draw();
    });
    const resizer = new ResizeObserver(() => onResize());

    let disposed = false;
    document.fonts
      .load(`10px ${family}`)
      .catch(() => undefined)
      .then(() => {
        if (disposed) return;
        setup();
        draw();
        resizer.observe(root);
        if (reduce) return;
        const go = () => decode();
        idleId = window.requestIdleCallback ? window.requestIdleCallback(go, { timeout: 1200 }) : window.setTimeout(go, 300);
        if (finePointer) {
          host.addEventListener("pointermove", handleMove, { passive: true });
          host.addEventListener("pointerleave", handleLeave);
        }
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      turn.cancel();
      onResize.cancel();
      resizer.disconnect();
      host.removeEventListener("pointermove", handleMove);
      host.removeEventListener("pointerleave", handleLeave);
    };
  }, [source]);

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={label}
      className={`code-portrait relative font-mono ${className}`}
      style={{ aspectRatio: `${portrait.width} / ${portrait.height}` }}
    >
      <div className="code-portrait-stage absolute inset-0">
        {LAYER_DEPTH.map((z, i) => (
          <canvas
            key={z}
            ref={(el) => {
              canvasRefs.current[i] = el;
            }}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            style={{ transform: `translateZ(${z}px)` }}
          />
        ))}
      </div>
    </div>
  );
}
