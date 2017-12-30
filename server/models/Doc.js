const Promise = require("bluebird");
const LinvoDB = require("linvodb3");
const modelName = "doc";
const schema = {}; // Non-strict always, can be left empty
const options = {};
// options.filename = "./test.db"; // Path to database - not necessary
// options.store = { db: require("level-js") }; // Options passed to LevelUP constructor
const Doc = new LinvoDB(modelName, schema, options); // New model; Doc is the constructor

Promise.promisifyAll(Doc.find().__proto__);

module.exports = Doc;
