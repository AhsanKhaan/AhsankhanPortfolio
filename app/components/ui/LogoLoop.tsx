import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoItem {
  node?: ReactNode;
  src?: string;
  alt?: string;
  title?: string;
  href?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
  className?: string;
}

// Infinite CSS marquee. The list is rendered twice so translating by half its width loops
// seamlessly; the second copy is purely visual (aria-hidden, links out of the tab order).
export const LogoLoop = ({
  logos,
  speed = 100,
  direction = "left",
  logoHeight = 48,
  gap = 32,
  pauseOnHover = true,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = "#ffffff",
  ariaLabel = "Logo carousel",
  className,
}: LogoLoopProps) => {
  const maskImage = fadeOut
    ? `linear-gradient(to right, transparent, ${fadeOutColor} 10%, ${fadeOutColor} 90%, transparent)`
    : "none";

  const renderLogo = (logo: LogoItem, idx: number, duplicate: boolean) => {
    const content = logo.node ? (
      <span className="flex h-full w-full items-center justify-center text-white">{logo.node}</span>
    ) : logo.src ? (
      <Image src={logo.src} alt={duplicate ? "" : logo.alt || logo.title || ""} className="h-full w-full object-contain" />
    ) : null;

    return (
      <li
        key={`${duplicate ? "copy" : "logo"}-${idx}`}
        aria-hidden={duplicate || undefined}
        className="logo-item flex shrink-0 items-center justify-center"
        style={{ height: logoHeight, width: logoHeight }}
      >
        {logo.href ? (
          <a
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={logo.title || logo.alt}
            tabIndex={duplicate ? -1 : undefined}
            className="flex h-full w-full items-center justify-center transition-opacity hover:opacity-80"
          >
            {content}
          </a>
        ) : (
          <span className="flex h-full w-full items-center justify-center" role={logo.title ? "img" : undefined} aria-label={logo.title}>
            {content}
          </span>
        )}
      </li>
    );
  };

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ maskImage, WebkitMaskImage: maskImage } as CSSProperties}
    >
      <style>{`
        @keyframes logo-loop {
          to { transform: translateX(calc(-50% - ${gap / 2}px)); }
        }
        .logo-scroller {
          animation: logo-loop ${(500 / speed) * 10}s linear infinite ${direction === "left" ? "normal" : "reverse"};
        }
        ${pauseOnHover ? ".logo-scroller:hover { animation-play-state: paused; }" : ""}
        ${scaleOnHover ? ".logo-item { transition: transform 0.3s ease; } .logo-scroller:hover .logo-item { transform: scale(1.1); }" : ""}
      `}</style>

      <ul aria-label={ariaLabel} className="logo-scroller flex w-max" style={{ gap }}>
        {logos.map((logo, idx) => renderLogo(logo, idx, false))}
        {logos.map((logo, idx) => renderLogo(logo, idx, true))}
      </ul>
    </div>
  );
};
