import * as React from "react";
import * as ReactDOM from "react-dom";
import './App.sass'

import Routes from "./client/components/home/Routes";

console.log("**********running app.tsx**** ");

ReactDOM.render(
  <div>
    <Routes />
  </div>,
  document.getElementById("root")
);
