import * as React from "react";
import * as ReactDOM from "react-dom";

import Shell from "./shell";
import StartPage from "./start_page";

const element = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <StartPage />
  </React.StrictMode>,
  element
);
