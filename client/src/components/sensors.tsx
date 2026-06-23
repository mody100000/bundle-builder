import Button from "./common/NextButton";
import { useBuilder } from "../context/BuilderContext";
import { useSensors } from "../hooks/useSensors";
import ProductCard from "./common/ProductCard";
import BuilderLayout from "../layouts/BuilderLayout";

export function Sensors() {
  const { goToNextStep } = useBuilder();
  const { data: sensors, loading, error } = useSensors();

  return (
    <div className="space-y-4">
      {loading && (
        <p className="text-center text-gray-400 py-10 text-sm">
          Loading sensors…
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 py-6 text-sm">
          Error: {error.message}
        </p>
      )}

      {sensors && (
        <BuilderLayout
          items={sensors}
          renderItem={(sensor, layout) => (
            <ProductCard
              key={sensor.id}
              {...sensor}
              layout={layout}
              stepId={3}
            />
          )}
        />
      )}

      <div className="flex justify-center pt-6 pb-3">
        <Button onClick={() => goToNextStep(3)}>
          Next: Choose your protection
        </Button>
      </div>
    </div>
  );
}

export default Sensors;
