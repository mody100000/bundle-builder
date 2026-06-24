import { useProtection } from "../hooks/useProtection";
import ProductCard from "./common/ProductCard";
import BuilderLayout from "../layouts/BuilderLayout";

export function Protection() {
  const { data: protection, loading, error } = useProtection();

  return (
    <div className="space-y-4">
      {loading && (
        <p className="text-center text-gray-400 py-10 text-sm">
          Loading protection accessories…
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 py-6 text-sm">
          Error: {error.message}
        </p>
      )}

      {protection && (
        <BuilderLayout
          items={protection}
          renderItem={(item, layout) => (
            <ProductCard key={item.id} {...item} layout={layout} stepId={4} />
          )}
        />
      )}

      <div className="p-3 text-center w-fit mx-auto mt-6 bg-white border border-[#4E2FD2] rounded text-[#4E2FD2] text-xs font-medium">
        Review your configurations on the Review Panel for checkout.
      </div>
    </div>
  );
}

export default Protection;
