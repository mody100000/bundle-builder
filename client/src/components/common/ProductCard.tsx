import React, { useState, useEffect, useRef } from "react";
import type { ColorVariant, ProductCardProps } from "../../types/product";
import {
  formatPrice,
  calculateTotal,
  getDiscountPercentageText,
} from "../../utils/price";

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  learnMoreUrl = "#",
  variants,
  defaultVariantId,
  discountBadge,
  onSelectionChange,
}) => {
  const initialVariant =
    variants.find((v) => v.id === defaultVariantId) || variants[0];

  const [selectedVariant, setSelectedVariant] =
    useState<ColorVariant>(initialVariant);
  const [currentQuantity, setCurrentQuantity] = useState<number>(1);

  // Keep a mutable ref of the parent callback to avoid re-triggering the effect
  const onSelectionChangeRef = useRef(onSelectionChange);
  useEffect(() => {
    onSelectionChangeRef.current = onSelectionChange;
  }, [onSelectionChange]);

  const [prevDefaultVariantId, setPrevDefaultVariantId] = useState(defaultVariantId);
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
      });
    }
  }, [selectedVariant, currentQuantity, id, title]);

  const handleDecrement = () => {
    if (currentQuantity > 1) {
      setCurrentQuantity((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    setCurrentQuantity((prev) => prev + 1);
  };

  // Determine discount badge: prioritize prop, fallback to variant-specific calculation
  const displayBadge =
    discountBadge ||
    getDiscountPercentageText(
      selectedVariant.price,
      selectedVariant.originalPrice,
    );

  return (
    <div className="flex flex-col sm:flex-row gap-5 p-5 bg-white border border-gray-150 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 w-full group">
      {/* Left side: Image and Badge */}
      <div className="relative shrink-0 w-full sm:w-44 h-44 sm:h-auto bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100 group-hover:border-gray-200 transition-colors">
        {displayBadge && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm animate-pulse">
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
      <div className="flex flex-col justify-between grow">
        <div>
          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          {/* Description & Learn More */}
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            {description}
            <a
              href={learnMoreUrl}
              className="text-blue-600 hover:text-blue-700 underline font-medium inline-block ml-1 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none rounded"
            >
              Learn more
            </a>
          </p>

          {/* Color Selector */}
          <div className="mb-4">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Select Color
            </span>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => {
                const isSelected = selectedVariant.id === variant.id;
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`flex flex-col items-center p-1.5 rounded-lg border text-center transition-all duration-200 cursor-pointer min-w-16 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/30 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center mb-1">
                      <img
                        src={variant.thumbnail}
                        alt={variant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span
                      className={`text-[9px] font-semibold truncate max-w-14 leading-tight ${
                        isSelected ? "text-blue-600 font-bold" : "text-gray-500"
                      }`}
                    >
                      {variant.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quantity & Price Row */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3.5 mt-auto">
          {/* Quantity Selector */}
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5 shadow-inner">
            <button
              onClick={handleDecrement}
              disabled={currentQuantity <= 1}
              className="w-7 h-7 flex items-center justify-center rounded-md bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 shadow-sm transition-all active:scale-95 cursor-pointer font-bold disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed text-xs"
            >
              -
            </button>
            <span className="w-8 text-center text-xs font-bold text-gray-700 select-none">
              {currentQuantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-7 h-7 flex items-center justify-center rounded-md bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 shadow-sm transition-all active:scale-95 cursor-pointer font-bold text-xs"
            >
              +
            </button>
          </div>

          {/* Price (Right) */}
          <div className="text-right flex flex-col justify-center min-h-9.5">
            {selectedVariant.originalPrice ? (
              <>
                <span className="text-[11px] font-bold text-rose-500 line-through leading-none block mb-0.5">
                  {formatPrice(
                    calculateTotal(
                      selectedVariant.originalPrice,
                      currentQuantity,
                    ),
                  )}
                </span>
                <span className="text-base font-extrabold text-gray-900 leading-none">
                  {formatPrice(
                    calculateTotal(selectedVariant.price, currentQuantity),
                  )}
                </span>
              </>
            ) : (
              <span className="text-base font-extrabold text-gray-900 leading-none">
                {formatPrice(
                  calculateTotal(selectedVariant.price, currentQuantity),
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
