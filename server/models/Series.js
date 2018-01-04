const Datastore = require("nedb-promise");
const { appDataPath } = require("../utils");

const appPath = appDataPath("inori-menubar");

const db = new Datastore({
  filename: `${appPath}/db/series.db`,
  autoload: true
});

module.exports = db;
