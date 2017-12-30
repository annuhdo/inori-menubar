const cluster = require("cluster");
if (cluster.isMaster) {
  require("./menubar.js"); // your electron main file
  cluster.fork();
} else {
  require("./server/server.js"); // your server code
}
