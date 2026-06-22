import Button from "./common/NextButton";
import { useBuilder } from "../context/BuilderContext";

export function Plan() {
  const { goToNextStep } = useBuilder();

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 leading-relaxed">
        Select your professional monitoring plan. Unlock cellular backup, unlimited cloud recording, and 24/7 law enforcement dispatch.
      </div>
      <div className="p-12 bg-slate-50 border border-slate-100 rounded-2xl text-center text-xs text-gray-400 font-medium select-none">
        Monitoring Plans Area (Step 2 Placeholder)
      </div>
      <div className="flex justify-end pt-2">
        <Button onClick={() => goToNextStep(2)}>Next Step</Button>
      </div>
    </div>
  );
}

export default Plan;
