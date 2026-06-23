/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import { INITIAL_STEP, LAST_STEP, type StepId } from "./constants";
import { type Selection } from "../types/product";

export interface BuilderContextType {
  activeStep: StepId | null;
  toggleStep: (step: StepId) => void;
  goToNextStep: (currentStep: StepId) => void;
  selections: Record<StepId, number>;
  selectedVariants: Record<string, Selection>;
  updateVariantQuantity: (
    stepId: StepId,
    productId: string,
    variantId: string,
    quantity: number,
    price: number,
    originalPrice: number | undefined,
    name: string,
    colorName: string,
    image: string
  ) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

interface BuilderProviderProps {
  children: React.ReactNode;
}

export function BuilderProvider({ children }: BuilderProviderProps) {
  const [activeStep, setActiveStep] = useState<StepId | null>(INITIAL_STEP);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, Selection>>({});

  const toggleStep = (id: StepId) => {
    setActiveStep((prev) => (prev === id ? null : id));
  };

  const goToNextStep = (currentStep: StepId) => {
    if (currentStep < LAST_STEP) {
      setActiveStep((currentStep + 1) as StepId);
    }
  };

  const updateVariantQuantity = (
    stepId: StepId,
    productId: string,
    variantId: string,
    quantity: number,
    price: number,
    originalPrice: number | undefined,
    name: string,
    colorName: string,
    image: string
  ) => {
    setSelectedVariants((prev) => {
      const next = { ...prev };
      
      // For Step 2 (Plans), enforce subscribing to only one plan at a time
      if (stepId === 2 && quantity > 0) {
        Object.keys(next).forEach((key) => {
          if (next[key].stepId === 2) {
            delete next[key];
          }
        });
      }

      if (quantity <= 0) {
        delete next[variantId];
      } else {
        next[variantId] = {
          stepId,
          productId,
          variantId,
          quantity,
          price,
          originalPrice,
          name,
          colorName,
          image,
        };
      }
      return next;
    });
  };

  // Derive selection count per step from selectedVariants quantities
  const selections = {
    1: Object.values(selectedVariants)
      .filter((v) => v.stepId === 1)
      .reduce((sum, v) => sum + v.quantity, 0),
    2: Object.values(selectedVariants)
      .filter((v) => v.stepId === 2)
      .reduce((sum, v) => sum + v.quantity, 0),
    3: Object.values(selectedVariants)
      .filter((v) => v.stepId === 3)
      .reduce((sum, v) => sum + v.quantity, 0),
    4: Object.values(selectedVariants)
      .filter((v) => v.stepId === 4)
      .reduce((sum, v) => sum + v.quantity, 0),
  };

  return (
    <BuilderContext.Provider
      value={{
        activeStep,
        toggleStep,
        goToNextStep,
        selections,
        selectedVariants,
        updateVariantQuantity,
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
