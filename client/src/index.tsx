import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { App } from "./App";

import "./index.css";

Modal.setAppElement("#root");

ReactDOM.render(
  <>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
    />
  </>,
  document.getElementById("root")
);
