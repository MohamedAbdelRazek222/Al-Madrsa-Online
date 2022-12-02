import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import { ContextProvider } from "./Dashboard/contetxts/ContextProvider";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./Dashboard/store/index";
import { BrowserRouter } from "react-router-dom";

var Promise = require('es6-promise').Promise;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
//   <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> */}
        <App />
      {/* </BrowserRouter> */}
    </Provider>
//   </React.StrictMode>
);

reportWebVitals();
