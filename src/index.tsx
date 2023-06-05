import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App";
import ReactDOM from "react-dom/client";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>
);
