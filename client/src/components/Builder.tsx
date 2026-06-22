import React from "react";
import { STEPS_METADATA, type StepId } from "../context/constants";
import AccordionStep from "./AccordionStep";
import Cameras from "./cameras";
import Sensors from "./sensors";
import Protection from "./protection";
import Plan from "./plan";

const STEP_COMPONENTS: Record<StepId, React.ComponentType> = {
  1: Cameras,
  2: Plan,
  3: Sensors,
  4: Protection,
};

export function Builder() {
  return (
    <>
      {STEPS_METADATA.map(({ id, title }) => {
        const Component = STEP_COMPONENTS[id];
        return (
          <AccordionStep key={id} id={id} title={title}>
            <Component />
          </AccordionStep>
        );
      })}
    </>
  );
}

export default Builder;
