import React from "react";
import { useBuilder } from "../context/BuilderContext";
import { formatPrice } from "../utils/price";
import ReviewItem from "./ReviewItem";

const TruckIcon = () => (
  <svg
    className="w-5 h-5 text-[#0AA288]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2h-3V5a2 2 0 00-2-2H3a2 2 0 00-2 2v10a2 2 0 002 2h2m12 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0m-8 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0m-2-5h9M5 5h5M5 8h5"
    />
  </svg>
);

const SatisfactionSeal = () => (
  <div className="relative shrink-0 flex items-center justify-center w-[74px] h-[74px]">
    <svg
      className="absolute w-full h-full text-[#4E2FD2]"
      viewBox="0 0 100 100"
      fill="currentColor"
    >
      <path d="M50,5 C52.5,5 54,7 56.5,7.5 C59,8 61.5,7 63.8,8 C66.1,9 67.5,11.2 69.5,12.5 C71.5,13.8 74,13.8 75.7,15.5 C77.4,17.2 77.4,19.7 78.8,21.7 C80.2,23.7 82.5,24.5 83.5,26.7 C84.5,28.9 84,31.4 84.7,33.7 C85.4,36 87,37.7 87.3,40.1 C87.6,42.5 86.4,44.8 86.4,47.3 C86.4,49.8 87.6,52.1 87.3,54.5 C87,56.9 85.4,58.6 84.7,60.9 C84,63.2 84.5,65.7 83.5,67.9 C82.5,70.1 80.2,70.9 78.8,72.9 C77.4,74.9 77.4,77.4 75.7,79.1 C74,80.8 71.5,80.8 69.5,82.1 C67.5,83.4 66.1,85.6 63.8,86.6 C61.5,87.6 59,86.6 56.5,87.1 C54,87.6 52.5,89.6 50,89.6 C47.5,89.6 46,87.6 43.5,87.1 C41,86.6 38.5,87.6 36.2,86.6 C33.9,85.6 32.5,83.4 30.5,82.1 C28.5,80.8 26,80.8 24.3,79.1 C22.6,77.4 22.6,74.9 21.2,72.9 C19.8,70.9 17.5,70.1 16.5,67.9 C15.5,65.7 16,63.2 15.3,60.9 C14.6,58.6 13,56.9 12.7,54.5 C12.4,52.1 13.6,49.8 13.6,47.3 C13.6,44.8 12.4,42.5 12.7,40.1 C13,37.7 14.6,36 15.3,33.7 C16,31.4 15.5,28.9 16.5,26.7 C17.5,24.5 19.8,23.7 21.2,21.7 C22.6,19.7 22.6,17.2 24.3,15.5 C26,13.8 28.5,13.8 30.5,12.5 C32.5,11.2 33.9,9 36.2,8 C38.5,7 41,8 43.5,7.5 C46,7 47.5,5 50,5 Z" />
    </svg>
    <div className="absolute w-[66px] h-[66px] rounded-full border border-dashed border-white/30 flex flex-col items-center justify-center text-center text-white p-1 select-none">
      <span className="text-[10px] font-black leading-none tracking-tight">
        100%
      </span>
      <span className="text-[6px] leading-[1.1] font-bold mt-0.5 uppercase tracking-tighter">
        Wyze
      </span>
      <span className="text-[5px] leading-[1.1] text-white/95 font-medium tracking-tighter uppercase">
        Satisfaction
      </span>
      <span className="text-[5px] leading-[1.1] text-white/95 font-medium tracking-tighter uppercase">
        Guarantee
      </span>
    </div>
  </div>
);

export function ReviewPanel() {
  const { selectedVariants } = useBuilder();

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
      <div className="text-xs pt-4 px-4 leading-[100%] tracking-[1.6px] uppercase text-[#484848] font-extrabold pb-3 w-full">
        Review
      </div>
      <div className="pb-6 px-6 pt-5">
        <h2 className="text-[22px] font-black text-[#1F1F1F] tracking-tight leading-[110%] mb-1.5">
          Your security system
        </h2>
        <p className="text-sm leading-[1.3] tracking-[0.6px] mb-2">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
        <hr className="border-t border-[#CED6DE]/50 mb-5" />

        {selectedList.length === 0 ? (
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
              Your customized hardware and monitoring plans will summarize here
              as you build.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* List of items grouped by step */}
            <div className="space-y-4 pr-1">
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
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-100/50 flex items-center justify-center p-1 shrink-0 shadow-xs">
                    <TruckIcon />
                  </div>
                  <h4 className="text-sm text-[#0B0D10] ml-3 truncate leading-4 tracking-[0.005em]">
                    Fast Shipping
                  </h4>
                </div>

                <div className="text-right text-sm leading-4 tracking-[0.005em] flex flex-col justify-center min-w-16">
                  <span className="text-[#6F7882]  mb-0.5">$5.99</span>
                  <span className="font-black text-[#4E2FD2]  uppercase">
                    FREE
                  </span>
                </div>
              </div>
            </div>

            {/* Separator before Totals */}
            <hr className="border-t border-[#CED6DE] my-5" />

            {/* Bottom section: Seal, financing badge, and grand totals */}
            <div className="flex items-center justify-between gap-4">
              {/* Left: Guarantee Seal */}
              <SatisfactionSeal />

              {/* Right: Pricing information */}
              <div className="grow flex flex-col items-end">
                {/* Affirm Financing Badge */}
                <span className="bg-[#4E2FD2] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm select-none mb-1 text-right">
                  as low as {formatPrice(totalSale * 0.10215)}/mo
                </span>

                {/* Struck-through Original Total */}
                {totalSavings > 0 && (
                  <span className="text-xs font-semibold text-gray-400 line-through leading-none block mb-0.5">
                    {formatPrice(totalOriginal)}
                  </span>
                )}

                {/* Bold Sale Total */}
                <span className="text-[28px] font-black text-[#4E2FD2] leading-none">
                  {formatPrice(totalSale)}
                </span>
              </div>
            </div>

            {/* Congrats savings message */}
            {totalSavings > 0 && (
              <p className="text-[11px] font-black text-[#0AA288] text-center tracking-normal leading-tight mt-1 select-none">
                Congrats! You're saving {formatPrice(totalSavings)} on your
                security bundle!
              </p>
            )}

            {/* Checkout Action Button */}
            <button className="w-full py-4 bg-[#4E2FD2] hover:bg-[#3a20a0] text-white rounded-2xl text-sm font-black shadow-md hover:shadow-lg transition-all cursor-pointer select-none">
              Checkout
            </button>

            {/* Save link */}
            <div className="text-center">
              <button className="text-[11px] font-bold text-gray-400 hover:text-gray-600 underline cursor-pointer bg-transparent border-none p-0 select-none">
                Save my system for later
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewPanel;
