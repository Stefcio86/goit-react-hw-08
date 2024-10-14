import { StrictMode } from "react";
import App from "./App.jsx";
// import "./index.css";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { persistor, store } from "./store.js"; 
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
            <App />
            <Toaster />
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
