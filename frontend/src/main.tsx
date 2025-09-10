import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { IntlayerProvider} from "react-intlayer"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IntlayerProvider>
      <App />
    </IntlayerProvider>
  </StrictMode>
);
