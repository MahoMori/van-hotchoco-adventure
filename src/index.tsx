import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { BrowserRouter as Router } from "react-router-dom";

import GlobalStyle from "./globalStyle";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
