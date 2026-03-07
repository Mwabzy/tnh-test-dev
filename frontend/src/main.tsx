import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { IntlayerProvider } from "react-intlayer";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IntlayerProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </IntlayerProvider>
  </StrictMode>,
);
