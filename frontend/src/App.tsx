import { BrowserRouter as Router } from "react-router";
import { AppRoutes } from "./routes";
import { Toaster } from "react-hot-toast";
import SeoManager from "@/components/seo/SeoManager";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <SeoManager />
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
