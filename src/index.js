import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";
import store from "./store";

const Index = () => {
  return <Main store={store} />;
};

// Create root node for template
let root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

ReactDOM.render(<Index />, document.getElementById("root"));
