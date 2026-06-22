import Button from "./common/NextButton";
import { useBuilder } from "../context/BuilderContext";

import { useCameras } from "../hooks/useCameras";
import ProductCard from "./common/ProductCard";

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
        <>
          {/* ── Small screens: single column, horizontal card layout ── */}
          <div className="flex flex-col gap-4 md:hidden">
            {cameras.map((camera) => (
              <ProductCard key={camera.id} {...camera} layout="horizontal" />
            ))}
          </div>
          {/* ── Medium / tablet screens: vertical cards, responsive columns ── */}
          <div className="hidden md:grid 2xl:hidden grid-cols-2 lg:grid-cols-3 gap-4 pb-2">
            {cameras.map((camera) => (
              <div key={camera.id} className="w-full">
                <ProductCard {...camera} layout="vertical" />
              </div>
            ))}
          </div>
          {/* ── Large screens: 2-column grid, last odd item centered ── */}
          <div className="hidden 2xl:grid 2xl:grid-cols-2 gap-6">
            {cameras.map((camera, idx) => (
              <div
                key={camera.id}
                className={
                  cameras.length % 2 !== 0 && idx === cameras.length - 1
                    ? "2xl:col-span-2 2xl:w-1/2 2xl:mx-auto"
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
