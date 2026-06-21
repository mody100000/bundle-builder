import Builder from "./components/Builder";

export default function Layout() {
  return (
    <div className="py-8 sm:px-6 lg:px-20">
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
          {/* Builder Area (Left) */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6">
            <Builder />
          </div>

          {/* Review Panel Area (Right) */}
          <div className="lg:col-span-4 xl:col-span-3 sticky top-6">
            <div className="bg-white border border-gray-150 rounded-2xl shadow-sm p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Review Panel
                </h2>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
                  Summary
                </span>
              </div>

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
                <p className="text-xs font-medium max-w-[160px] mx-auto leading-relaxed">
                  Your customized hardware and monitoring plans will summarize
                  here as you build.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
