/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_STEP, LAST_STEP, type StepId } from "./constants";
import { type Selection } from "../types/product";
import { fetchConfig, saveConfig as apiSaveConfig } from "../api/config";
import { toast } from "react-toastify";

export interface BuilderContextType {
  openSteps: Record<StepId, boolean>;
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
    image: string,
    required?: boolean,
    maxQuantity?: number
  ) => void;
  saveSystemForLater: () => Promise<void>;
  checkout: () => Promise<void>;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

interface BuilderProviderProps {
  children: React.ReactNode;
}

export function BuilderProvider({ children }: BuilderProviderProps) {
  const [openSteps, setOpenSteps] = useState<Record<StepId, boolean>>(() => {
    const initial: Record<StepId, boolean> = { 1: false, 2: false, 3: false, 4: false };
    initial[INITIAL_STEP] = true;
    return initial;
  });
  const [systemId] = useState<string>(() => {
    let id = localStorage.getItem("systemId");
    if (!id) {
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        id = crypto.randomUUID();
      } else {
        id = "usr_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      }
      localStorage.setItem("systemId", id);
    }
    return id;
  });

  const [selectedVariants, setSelectedVariants] = useState<Record<string, Selection>>(() => {
    const id = localStorage.getItem("systemId");
    if (id) {
      const savedLocal = localStorage.getItem(`security_system_config_${id}`);
      if (savedLocal) {
        try {
          const parsed = JSON.parse(savedLocal);
          if (parsed && typeof parsed === "object" && Object.keys(parsed).length > 0) {
            return parsed as Record<string, Selection>;
          }
        } catch (e) {
          console.error("Failed to parse local config:", e);
        }
      }
    }
    return {};
  });

  useEffect(() => {
    if (!systemId) return;
    const savedLocal = localStorage.getItem(`security_system_config_${systemId}`);
    if (!savedLocal) {
      // Fallback/Initial load from backend
      fetchConfig(systemId)
        .then((data) => {
          if (data && typeof data === "object" && Object.keys(data).length > 0) {
            setSelectedVariants(data);
          }
        })
        .catch((err) => {
          console.error("Failed to load config on mount:", err);
        });
    }
  }, [systemId]);

  const saveSystemForLater = async () => {
    if (!systemId) return;
    try {
      // Save to client-side localStorage
      localStorage.setItem(`security_system_config_${systemId}`, JSON.stringify(selectedVariants));
      // Save to backend API
      await apiSaveConfig(systemId, selectedVariants);
      toast.success("Your security system configuration has been saved successfully!");
    } catch (error) {
      console.error("Failed to save config:", error);
      toast.error("Failed to save your security system configuration. Please try again.");
    }
  };

  const checkout = async () => {
    if (!systemId) return;
    try {
      // Clear localStorage
      localStorage.removeItem(`security_system_config_${systemId}`);
      // Clear saved data on the backend
      await apiSaveConfig(systemId, {});
      // Clear local state
      setSelectedVariants({});
      toast.success("Checkout completed! Your system configuration has been placed and cleared.");
    } catch (error) {
      console.error("Failed to complete checkout:", error);
      toast.error("Failed to complete checkout. Please try again.");
    }
  };

  const toggleStep = (id: StepId) => {
    setOpenSteps((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const goToNextStep = (currentStep: StepId) => {
    if (currentStep < LAST_STEP) {
      setOpenSteps((prev) => ({
        ...prev,
        [currentStep]: false,
        [currentStep + 1]: true,
      }));
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
    image: string,
    required?: boolean,
    maxQuantity?: number
  ) => {
    setSelectedVariants((prev) => {
      const next = { ...prev };

      // Required items are locked to quantity 1
      if (required) {
        next[variantId] = {
          stepId,
          productId,
          variantId,
          quantity: 1,
          price,
          originalPrice,
          name,
          colorName,
          image,
          required: true,
          maxQuantity: 1
        };
        return next;
      }
      
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
          maxQuantity
        };
      }
      return next;
    });
  };

  // Derive selection count per step from distinct products with quantity > 0
  const selections = {
    1: new Set(
      Object.values(selectedVariants)
        .filter((v) => v.stepId === 1 && v.quantity > 0)
        .map((v) => v.productId)
    ).size,
    2: new Set(
      Object.values(selectedVariants)
        .filter((v) => v.stepId === 2 && v.quantity > 0)
        .map((v) => v.productId)
    ).size,
    3: new Set(
      Object.values(selectedVariants)
        .filter((v) => v.stepId === 3 && v.quantity > 0)
        .map((v) => v.productId)
    ).size,
    4: new Set(
      Object.values(selectedVariants)
        .filter((v) => v.stepId === 4 && v.quantity > 0)
        .map((v) => v.productId)
    ).size,
  };

  return (
    <BuilderContext.Provider
      value={{
        openSteps,
        toggleStep,
        goToNextStep,
        selections,
        selectedVariants,
        updateVariantQuantity,
        saveSystemForLater,
        checkout,
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
