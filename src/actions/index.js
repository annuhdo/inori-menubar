import axios from "axios";

function showResults(series) {
  return {
    type: "SHOW_RESULTS",
    series
  };
}

function importWatchList(list) {
  const ids = {};

  for (let i = 0; i < list.length; i++) {
    ids[list[i].mal_id] = list[i]._id;
  }

  return {
    type: "SYNC_WATCH_LIST",
    list,
    ids
  };
}

function addToWatchList(series) {
  return {
    type: "ADD_SERIES",
    series
  };
}

export function syncWatchList() {
  return dispatch => {
    return axios
      .get("/watchlist")
      .then(response => dispatch(importWatchList(response.data)))
      .catch(err => console.error(err));
  };
}

export function removeResults() {
  return {
    type: "REMOVE_RESULTS"
  };
}

export function searchKeyword(keyword) {
  return dispatch => {
    return axios
      .get(`/search?keyword=${keyword}`)
      .then(response => dispatch(showResults(response.data)))
      .catch(err => console.error(err));
  };
}

export function addSeries(series) {
  const seriesInfo = {
    mal_id: series.mal_id,
    name: series.name,
    url: series.url,
    image_url: series.image_url,
    media_type: series.media_type,
    aired: series.aired,
    status: series.status,
    episode: series.episode || 0
  };

  return dispatch => {
    dispatch(addToWatchList(series));

    return axios
      .post("/add", seriesInfo)
      .then(response => dispatch(syncWatchList()))
      .catch(err => console.error(err));
  };
}

export function deleteSeries(dbId) {
  return dispatch => {
    return axios
      .post(`/remove/${dbId}`)
      .then(response => dispatch(syncWatchList()))
      .catch(err => console.error(err));
  };
}
