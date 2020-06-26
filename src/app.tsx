import * as React from "react";
import * as ReactDOM from "react-dom";
import './App.sass'

import Home from "./client/components/home/home";

console.log("**********running app.tsx**** ");

ReactDOM.render(
  <div>

    <h1 className="title">Bulma</h1>
    <p className="subtitle">
      Modern CSS framework based on{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox">
        Flexbox
      </a>
    </p>

    <div className="field">
      <div className="control">
        <input className="input" type="text" placeholder="Input" />
      </div>
    </div>

    <div className="field">
      <p className="control">
        <span className="select">
          <select>
            <option>Select dropdown</option>
          </select>
        </span>
      </p>
    </div>

    <div className="buttons">
      <a className="button is-primary">Primary</a>
      <a className="button is-link">Link</a>
    </div>


    <Home />
  </div>,
  document.getElementById("root")
);
