import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* redux works as context API we get a provider from react-redux and we wrap our App component inside it and we pass store prop which will point to store we created so our App and all its child components can use it*/}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
