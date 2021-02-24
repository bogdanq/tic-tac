import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import { App } from "./App";
import { connect } from "./api/ws/client";

import "./index.css";

Modal.setAppElement("#root");

connect(() => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
