export type StepId = 1 | 2 | 3 | 4;

export const INITIAL_STEP: StepId = 1;
export const LAST_STEP: StepId = 4;

export interface StepMetadata {
  id: StepId;
  title: string;
}

export const STEPS_METADATA: StepMetadata[] = [
  { id: 1, title: "Choose your cameras" },
  { id: 2, title: "Choose your plan" },
  { id: 3, title: "Choose your sensors" },
  { id: 4, title: "Choose your protection" },
];
