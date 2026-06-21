import Button from "./common/NextButton";
import { useBuilder } from "../context/BuilderContext";

export function Protection() {
  const { goToNextStep } = useBuilder();

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 leading-relaxed">
        Add proactive flood detection, smoke monitoring, sirens, and external
        hardware safety locks.
      </div>
      <div className="p-12 bg-slate-50 border border-slate-100 rounded-2xl text-center text-xs text-gray-400 font-medium select-none">
        Protection Configuration Area (Step 3 Placeholder)
      </div>
      <div className="flex justify-end pt-2">
        <Button onClick={() => goToNextStep(3)}>Next Step</Button>
      </div>
    </div>
  );
}

export default Protection;
