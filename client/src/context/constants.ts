export type StepId = 1 | 2 | 3 | 4;

export const INITIAL_STEP: StepId = 1;
export const LAST_STEP: StepId = 4;

export interface StepMetadata {
  id: StepId;
  title: string;
}

export const STEPS_METADATA: StepMetadata[] = [
  { id: 1, title: "Cameras" },
  { id: 2, title: "Sensors" },
  { id: 3, title: "Protection" },
  { id: 4, title: "Plan" },
];
