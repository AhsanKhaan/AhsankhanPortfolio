"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { IconX } from "@tabler/icons-react";
import CvRequestForm from "./CvRequestForm";

interface CvRequestModalProps {
  // Uncontrolled: renders its own trigger and manages open state (e.g. Hero).
  trigger?: (open: () => void) => ReactNode;
  // Controlled: caller owns the open state (e.g. Navbar, where the trigger button
  // lives inside a closing AnimatePresence overlay and must not unmount the dialog
  // along with it).
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function CvRequestModal({ trigger, open: openProp, onOpenChange }: CvRequestModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : internalOpen;
  const close = () => (controlled ? onOpenChange?.(false) : setInternalOpen(false));

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const dialog = open && (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
        className="w-full max-w-md rounded-brand-xl border border-brand-border bg-brand-surface p-6 shadow-2xl md:p-8"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="cv-modal-title" className="font-display text-2xl text-brand-text">
            Get my CV
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-brand-muted hover:bg-white/10 hover:text-brand-text"
          >
            <IconX size={20} aria-hidden="true" />
          </button>
        </div>
        <CvRequestForm />
      </div>
    </div>
  );

  return (
    <>
      {trigger?.(() => setInternalOpen(true))}
      {/* Portal straight to <body>: any trigger site (Hero, Navbar, …) can sit inside a
          Framer Motion `motion.div`, which sets an inline `transform` even at rest —
          that silently turns it into the containing block for `position: fixed`
          descendants, so a plain nested dialog would render clipped to/behind that
          ancestor's own stacking context instead of covering the real viewport. */}
      {typeof document !== "undefined" && dialog ? createPortal(dialog, document.body) : null}
    </>
  );
}
