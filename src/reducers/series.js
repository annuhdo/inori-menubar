function series(state = [], action) {
  switch (action.type) {
    case "SHOW_RESULTS":
      return action.series;
    case "REMOVE_RESULTS":
      return [];
    default:
      return state;
  }
}

export default series;
