import Button from "./common/NextButton";
import { useBuilder } from "../context/BuilderContext";

import { useCameras } from "../hooks/useCameras";
import ProductCard from "./common/ProductCard";
import BuilderLayout from "../layouts/BuilderLayout";

export function Cameras() {
  const { goToNextStep } = useBuilder();
  const { data: cameras, loading, error } = useCameras();

  return (
    <div>
      {loading && (
        <p className="text-center text-gray-400 py-10 text-sm">
          Loading cameras…
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 py-6 text-sm">
          Error: {error.message}
        </p>
      )}

      {cameras && (
        <BuilderLayout
          items={cameras}
          renderItem={(camera, layout) => (
            <ProductCard {...camera} layout={layout} stepId={1} />
          )}
        />
      )}

      <div className="flex justify-end pt-2">
        <Button onClick={() => goToNextStep(1)}>Next Step</Button>
      </div>
    </div>
  );
}

export default Cameras;
