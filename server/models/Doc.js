const Datastore = require("nedb-promise");

const db = new Datastore({ filename: "./db/series.db", autoload: true });

module.exports = db;
