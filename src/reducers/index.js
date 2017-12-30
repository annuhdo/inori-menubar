import { combineReducers } from "redux";
import series from "./series";
import watchList from "./watchList";

const rootReducer = combineReducers({
  series,
  watchList
});

export default rootReducer;
