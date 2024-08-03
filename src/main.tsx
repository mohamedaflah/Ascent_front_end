// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./shadcn/theme-provider.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { Toaster } from "react-hot-toast";
import { PrimeReactProvider } from "primereact/api";
import { NextUIProvider } from "@nextui-org/react";
import { SocketProvider } from "./contexts/SocketContext.tsx";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Router>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster position="top-center" />
          <PrimeReactProvider>
            <SocketProvider>
              <NextUIProvider>
                <App />
              </NextUIProvider>
            </SocketProvider>
          </PrimeReactProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </Router>
  // </React.StrictMode>
);
