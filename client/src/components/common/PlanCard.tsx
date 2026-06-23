import React from "react";
import type { Plan } from "../../api/plans";
import { formatPrice } from "../../utils/price";
import { useBuilder } from "../../context/BuilderContext";
import type { StepId } from "../../context/constants";

export interface PlanCardProps {
  plan: Plan;
  layout?: "horizontal" | "vertical";
  stepId?: StepId;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, stepId = 2 }) => {
  const {
    id,
    title,
    description,
    price,
    originalPrice,
    discountBadge,
    interval,
    features,
    image,
  } = plan;
  const { selectedVariants, updateVariantQuantity } = useBuilder();

  // A plan is selected if it's in the selectedVariants list
  const isSelected = !!selectedVariants[id];

  const handleToggleSubscribe = () => {
    if (isSelected) {
      // Unsubscribe (set quantity to 0)
      updateVariantQuantity(
        stepId,
        id, // productId
        id, // variantId
        0,
        price,
        originalPrice,
        title,
        `Monthly Subscription`,
        image,
      );
    } else {
      // Subscribe (set quantity to 1)
      updateVariantQuantity(
        stepId,
        id,
        id,
        1,
        price,
        originalPrice,
        title,
        `Monthly Subscription`,
        image,
      );
    }
  };

  return (
    <div
      className={`flex gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-full h-full group flex-col border-2 ${
        isSelected ? "border-[#4E2FD2B2]" : "border-transparent"
      }`}
    >
      {/* Image and Badge */}
      <div className="relative shrink-0 rounded-xl overflow-hidden flex items-center justify-center h- mx-auto mt-2">
        {discountBadge && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-[#4E2FD2] text-white text-[12px] leading-none tracking-normal px-2 py-1 rounded-xl shadow-sm animate-pulse">
            {discountBadge}
          </div>
        )}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-between grow px-2">
        <div className="mb-4">
          {/* Title */}
          <h3 className="text-xl text-center font-bold text-gray-900 leading-none tracking-[0.6px] mb-2 group-hover:text-[#4E2FD2] transition-colors">
            {title}
          </h3>

          {/* Description */}
          <div className="">
            <p className="text-sm bg-[#edf4ff] w-fit p-1.5 m-auto rounded-md leading-[1.3] tracking-[0.6px] mb-3">
              {description}
            </p>
          </div>

          {/* Feature List */}
          <ul className="text-[11px] leading-[1.4] text-gray-600 space-y-1.5 my-4">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscription Control & Price Row */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
          {/* Subscribe Button */}
          <button
            onClick={handleToggleSubscribe}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 select-none ${
              isSelected
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                : "bg-[#4E2FD2] hover:bg-[#3a20a0] text-white shadow-sm"
            }`}
          >
            {isSelected ? (
              <>
                <svg
                  className="w-3.5 h-3.5 stroke-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Selected
              </>
            ) : (
              "Subscribe"
            )}
          </button>

          {/* Price (Right) */}
          <div className="text-right flex flex-col justify-center min-h-9.5">
            {originalPrice ? (
              <>
                <span className="text-base font-normal leading-none tracking-[0.6px] text-[#D8392B] line-through block mb-0.5">
                  {formatPrice(originalPrice)}/{interval}
                </span>
                <span className="text-base font-normal tracking-[0.6px] text-[#575757] leading-none">
                  {formatPrice(price)}/{interval}
                </span>
              </>
            ) : (
              <span className="text-base font-normal tracking-[0.6px] text-[#575757] leading-none">
                {formatPrice(price)}/{interval}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
