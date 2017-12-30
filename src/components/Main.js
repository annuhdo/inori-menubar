import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions/";
import App from "./App";

function mapStateToProps(state) {
  return {
    series: state.series,
    watchList: state.watchList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const Main = connect(mapStateToProps, mapDispatchToProps)(App);

export default Main;
