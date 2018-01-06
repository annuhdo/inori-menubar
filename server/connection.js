const axios = require("axios");
const cachios = require("cachios");

const KITSU_URL = "https://kitsu.io/api/edge";

exports.fetchSearchQuery = async ({ type, keyword }) => {
  try {
    const result = await axios.get(
      `${KITSU_URL}/${type}?filter[text]=${keyword}`
    );
    return result.data.data;
  } catch (err) {
    console.error(err);
  }
};

exports.fetchSeries = async ({ type, id }) => {
  try {
    const result = await axios.get(`${KITSU_URL}/${type}/${id}`);
    return result.data.data;
  } catch (err) {
    console.error(err);
  }
};
