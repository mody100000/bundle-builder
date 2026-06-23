import React from "react";

export interface BuilderLayoutProps<T> {
  items: T[];
  renderItem: (item: T, layout: "horizontal" | "vertical") => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  xlCols?: 2 | 3;
}

export function BuilderLayout<T>({
  items,
  renderItem,
  getKey,
  xlCols = 2,
}: BuilderLayoutProps<T>) {
  const getSafeKey = (item: T, index: number): string | number => {
    if (getKey) return getKey(item, index);
    if (item && typeof item === "object" && "id" in item) {
      const idVal = (item as { id: unknown }).id;
      if (typeof idVal === "string" || typeof idVal === "number") {
        return idVal;
      }
    }
    return index;
  };

  return (
    <>
      {/* ── Small screens: single column, horizontal card layout ── */}
      <div className="flex flex-col gap-4 md:hidden">
        {items.map((item, idx) => (
          <React.Fragment key={getSafeKey(item, idx)}>
            {renderItem(item, "horizontal")}
          </React.Fragment>
        ))}
      </div>
      {/* ── Medium / tablet screens: vertical cards, responsive columns ── */}
      <div className="hidden md:grid xl:hidden grid-cols-2 lg:grid-cols-3 gap-4 pb-2">
        {items.map((item, idx) => (
          <div key={getSafeKey(item, idx)} className="w-full h-full">
            {renderItem(item, "vertical")}
          </div>
        ))}
      </div>
      {/* ── Large screens: Grid layout based on xlCols ── */}
      <div className={`hidden xl:grid gap-6 ${xlCols === 3 ? "xl:grid-cols-3" : "xl:grid-cols-2"}`}>
        {items.map((item, idx) => {
          const isLastOdd = xlCols === 2 && items.length % 2 !== 0 && idx === items.length - 1;
          return (
            <div
              key={getSafeKey(item, idx)}
              className={isLastOdd ? "xl:col-span-2 xl:w-1/2 xl:mx-auto h-full" : "h-full"}
            >
              {renderItem(item, xlCols === 3 ? "vertical" : "horizontal")}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default BuilderLayout;
