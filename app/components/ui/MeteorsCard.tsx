import React from "react";
import { Meteors } from "./Meteors";

export function MeteorsCard({children:children,number:number}:{children:React.ReactNode,number:number}) {
  return (
    <div className="flex justify-center items-center py-10 md:sticky md:top-0 md:h-screen md:py-0">
      <div className=" w-full relative max-w-xs">
        <div aria-hidden="true" className="absolute inset-0 h-full w-full scale-[0.80] rounded-full bg-brand-accent opacity-60 blur-3xl" />
        <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-brand-lg border border-brand-border bg-brand-surface px-4 py-8 shadow-xl">
          <div aria-hidden="true" className="mb-4 flex h-5 w-5 items-center justify-center rounded-full border border-brand-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-brand-muted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>
          {children}
          {/* Meaty part - Meteor effect */}
          <Meteors number={number} />
        </div>
      </div>
    </div>
  );
}
