import Layout from "./layouts/Layout.tsx";
import { BuilderProvider } from "./context/BuilderContext";

function App() {
  return (
    <BuilderProvider>
      <Layout />
    </BuilderProvider>
  );
}

export default App;
