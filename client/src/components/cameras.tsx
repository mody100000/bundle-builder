import Button from "./common/NextButton";
import { useBuilder } from "../context/BuilderContext";

import { useCameras } from "../hooks/useCameras";
import ProductCard from "./common/ProductCard";

export function Cameras() {
  const { goToNextStep } = useBuilder();
  const { data: cameras, loading, error } = useCameras();

  return (
    <div className="space-y-6">
      <div className="text-xs text-gray-500 leading-relaxed">
        Configure your security camera layout. Choose from different mounts,
        angles, and color finishes to cover your primary access points.
      </div>

      {loading && (
        <p className="text-center text-gray-400 py-10 text-sm">Loading cameras…</p>
      )}
      {error && (
        <p className="text-center text-red-500 py-6 text-sm">Error: {error.message}</p>
      )}

      {cameras && (
        <>
          {/* ── Small screens: single column, horizontal card layout ── */}
          <div className="flex flex-col gap-4 sm:hidden">
            {cameras.map((camera) => (
              <ProductCard key={camera.id} {...camera} layout="horizontal" />
            ))}
          </div>

          {/* ── Medium screens: horizontal scrollable row, vertical cards ── */}
          <div className="hidden sm:flex lg:hidden flex-row gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
            {cameras.map((camera) => (
              <div key={camera.id} className="snap-start shrink-0 w-56">
                <ProductCard {...camera} layout="vertical" />
              </div>
            ))}
          </div>

          {/* ── Large screens: 2-column grid, last odd item centered ── */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6">
            {cameras.map((camera, idx) => (
              <div
                key={camera.id}
                className={
                  cameras.length % 2 !== 0 && idx === cameras.length - 1
                    ? "lg:col-span-2 lg:w-1/2 lg:mx-auto"
                    : ""
                }
              >
                <ProductCard {...camera} layout="horizontal" />
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex justify-end pt-2">
        <Button onClick={() => goToNextStep(1)}>Next Step</Button>
      </div>
    </div>
  );
}

export default Cameras;
