import React from "react";
import { useBuilder } from "../context/BuilderContext";
import { formatPrice } from "../utils/price";
import ReviewItem from "./ReviewItem";

export function ReviewPanel() {
  const { selectedVariants, saveSystemForLater, checkout } = useBuilder();

  const selectedList = Object.values(selectedVariants).filter(
    (item) => item.quantity > 0,
  );

  const steps = [
    { id: 1, title: "CAMERAS" },
    { id: 3, title: "SENSORS" },
    { id: 4, title: "ACCESSORIES" },
    { id: 2, title: "PLAN" },
  ];

  // Calculate totals including hardware and plans
  const totalOriginal = selectedList.reduce((sum, item) => {
    const orig =
      item.originalPrice !== undefined ? item.originalPrice : item.price;
    return sum + orig * item.quantity;
  }, 0);

  const totalSale = selectedList.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const totalSavings = totalOriginal - totalSale;

  const visibleSections = steps
    .map((step) => {
      const items = selectedList.filter((item) => item.stepId === step.id);
      return { ...step, items };
    })
    .filter((sec) => sec.items.length > 0);

  return (
    <div className="bg-(--bg-primary) rounded-2xl">
      <div className="text-xs pt-4 px-4 leading-[100%] tracking-[1.6px] uppercase text-[#484848] font-extrabold pb-3 w-full md:hidden xl:block">
        Review
      </div>
      <div className="pb-6 px-6 pt-5">
        {selectedList.length === 0 ? (
          <div>
            <h2 className="text-[22px] font-black text-[#1F1F1F] tracking-tight leading-[110%] mb-1.5">
              Your security system
            </h2>
            <p className="text-sm leading-[1.3] tracking-[0.6px] mb-2">
              Review your personalized protection system designed to keep what
              matters most safe.
            </p>
            <hr className="border-t border-[#CED6DE]/50 mb-5" />
            <div className="text-center py-16 text-gray-400 border border-dashed border-blue-200 rounded-3xl bg-white/50">
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
              <p className="text-xs font-semibold max-w-44 mx-auto leading-relaxed text-gray-400">
                Your customized hardware and monitoring plans will summarize
                here as you build.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-x-12 gap-y-5">
            {/* Column 1: Items List & Shipping */}
            <div className="space-y-4 pr-1">
              <div>
                <h2 className="text-[22px] font-black text-[#1F1F1F] tracking-tight leading-[110%] mb-1.5">
                  Your security system
                </h2>
                <p className="text-sm leading-[1.3] tracking-[0.6px] mb-2">
                  Review your personalized protection system designed to keep
                  what matters most safe.
                </p>
                <hr className="border-t border-[#CED6DE]/50 mb-5" />
              </div>
              {visibleSections.map((sec, secIdx) => (
                <React.Fragment key={sec.id}>
                  {secIdx > 0 && (
                    <hr className="border-t border-[#CED6DE]/50 my-4" />
                  )}

                  <div className="space-y-3.5">
                    <h3 className="text-xs font-thin text-[#A8B2BD] leading-4 tracking-[0.48px] uppercase">
                      {sec.title}
                    </h3>

                    <div className="space-y-3.5">
                      {sec.items.map((item) => (
                        <ReviewItem key={item.variantId} item={item} />
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              ))}

              {/* Separator before Shipping */}
              <hr className="border-t border-[#CED6DE]/50 my-4" />

              {/* Fast Shipping row */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-100/50 flex items-center justify-center shrink-0 shadow-xs">
                    <img
                      src="/icons/Fast Shipping.svg"
                      alt="Fast Shipping"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-sm text-[#0B0D10] ml-3 truncate leading-4 tracking-[0.005em]">
                    Fast Shipping
                  </h4>
                </div>

                <div className="text-right text-sm leading-4 tracking-[0.005em] flex flex-col justify-center min-w-0 md:flex-row md:items-baseline md:gap-1.5 md:min-w-0 xl:flex-col xl:items-end xl:gap-0 xl:min-w-16">
                  <span className="text-[#6F7882] mb-0.5 md:mb-0 line-through">
                    $5.99
                  </span>
                  <span className="font-black text-[#4E2FD2] uppercase">
                    FREE
                  </span>
                </div>
              </div>

              {/* Mobile / Desktop Totals and Actions Block */}
              <div className="md:hidden xl:block space-y-5 pt-4">
                <hr className="border-t border-[#CED6DE]/50 my-4" />

                {/* Bottom section: Seal, financing badge, and grand totals */}
                <div className="flex items-center justify-between gap-4">
                  {/* Left: Guarantee Seal */}
                  <img
                    src="/brand badge.png"
                    alt="Satisfaction Guarantee"
                    className="w-19.5 h-19.5 shrink-0 object-contain"
                  />

                  {/* Right: Pricing information */}
                  <div className="grow flex flex-col items-end">
                    {/* Affirm Financing Badge */}
                    <span className="bg-[#4E2FD2] text-white text-xs font-bold px-2 py-1 rounded-sm select-none mb-1 text-right leading-none tracking-tighter">
                      as low as {formatPrice(totalSale * 0.10215)}/mo
                    </span>

                    {/* Struck-through Original Total */}
                    <div className="flex flex-row items-end gap-2">
                      {totalSavings > 0 && (
                        <span className="text-[18px] text-[#6F7882] leading-5 tracking-[0.0025em] line-through block mb-0.5">
                          {formatPrice(totalOriginal)}
                        </span>
                      )}

                      {/* Bold Sale Total */}
                      <span className="text-[24px] font-black text-[#4E2FD2] leading-8 tracking-[-0.0013em]">
                        {formatPrice(totalSale)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Congrats savings message */}
                {totalSavings > 0 && (
                  <p className="text-xs text-[#0AA288] text-center leading-none tracking-[-0.06px] mb-0 pb-2">
                    Congrats! You're saving {formatPrice(totalSavings)} on your
                    security bundle!
                  </p>
                )}

                {/* Checkout Action Button */}
                <button
                  onClick={checkout}
                  className="w-full py-3.25 bg-[#4E2FD2] hover:bg-[#3a20a0] text-white font-bold rounded-sm text-[17px] leading-none tracking-normal shadow-md hover:shadow-lg transition-all cursor-pointer select-none mb-0"
                >
                  Checkout
                </button>

                {/* Save link */}
                <div className="text-center">
                  <button
                    onClick={saveSystemForLater}
                    className="text-sm text-[#484848] hover:text-gray-500 underline leading-snug tracking-[-0.02px] cursor-pointer bg-transparent border-none pt-1.5 pb-3 select-none"
                  >
                    Save my system for later
                  </button>
                </div>
              </div>
            </div>

            {/* Column 2: Tablet-specific Totals and Actions Block */}
            <div className="hidden md:flex xl:hidden flex-col justify-start h-full">
              <div>
                {/* 30-day hassle-free returns banner */}
                <div className="flex items-center gap-6 pt-5">
                  <img
                    src="/brand badge.png"
                    alt="Satisfaction Guarantee"
                    className="w-32.75 h-32.75 shrink-0 object-contain"
                  />
                  <div className="flex flex-col leading-[1.1] tracking-[0.6px]">
                    <h4 className="text-[18px] font-bold text-[#1F1F1F] tracking-tight mb-4">
                      30-day hassle-free returns
                    </h4>
                    <p className="text-sm text-[#484848] leading-tight">
                      If you're not totally in love with the product, we will
                      refund you 100%.
                    </p>
                  </div>
                </div>

                {/* Pricing row: Affirm Financing & Grand Totals inline */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  {/* Affirm Financing Badge */}
                  <span className="bg-[#4E2FD2] text-white text-xs font-bold px-3 py-1.5 rounded-sm select-none leading-none tracking-tighter">
                    as low as {formatPrice(totalSale * 0.10215)}/mo
                  </span>

                  {/* Inline Grand Totals */}
                  <div className="flex items-baseline gap-2">
                    {totalSavings > 0 && (
                      <span className="text-[18px] text-[#6F7882] leading-5 tracking-[0.0025em] line-through">
                        {formatPrice(totalOriginal)}
                      </span>
                    )}
                    <span className="text-[28px] font-black text-[#4E2FD2] leading-none tracking-[-0.0013em]">
                      {formatPrice(totalSale)}
                    </span>
                  </div>
                </div>

                {/* Congrats savings message */}
                {totalSavings > 0 && (
                  <p className="text-xs text-[#0AA288] text-center leading-none tracking-[-0.06px] my-3">
                    Congrats! You're saving {formatPrice(totalSavings)} on your
                    security bundle!
                  </p>
                )}

                {/* Checkout Action Button */}
                <button
                  onClick={checkout}
                  className="w-full py-3.25 bg-[#4E2FD2] hover:bg-[#3a20a0] text-white font-bold rounded-sm text-[17px] leading-none tracking-normal shadow-md hover:shadow-lg transition-all cursor-pointer select-none mb-0"
                >
                  Checkout
                </button>

                {/* Save link */}
                <div className="text-center pt-2">
                  <button
                    onClick={saveSystemForLater}
                    className="text-sm text-[#484848] hover:text-gray-500 underline leading-snug tracking-[-0.02px] cursor-pointer bg-transparent border-none select-none"
                  >
                    Save my system for later
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewPanel;
