import React from "react";
import { useBuilder } from "../context/BuilderContext";
import { type StepId } from "../context/constants";

export interface AccordionStepProps {
  id: StepId;
  title: string;
  children: React.ReactNode;
}

export function AccordionStep({ id, title, children }: AccordionStepProps) {
  const { activeStep, toggleStep } = useBuilder();
  const isOpen = activeStep === id;

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-blue-200 bg-white shadow-md shadow-blue-50/50"
          : "border-gray-200 bg-gray-50/30 hover:bg-gray-50/60"
      }`}
    >
      {/* Header */}
      <button
        onClick={() => toggleStep(id)}
        className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-800 transition-colors focus:outline-none cursor-pointer"
      >
        <span className="flex items-center gap-3.5">
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              isOpen ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
            }`}
          >
            {id}
          </span>
          <span
            className={`text-sm font-bold tracking-tight ${isOpen ? "text-gray-900" : "text-gray-600"}`}
          >
            {title}
          </span>
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Body container with smooth transitions */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? "max-h-200 opacity-100 border-t border-gray-150"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default AccordionStep;
