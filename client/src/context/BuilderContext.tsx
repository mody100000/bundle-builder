/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import { INITIAL_STEP, LAST_STEP, type StepId } from "./constants";

export interface BuilderContextType {
  activeStep: StepId | null;
  toggleStep: (step: StepId) => void;
  goToNextStep: (currentStep: StepId) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

interface BuilderProviderProps {
  children: React.ReactNode;
}

export function BuilderProvider({ children }: BuilderProviderProps) {
  const [activeStep, setActiveStep] = useState<StepId | null>(INITIAL_STEP);

  const toggleStep = (id: StepId) => {
    setActiveStep((prev) => (prev === id ? null : id));
  };

  const goToNextStep = (currentStep: StepId) => {
    if (currentStep < LAST_STEP) {
      setActiveStep((currentStep + 1) as StepId);
    }
  };

  return (
    <BuilderContext.Provider value={{ activeStep, toggleStep, goToNextStep }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
}
