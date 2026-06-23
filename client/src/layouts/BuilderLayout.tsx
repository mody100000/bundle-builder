import React from "react";

export interface BuilderLayoutProps<T> {
  items: T[];
  renderItem: (item: T, layout: "horizontal" | "vertical") => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
}

export function BuilderLayout<T>({
  items,
  renderItem,
  getKey,
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
      <div className="hidden md:grid 2xl:hidden grid-cols-2 lg:grid-cols-3 gap-4 pb-2">
        {items.map((item, idx) => (
          <div key={getSafeKey(item, idx)} className="w-full h-full">
            {renderItem(item, "vertical")}
          </div>
        ))}
      </div>
      {/* ── Large screens: 2-column grid, last odd item centered ── */}
      <div className="hidden 2xl:grid 2xl:grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <div
            key={getSafeKey(item, idx)}
            className={
              items.length % 2 !== 0 && idx === items.length - 1
                ? "2xl:col-span-2 2xl:w-1/2 2xl:mx-auto h-full"
                : "h-full"
            }
          >
            {renderItem(item, "horizontal")}
          </div>
        ))}
      </div>
    </>
  );
}

export default BuilderLayout;
