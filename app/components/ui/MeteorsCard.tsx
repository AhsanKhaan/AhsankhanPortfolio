import React from "react";
import { Meteors } from "./Meteors";

export function MeteorsCard({children:children,number:number}:{children:React.ReactNode,number:number}) {
  return (
    <div className="sticky top-0 flex justify-center items-center  height-60-small h-screen ">
      <div className=" w-full relative max-w-xs">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div  className="relative z-100 bg-darkBlue shadow-xl dark:bg-dark-blue border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
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
