import type { ButtonHTMLAttributes, ReactNode } from "react";

interface BrandButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
  download?: boolean;
  external?: boolean;
}

const base =
  "inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium uppercase tracking-widest transition-[opacity,background-color] duration-200 cursor-pointer";

const ghostClass = `${base} border-2 border-brand-text text-brand-text px-6 py-3 sm:px-8 text-xs sm:text-sm hover:bg-white/10`;

// Primary CTA: accent-gradient pill with the prompt's white outline.
export function ContactButton({ children, href, className = "", download, external }: BrandButtonProps) {
  return (
    <a
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} bg-brand-accent text-brand-on-accent px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base outline outline-2 outline-white/90 -outline-offset-[3px] shadow-[0_4px_14px_rgba(96,165,250,0.35)] hover:opacity-90 ${className}`}
    >
      {children}
    </a>
  );
}

// Ghost/outline pill (the prompt's LiveProjectButton).
export function GhostButton({ children, href, className = "", download, external }: BrandButtonProps) {
  return (
    <a
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${ghostClass} ${className}`}
    >
      {children}
    </a>
  );
}

// Same ghost pill as a <button>, for actions that open a dialog instead of navigating.
export function GhostButtonAction({
  children,
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button type="button" className={`${ghostClass} ${className}`} {...rest}>
      {children}
    </button>
  );
}
