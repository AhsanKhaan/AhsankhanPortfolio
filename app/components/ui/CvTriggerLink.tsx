"use client";

// Self-contained "Get my CV by email" trigger + its modal, all within one client
// component. Needed because the trigger is a function prop, and Server Components
// (e.g. Hero.tsx) can't pass functions across the boundary to a Client Component.
import CvRequestModal from "./CvRequestModal";

export default function CvTriggerLink({ className }: { className?: string }) {
  return (
    <CvRequestModal
      trigger={(open) => (
        <button type="button" onClick={open} className={className}>
          Get my CV by email
        </button>
      )}
    />
  );
}
