import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";

import { store, persister } from "./store/store";

import App from "./App";

import "./index.scss";

// it looks like an unknown prop is being sent through to the DOM - https://github.com/styled-components/styled-components/issues/4049
import { StyleSheetManager } from "styled-components";

import { BrowserRouter } from "react-router-dom"; //generic router, in-order to keep track of user history

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <StyleSheetManager
          shouldForwardProp={() => true}
          disableVendorPrefixes={false}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StyleSheetManager>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
