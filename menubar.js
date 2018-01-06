const menubar = require("menubar");
const path = require("path");
const url = require("url");
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} = require("electron-devtools-installer");

// Keep a reference for dev mode
let dev = false;
if (
  process.defaultApp ||
  /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
  /[\\/]electron[\\/]/.test(process.execPath)
) {
  dev = true;
}

let indexPath;
if (dev && process.argv.indexOf("--noDevServer") === -1) {
  indexPath = url.format({
    protocol: "http:",
    host: "localhost:8080",
    pathname: "index.html",
    slashes: true
  });
} else {
  indexPath = url.format({
    protocol: "file:",
    pathname: path.join(__dirname, "dist", "index.html"),
    slashes: true
  });
}

const mb = menubar({
  index: indexPath,
  height: 550
  // alwaysOnTop: true
});

mb.on("ready", function ready() {
  console.log("app is ready");

  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then(name => console.log(`Added Extension:  ${name}`))
  //   .catch(err => console.log("An error occurred: ", err));

  // installExtension(REDUX_DEVTOOLS)
  //   .then(name => console.log(`Added Extension:  ${name}`))
  //   .catch(err => console.log("An error occurred: ", err));
});

mb.on("after-create-window", () => {
  // mb.window.openDevTools();
});
