import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
// import the root reducer
import rootReducer from "./reducers";

// initial state
export const initialState = {
  series: [],
  watchList: {
    list: [],
    ids: {}
  }
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, initialState, enhancer);

export default store;
