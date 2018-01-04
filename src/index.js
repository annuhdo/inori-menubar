import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";
import App from "./components/App";
import store from "./store";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { persistCache } from "apollo-cache-persist";
import registerServiceWorker from "./registerServiceWorker";

// Set up your cache.
const cache = new InMemoryCache();

// Set up cache persistence.
persistCache({
  cache,
  storage: window.localStorage
});

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:7777/graphql",
    credentials: "same-origin"
  }),
  cache
});

// const Index = () => {
//   return <Main store={store} />;
// };

const Index = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// Create root node for template
let root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

ReactDOM.render(Index, document.getElementById("root"));
registerServiceWorker();
