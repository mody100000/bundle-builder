import React from "react";
import { useBuilder } from "../context/BuilderContext";
import { type Selection } from "../types/product";
import { formatPrice } from "../utils/price";

interface ReviewItemProps {
  item: Selection;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({ item }) => {
  const { updateVariantQuantity } = useBuilder();

  const handleDecrement = () => {
    const minQty = item.required ? 1 : 0;
    if (item.quantity > minQty) {
      updateVariantQuantity(
        item.stepId,
        item.productId,
        item.variantId,
        item.quantity - 1,
        item.price,
        item.originalPrice,
        item.name,
        item.colorName,
        item.image,
        item.required,
        item.maxQuantity,
      );
    }
  };

  const handleIncrement = () => {
    const maxQty = item.required ? 1 : (item.maxQuantity ?? Infinity);
    if (item.quantity < maxQty) {
      updateVariantQuantity(
        item.stepId,
        item.productId,
        item.variantId,
        item.quantity + 1,
        item.price,
        item.originalPrice,
        item.name,
        item.colorName,
        item.image,
        item.required,
        item.maxQuantity,
      );
    }
  };

  // Custom name formatting for required items and size variants
  let displayName = item.name;
  if (
    item.colorName &&
    item.colorName !== "Standard" &&
    item.colorName !== "White"
  ) {
    displayName = `${item.name} (${item.colorName})`;
  }
  if (item.required) {
    displayName = `${displayName} (Required)`;
  }

  return (
    <div className="flex items-center justify-between gap-3 text-xs">
      {/* Left: Thumbnail & Title */}
      <div className="flex items-center min-w-0 grow">
        <div className="w-12 h-12 rounded-[5px] bg-white border border-gray-100/50 flex items-center justify-center p-1 shrink-0 shadow-xs">
          <img
            src={item.image}
            alt={displayName}
            className="w-full h-full object-contain"
          />
        </div>

        <h4 className="text-sm text-[#0B0D10] ml-3 truncate leading-4 tracking-[0.005em]">
          {item.stepId === 2
            ? // Beautiful splitting styling for plan names
              (() => {
                const parts = displayName.split(" ");
                const first = parts[0];
                const rest = parts.slice(1).join(" ");
                return first === "Cam" ? (
                  <>
                    <span className="font-extrabold text-gray-900">Cam</span>{" "}
                    <span className="text-[#4E2FD2] font-black">{rest}</span>
                  </>
                ) : (
                  displayName
                );
              })()
            : displayName}
        </h4>
      </div>

      {/* Right: Quantity Selector & Pricing */}
      <div className="flex items-center shrink-0 gap-3 md:gap-4 xl:gap-3">
        {/* Quantity buttons */}
        {item.stepId !== 2 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              disabled={item.required ? item.quantity <= 1 : item.quantity <= 0}
              className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-500 hover:text-gray-700 disabled:bg-[#CED6DE] disabled:cursor-not-allowed select-none shadow-2xs cursor-pointer"
            >
              -
            </button>
            <span className="w-4 text-center font-bold text-[#0B0D10] select-none">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={
                item.required
                  ? item.quantity >= 1
                  : item.quantity >= (item.maxQuantity ?? Infinity)
              }
              className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-500 hover:text-gray-700 disabled:bg-[#CED6DE] disabled:cursor-not-allowed select-none shadow-2xs cursor-pointer"
            >
              +
            </button>
          </div>
        )}

        {/* Prices */}
        <div className="text-right text-sm leading-4 tracking-[0.005em] flex flex-col justify-center min-w-16 md:flex-row md:items-baseline md:gap-1.5 md:min-w-0 xl:flex-col xl:items-end xl:gap-0 xl:min-w-16">
          {item.price === 0 ? (
            <>
              <span className="text-[#6F7882] mb-0.5 md:mb-0 line-through">
                {formatPrice(item.originalPrice ?? 0)}
              </span>
              <span className="font-black text-[#4E2FD2] uppercase">
                FREE
              </span>
            </>
          ) : item.originalPrice && item.originalPrice > item.price ? (
            <>
              <span className="text-[#6F7882] mb-0.5 md:mb-0 line-through">
                {formatPrice(item.originalPrice * item.quantity)}
                {item.stepId === 2 && "/mo"}
              </span>
              <span className="font-bold text-[#4E2FD2]">
                {formatPrice(item.price * item.quantity)}
                {item.stepId === 2 && "/mo"}
              </span>
            </>
          ) : (
            <span className="font-bold text-[#4E2FD2]">
              {formatPrice(item.price * item.quantity)}
              {item.stepId === 2 && "/mo"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
