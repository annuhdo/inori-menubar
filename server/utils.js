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
