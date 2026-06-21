import React from "react";
import { BuilderProvider } from "../context/BuilderContext";
import { STEPS_METADATA, type StepId } from "../context/constants";
import AccordionStep from "./AccordionStep";
import Cameras from "./cameras";
import Sensors from "./sensors";
import Protection from "./protection";
import Plan from "./plan";

const STEP_COMPONENTS: Record<StepId, React.ComponentType> = {
  1: Cameras,
  2: Sensors,
  3: Protection,
  4: Plan,
};

export function Builder() {
  return (
    <BuilderProvider>
      <div className="space-y-4">
        {STEPS_METADATA.map(({ id, title }) => {
          const Component = STEP_COMPONENTS[id];
          return (
            <AccordionStep key={id} id={id} title={title}>
              <Component />
            </AccordionStep>
          );
        })}
      </div>
    </BuilderProvider>
  );
}

export default Builder;
