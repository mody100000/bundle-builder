import Layout from "./layouts/Layout.tsx";
import { BuilderProvider } from "./context/BuilderContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BuilderProvider>
      <Layout />
      <ToastContainer position="top-right" autoClose={3000} />
    </BuilderProvider>
  );
}

export default App;
