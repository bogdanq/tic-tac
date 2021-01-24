import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { connect } from "./api/ws/client";

import "./index.css";

connect(() => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
