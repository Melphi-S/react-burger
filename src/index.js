import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "normalize.css";
import "./index.css";
import App from "./components/App/App";
import { store } from "./services/store";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
