import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import App from "./pages/App";
import { Provider } from "react-redux";
import { store } from "./entities/store";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Helvetica;
  }
  html {
    background: #14191f;
    overflow: hidden;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Global />
      <App />
    </Provider>
  </React.StrictMode>
);
