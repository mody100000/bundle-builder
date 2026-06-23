import Button from "./common/NextButton";
import { useBuilder } from "../context/BuilderContext";

export function Sensors() {
  const { goToNextStep } = useBuilder();

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 leading-relaxed">
        Secure entryways and rooms with smart motion detectors and door/window
        opening sensors.
      </div>
      <div className="p-12 bg-slate-50 border border-slate-100 rounded-2xl text-center text-xs text-gray-400 font-medium select-none">
        Sensors Configuration Area (Step 3 Placeholder)
      </div>
      <div className="flex justify-center pt-6 pb-3">
        <Button onClick={() => goToNextStep(3)}>
          Next: Choose your protection
        </Button>
      </div>
    </div>
  );
}

export default Sensors;
