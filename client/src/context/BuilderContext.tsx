/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import { INITIAL_STEP, LAST_STEP, type StepId } from "./constants";

export interface BuilderContextType {
  activeStep: StepId | null;
  toggleStep: (step: StepId) => void;
  goToNextStep: (currentStep: StepId) => void;
  selections: Record<StepId, number>;
  setSelectionCount: (stepId: StepId, count: number) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

interface BuilderProviderProps {
  children: React.ReactNode;
}

export function BuilderProvider({ children }: BuilderProviderProps) {
  const [activeStep, setActiveStep] = useState<StepId | null>(INITIAL_STEP);
  const [selections, setSelections] = useState<Record<StepId, number>>({
    1: 2, // Step 1: 2 selected (Choose your cameras)
    2: 1, // Step 2: 1 selected (Choose your plan)
    3: 0, // Step 3: 2 selected (Choose your sensors)
    4: 1, // Step 4: 1 selected (Add extra protection)
  });

  const toggleStep = (id: StepId) => {
    setActiveStep((prev) => (prev === id ? null : id));
  };

  const goToNextStep = (currentStep: StepId) => {
    if (currentStep < LAST_STEP) {
      setActiveStep((currentStep + 1) as StepId);
    }
  };

  const setSelectionCount = (stepId: StepId, count: number) => {
    setSelections((prev) => ({
      ...prev,
      [stepId]: count,
    }));
  };

  return (
    <BuilderContext.Provider
      value={{
        activeStep,
        toggleStep,
        goToNextStep,
        selections,
        setSelectionCount,
      }}
    >
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
