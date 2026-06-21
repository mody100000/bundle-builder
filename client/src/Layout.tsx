export default function Layout() {
  return (
    <div className="py-8 sm:px-6 lg:px-20">
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-5">
          {/* Builder */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl shadow-sm p-8 min-h-100 flex items-center justify-center">
            <div className="text-gray-400 font-semibold text-lg uppercase tracking-wider">
              Builder
            </div>
          </div>

          {/* ReviewPanel */}
          <div className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-8 min-h-100 flex items-center justify-center">
            <div className="text-gray-400 font-semibold text-lg uppercase tracking-wider">
              ReviewPanel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
