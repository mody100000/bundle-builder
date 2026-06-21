import Button from "./common/NextButton";
import { useBuilder } from "../context/BuilderContext";

export function Cameras() {
  const { goToNextStep } = useBuilder();

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 leading-relaxed">
        Configure your security camera layout. Choose from different mounts,
        angles, and color finishes to cover your primary access points.
      </div>
      <div className="p-12 bg-slate-50 border border-slate-100 rounded-2xl text-center text-xs text-gray-400 font-medium select-none">
        Camera Configuration Area (Step 1 Placeholder)
      </div>
      <div className="flex justify-end pt-2">
        <Button onClick={() => goToNextStep(1)}>Next Step</Button>
      </div>
    </div>
  );
}

export default Cameras;
