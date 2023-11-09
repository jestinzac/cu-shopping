import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { UserProvider } from "./contexts/user.context";
import { CategoriesProvider } from "./contexts/categories.context";
import { CartProvider } from "./contexts/cart.context";
import reportWebVitals from "./reportWebVitals";

// it looks like an unknown prop is being sent through to the DOM - https://github.com/styled-components/styled-components/issues/4049
import { StyleSheetManager } from "styled-components";

import { BrowserRouter } from "react-router-dom"; //generic router, in-order to keep track of user history

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyleSheetManager
      shouldForwardProp={() => true}
      disableVendorPrefixes={false}
    >
      <BrowserRouter>
        <UserProvider>
          <CategoriesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CategoriesProvider>
        </UserProvider>
      </BrowserRouter>
    </StyleSheetManager>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
