function watchList(state = {}, action) {
  switch (action.type) {
    case "ADD_SERIES":
      const list = state.list;
      const ids = state.ids;
      list.push(action.series);
      ids[action.series.mal_id] = "local";
      return {
        ...state,
        list,
        ids
      };
    case "SYNC_WATCH_LIST":
      return {
        ...state,
        list: action.list,
        ids: action.ids
      };
    default:
      return state;
  }
}

export default watchList;
