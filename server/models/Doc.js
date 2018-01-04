const Datastore = require("nedb-promise");

const path =
  process.env.APPDATA ||
  (process.platform == "darwin"
    ? process.env.HOME + "/Library/Application Support"
    : "/var/local");
const db = new Datastore({
  filename: `${path}/inori-menubar/db/series.db`,
  autoload: true
});

module.exports = db;
