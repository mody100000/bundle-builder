import React from "react";
import type { ColorVariant } from "../../types/product";
import Modal from "./Modal";
import { formatPrice } from "../../utils/price";

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  displayBadge?: string;
  variants: ColorVariant[];
  selectedVariant: ColorVariant;
  setSelectedVariant: (variant: ColorVariant) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  displayBadge,
  variants,
  selectedVariant,
  setSelectedVariant,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <div className="flex items-center justify-between w-full">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
              Price
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-gray-900">
                {formatPrice(selectedVariant.price)}
              </span>
              {selectedVariant.originalPrice && (
                <span className="text-xs font-semibold text-[#D8392B] line-through">
                  {formatPrice(selectedVariant.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#4E2FD2] hover:bg-[#3a20a0] text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      }
    >
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Product Image Preview */}
        <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center border border-gray-100 p-4 shrink-0">
          <img
            src={selectedVariant.image}
            alt={`${title} - ${selectedVariant.name}`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col grow space-y-4">
          <div>
            {displayBadge && (
              <span className="inline-block bg-[#4E2FD2] text-white text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full mb-3 shadow-xs">
                {displayBadge}
              </span>
            )}
            <h4 className="text-xl font-extrabold text-gray-900 leading-tight mb-2">
              {title}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Dynamic Variant Details if multiple */}
          {variants.length > 1 && (
            <div>
              <h5 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2">
                Available Options
              </h5>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl border text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                      selectedVariant.id === v.id
                        ? "border-[#4E2FD2] bg-[#4E2FD2]/5 text-[#4E2FD2]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-4 h-4 rounded-md overflow-hidden bg-slate-50 flex items-center justify-center">
                      <img src={v.thumbnail} alt={v.name} className="w-full h-full object-cover" />
                    </div>
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
