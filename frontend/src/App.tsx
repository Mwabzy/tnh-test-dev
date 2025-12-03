import { BrowserRouter as Router } from "react-router";
import { AppRoutes } from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
