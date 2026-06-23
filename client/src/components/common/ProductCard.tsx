import React, { useState, useEffect, useRef } from "react";
import type { ColorVariant, ProductCardProps } from "../../types/product";
import {
  formatPrice,
  calculateTotal,
  getDiscountPercentageText,
} from "../../utils/price";
import { useBuilder } from "../../context/BuilderContext";

export const ProductCard: React.FC<
  ProductCardProps & { layout?: "horizontal" | "vertical" }
> = ({
  id,
  title,
  description,
  learnMoreUrl = "#",
  variants,
  defaultVariantId,
  discountBadge,
  stepId = 1,
  onSelectionChange,
  layout = "horizontal",
  required = false,
}) => {
  const initialVariant =
    variants.find((v) => v.id === defaultVariantId) || variants[0];

  const [selectedVariant, setSelectedVariant] =
    useState<ColorVariant>(initialVariant);

  const { selectedVariants, updateVariantQuantity } = useBuilder();
  const currentQuantity = selectedVariants[selectedVariant.id]?.quantity ?? 0;

  // Keep a mutable ref of the parent callback to avoid re-triggering the effect
  const onSelectionChangeRef = useRef(onSelectionChange);
  useEffect(() => {
    onSelectionChangeRef.current = onSelectionChange;
  }, [onSelectionChange]);

  const [prevDefaultVariantId, setPrevDefaultVariantId] =
    useState(defaultVariantId);
  if (defaultVariantId !== prevDefaultVariantId) {
    setPrevDefaultVariantId(defaultVariantId);
    if (defaultVariantId) {
      const match = variants.find((v) => v.id === defaultVariantId);
      if (match) {
        setSelectedVariant(match);
      }
    }
  }

  // Trigger parent update when variant or quantity changes
  useEffect(() => {
    if (onSelectionChangeRef.current) {
      onSelectionChangeRef.current({
        productId: id,
        variantId: selectedVariant.id,
        quantity: currentQuantity,
        price: selectedVariant.price,
        originalPrice: selectedVariant.originalPrice,
        name: title,
        colorName: selectedVariant.name,
        image: selectedVariant.image,
        stepId,
      });
    }
  }, [selectedVariant, currentQuantity, id, title, stepId]);

  const handleDecrement = () => {
    const minQty = required ? 1 : 0;
    if (currentQuantity > minQty) {
      updateVariantQuantity(
        stepId,
        id,
        selectedVariant.id,
        currentQuantity - 1,
        selectedVariant.price,
        selectedVariant.originalPrice,
        title,
        selectedVariant.name,
        selectedVariant.image,
      );
    }
  };

  const handleIncrement = () => {
    const maxQty = required ? 1 : (selectedVariant.maxQuantity ?? Infinity);
    if (currentQuantity < maxQty) {
      updateVariantQuantity(
        stepId,
        id,
        selectedVariant.id,
        currentQuantity + 1,
        selectedVariant.price,
        selectedVariant.originalPrice,
        title,
        selectedVariant.name,
        selectedVariant.image,
      );
    }
  };

  // Determine discount badge: prioritize variant-specific discount percentage, fallback to prop
  const displayBadge = selectedVariant.discount
    ? `Save ${selectedVariant.discount}%`
    : discountBadge ||
      getDiscountPercentageText(
        selectedVariant.price,
        selectedVariant.originalPrice,
      );

  const productQty = Object.values(selectedVariants)
    .filter((v) => v.productId === id)
    .reduce((sum, v) => sum + v.quantity, 0);
  const isSelected = productQty > 0;

  return (
    <div
      className={`flex gap-3 p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-full h-full group ${
        layout === "vertical" ? "flex-col" : "flex-col sm:flex-row"
      } border-2 ${isSelected ? "border-[#4E2FD2B2]" : "border-transparent"}`}
    >
      {/* Image and Badge */}
      <div
        className={`relative shrink-0 rounded-xl overflow-hidden flex items-center justify-center  group-hover:border-gray-200 transition-colors ${
          layout === "vertical"
            ? "w-full aspect-square"
            : "w-full sm:w-1/4 aspect-square"
        }`}
      >
        {displayBadge && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-[#4E2FD2] text-white text-[12px] leading-none tracking-normal px-2 py-1 rounded-xl shadow-sm animate-pulse">
            {displayBadge}
          </div>
        )}
        <img
          src={selectedVariant.image}
          alt={`${title} - ${selectedVariant.name}`}
          className="w-full h-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Right side: Content */}
      <div className="flex flex-col justify-between grow pr-6">
        <div>
          {/* Title */}
          <h3 className="text-base leading-none tracking-[0.6px] mb-2 group-hover:text-[#4E2FD2] transition-colors">
            {title}
          </h3>

          {/* Description & Learn More */}
          <p className="text-xs leading-[1.3] tracking-[0.6px] mb-3">
            {description}
            <a
              href={learnMoreUrl}
              className="text-[#4E2FD2] hover:text-[#3a20a0] underline font-medium inline-block ml-1 transition-colors focus:ring-2 focus:ring-[#4E2FD2] focus:outline-none rounded"
            >
              Learn more
            </a>
          </p>

          {/* Color Selector */}
          {variants.length > 1 && (
            <div className="">
              <div className="flex flex-wrap gap-2">
                {variants.map((variant) => {
                  const isSelected = selectedVariant.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`flex items-center justify-center rounded-xs border text-center transition-all duration-200 cursor-pointer min-w-16 ${
                        isSelected
                          ? "border-[0.5px] border-[#0AA288] bg-[#1DF0BB0A] shadow-sm"
                          : "border-[0.5px] border-[#CCCCCC] bg-white "
                      }`}
                    >
                      <div className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center">
                        <img
                          src={variant.thumbnail}
                          alt={variant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span
                        className={
                          "text-[10px] text-[#1F1F1F] leading-none tracking-[0.6px] truncate max-w-14"
                        }
                      >
                        {variant.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Quantity & Price Row */}
        <div className="flex items-center justify-between my-3">
          {/* Quantity Selector */}
          <div className="flex items-center">
            <button
              onClick={handleDecrement}
              disabled={required ? currentQuantity <= 1 : currentQuantity <= 0}
              className="w-7 h-7 flex items-center text-lg justify-center rounded-md bg-[#F0F4F7] hover:bg-gray-100 text-gray-600 border border-gray-200 shadow-sm transition-all active:scale-95 cursor-pointer font-bold disabled:bg-white disabled:cursor-not-allowed disabled:border-2 disabled:border-[#E6EBF0] disabled:text-gray-400 "
            >
              -
            </button>
            <span className="w-11 text-center text-base text-[#0B0D10] select-none">
              {currentQuantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={
                required
                  ? currentQuantity >= 1
                  : currentQuantity >= (selectedVariant.maxQuantity ?? Infinity)
              }
              className="w-7 h-7 flex items-center justify-center rounded-md bg-[#F0F4F7] hover:bg-gray-100 text-gray-600 border border-gray-200 shadow-sm transition-all active:scale-95 cursor-pointer font-bold disabled:bg-white disabled:cursor-not-allowed disabled:border-2 disabled:border-[#E6EBF0] disabled:text-gray-400 text-lg"
            >
              +
            </button>
          </div>

          {/* Price (Right) */}
          <div className="text-right flex flex-col justify-center min-h-9.5">
            {selectedVariant.originalPrice ? (
              <>
                <span className="text-base font-normal leading-none tracking-[0.6px] text-[#D8392B] line-through block mb-0.5">
                  {formatPrice(
                    calculateTotal(
                      selectedVariant.originalPrice,
                      currentQuantity > 0 ? currentQuantity : 1,
                    ),
                  )}
                </span>
                <span className="text-base font-normal tracking-[0.6px] text-[#575757] leading-none">
                  {formatPrice(
                    calculateTotal(
                      selectedVariant.price,
                      currentQuantity > 0 ? currentQuantity : 1,
                    ),
                  )}
                </span>
              </>
            ) : (
              <span className="text-base font-normal tracking-[0.6px] text-[#575757] leading-none">
                {formatPrice(
                  calculateTotal(
                    selectedVariant.price,
                    currentQuantity > 0 ? currentQuantity : 1,
                  ),
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
