import Button from "./common/NextButton";
import { useBuilder } from "../context/BuilderContext";
import { usePlans } from "../hooks/usePlans";
import PlanCard from "./common/PlanCard";
import BuilderLayout from "../layouts/BuilderLayout";

export function Plan() {
  const { goToNextStep } = useBuilder();
  const { data: plans, loading, error } = usePlans();

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 leading-relaxed mb-4">
        Select your professional monitoring plan. Unlock cellular backup,
        unlimited cloud recording, and 24/7 law enforcement dispatch.
      </div>

      {loading && (
        <p className="text-center text-gray-400 py-10 text-sm">
          Loading plans…
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 py-6 text-sm">
          Error: {error.message}
        </p>
      )}

      {plans && (
        <BuilderLayout
          items={plans}
          renderItem={(plan, layout) => (
            <PlanCard plan={plan} layout={layout} stepId={2} />
          )}
        />
      )}

      <div className="flex justify-center pt-6 pb-3">
        <Button onClick={() => goToNextStep(2)}>
          Next: Choose your sensors
        </Button>
      </div>
    </div>
  );
}

export default Plan;
