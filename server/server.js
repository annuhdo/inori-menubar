const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const DataLoader = require("dataloader");
const cors = require("cors");
const { fetchSearchQuery, fetchSeries } = require("./connection");
const app = express();
const LinvoDB = require("linvodb3");
LinvoDB.dbPath; // default path where data files are stored for each model
LinvoDB.defaults; // default options for every model

app.use(
  "/graphql",
  cors({ origin: "http://localhost:1234" }),
  graphqlHTTP(req => {
    // Caching for every request

    const searchLoader = new DataLoader(keys =>
      Promise.all(keys.map(async key => await fetchSearchQuery(key)))
    );

    const getSeriesLoader = new DataLoader(keys =>
      Promise.all(keys.map(async key => await fetchSeries(key)))
    );

    return {
      schema,
      context: {
        searchLoader,
        getSeriesLoader
      },
      graphiql: true
    };
  })
);

const PORT = 7777;
app.listen(PORT);
console.log(`🚀 Listening on port ${PORT}`);
