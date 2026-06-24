import React from "react";
import { useBuilder } from "../context/BuilderContext";
import { type StepId } from "../context/constants";

export interface AccordionStepProps {
  id: StepId;
  title: string;
  children: React.ReactNode;
}

import { StepIcon } from "./stepIcons";

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="10"
    height="7"
    viewBox="0 0 10 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
  >
    <path
      d="M4.93612 6.43039C4.73671 6.70956 4.32179 6.70956 4.12238 6.43038L0.094018 0.790617C-0.142362 0.459682 0.0942011 0 0.500886 0L8.5577 0C8.96438 0 9.20095 0.459687 8.96456 0.790621L4.93612 6.43039Z"
      fill="#4E2FD2"
    />
  </svg>
);

export function AccordionStep({ id, title, children }: AccordionStepProps) {
  const { openSteps, toggleStep, selections } = useBuilder();
  const isOpen = !!openSteps[id];
  const selectionCount = selections[id] || 0;

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-blue-200 rounded-2xl bg-(--bg-primary) shadow-md shadow-blue-50/50"
          : ""
      }`}
    >
      {isOpen ? (
        /* Open State Header */
        <div className="pt-5">
          <div className="text-xs text-[#484848] leading-[100%] tracking-[1.6px] uppercase border-b border-current pb-1 w-full">
            <span className="p-4">Step {id} of 4</span>
          </div>
          <div className="flex items-center justify-between p-5 pb-3">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-xl leading-[100%] tracking-normal flex items-center gap-2 mt-1">
                {StepIcon({ id, className: "w-8 h-8" })} {title}
              </h2>
            </div>

            <button
              onClick={() => toggleStep(id)}
              className=" cursor-pointer focus:outline-none hover:scale-105 p-1"
            >
              <div className="flex items-center gap-2">
                {selectionCount > 0 && (
                  <span className="text-sm text-[#4E2FD2] leading-4 tracking-normal font-normal">
                    {selectionCount} selected
                  </span>
                )}
                <ChevronIcon isOpen={isOpen} />
              </div>
            </button>
          </div>
        </div>
      ) : (
        /* Closed State Header */
        <>
          <span className="font-normal text-[10px] leading-[100%] tracking-[1.6px] uppercase align-middle px-3 text-[#484848] whitespace-nowrap">
            Step {id} of 4
          </span>
          <div className="relative">
            <button
              onClick={() => toggleStep(id)}
              className="w-full border-y-[0.5px] border-[#1F1F1F] flex items-center justify-between py-4 px-4 text-left font-semibold transition-colors focus:outline-none cursor-pointer"
            >
              {/* Step info */}
              <h1 className="text-[22px] font-bold tracking-tight flex items-center gap-2">
                {StepIcon({ id })} {title}
              </h1>

              {/* Selections info and Chevron */}
              <div className="flex items-center gap-2">
                {selectionCount > 0 && (
                  <span className="text-sm text-[#4E2FD2] leading-4 tracking-normal font-normal">
                    {selectionCount} selected
                  </span>
                )}
                <ChevronIcon isOpen={isOpen} />
              </div>
            </button>
          </div>
        </>
      )}

      {/* Body container with smooth transitions */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-3 pt-2">{children}</div>
      </div>
    </div>
  );
}

export default AccordionStep;
