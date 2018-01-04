const os = require("os");
const path = require("path");
const Datastore = require("nedb-promise");

exports.parseImage = image_url => {
  image_url = image_url.split("?")[0];
  image_url = image_url.split("/images/")[1];
  image_url = `https://myanimelist.cdn-dena.com/images/${image_url}`;

  return image_url;
};

exports.parseURL = (type, slug) => {
  const KITSU = "https://kitsu.io";
  return `${KITSU}/${type}/${slug}`;
};

exports.appDataPath = appName => {
  const platform = os.platform();

  switch (platform) {
    case "darwin":
      return path.join(
        process.env["HOME"],
        "Library",
        "Application Support",
        appName
      );
    case "linux":
      if (process.env["XDG_DATA_HOME"]) {
        return path.join(process.env["XDG_DATA_HOME"], appName);
      }

      return path.join(process.env["HOME"], ".local", "share", appName);
    case "win32":
      if (process.env["LOCALAPPDATA"]) {
        return path.join(process.env["LOCALAPPDATA"], "data", appName);
      }

      return path.join(process.env["USERPROFILE"], "Application Data", appName);
    default:
      return "/var/local";
  }
};
