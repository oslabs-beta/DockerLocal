import * as React from "react";
import * as ReactDOM from "react-dom";
import './App.sass'

import Home from "./client/components/home/home";

console.log("**********running app.tsx**** ");

ReactDOM.render(
  <div>
    <Home />
  </div>,
  document.getElementById("root")
);
