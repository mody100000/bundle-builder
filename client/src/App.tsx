function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <h1 className="text-3xl">Big Title (h1, weight 400 in code)</h1>

        <div className="space-y-2">
          <h2 className="text-xl">Small Title (h2, weight 400 in code)</h2>
          <h3 className="text-lg">Small Title (h3, weight 400 in code)</h3>
        </div>

        <hr className="border-gray-100" />

        <p className="text-base">
          This is default body text. It uses the Gilroy font, defaulting to
          Medium weight with a color of #1F1F1FBF (which has 75% opacity).
        </p>

        <div className="text-sm bg-gray-50 p-4 rounded-lg space-y-1">
          <p className="font-semibold text-gray-400 uppercase tracking-wider text-xs">
            Aesthetic Specs Applied:
          </p>
          <p>• Default body text: Gilroy Medium (500), #1F1F1FBF</p>
          <p>• Big titles (h1): Gilroy SemiBold (600), #0B0D10</p>
          <p>• Small titles (h2, h3, etc.): Gilroy SemiBold (600), #1F1F1F</p>
          <p>
            • Heading font-weights overridden from 400 to 600 via stylesheet
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
