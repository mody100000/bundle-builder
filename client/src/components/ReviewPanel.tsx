import { useBuilder } from "../context/BuilderContext";
import { formatPrice, calculateBundleTotals } from "../utils/price";

export function ReviewPanel() {
  const { selectedVariants } = useBuilder();

  const selectedList = Object.values(selectedVariants).filter(
    (item) => item.quantity > 0,
  );

  const { subtotal, totalSavings } = calculateBundleTotals(selectedList);

  return (
    <div className="bg-white border border-gray-150 rounded-2xl shadow-sm p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Review Panel</h2>
        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
          Summary
        </span>
      </div>

      {selectedList.length === 0 ? (
        <div className="text-center py-16 text-gray-400 border border-dashed border-gray-200 rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 mx-auto mb-3 text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <p className="text-xs font-medium max-w-40 mx-auto leading-relaxed">
            Your customized hardware and monitoring plans will summarize here as
            you build.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Selected Variants List */}
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {selectedList.map((item) => (
              <div
                key={item.variantId}
                className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center p-1 shrink-0">
                  <img
                    src={item.image}
                    alt={`${item.name} - ${item.colorName}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-semibold text-gray-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-medium">
                    {item.colorName}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-gray-400 font-bold block">
                    &times;{item.quantity}
                  </span>
                  <span className="text-xs font-bold text-gray-800">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Totals */}
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-700">
                {formatPrice(subtotal + totalSavings)}
              </span>
            </div>

            {totalSavings > 0 && (
              <div className="flex justify-between text-xs text-emerald-600 font-medium">
                <span>Discount Savings</span>
                <span>-{formatPrice(totalSavings)}</span>
              </div>
            )}

            <div className="flex justify-between border-t border-gray-100 pt-3 text-sm font-bold text-gray-900">
              <span>Total Bundle</span>
              <span className="text-base text-blue-600">
                {formatPrice(subtotal)}
              </span>
            </div>
          </div>

          {/* Call to action */}
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewPanel;
