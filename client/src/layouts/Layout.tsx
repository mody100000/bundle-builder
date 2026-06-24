import Builder from "../components/Builder";
import ReviewPanel from "../components/ReviewPanel";

export default function Layout() {
  return (
    <div className="py-8 sm:px-6 lg:px-20">
      <h2 className="text-3xl text-center mb-7 leading-[110%] tracking-[-0.06px] font-bold block md:hidden">
        Let’s get started!
      </h2>
      <div className="mx-auto w-full">
        <div className="grid grid-cols-1 xl:grid-cols-10 gap-8 items-start">
          {/* Builder Area (Left) */}
          <div className="xl:col-span-7 space-y-2">
            <Builder />
          </div>

          {/* Review Panel Area (Right) */}
          <div className="xl:col-span-3">
            <ReviewPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
