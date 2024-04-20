import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/store/store";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js").then(
    function (registration) {
      // Registration was successful
      console.log("Service Worker registered with scope: ", registration.scope);
    },
    function (err) {
      // registration failed :(
      console.log("Service Worker registration failed: ", err);
    }
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={rootReducer}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
