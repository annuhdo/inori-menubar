import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";
import Card from "./Card";
import SearchBar from "./SearchBar";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";

const darkBg = "#090F2C";
const lighterDark = "#0B1028";

injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,400,400i,600,600i,700,700i');
body {
  font-family: 'Source Sans Pro', sans-serif;
  background: ${darkBg};
  overflow-x: hidden;
  color: #eee;
  font-weight: 300;
  font-size: 14px;
}

* {
  margin: 0;
  padding: 0;
}
`;

const Container = styled("div")`
  width: 100%;
  display: grid;
  grid-template-rows: 45px 35px 1fr;
  grid-gap: 0px 10px;
`;

const Topbar = styled("div")`
  height: 45px;
  background: ${lighterDark};
  display: grid;
  grid-template-columns: 1fr 30px;
  grid-gap: 0 5px;
`;

const Filterbar = styled("div")`
  height: 35px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: "",
      searching: false
    };
  }

  render() {
    return (
      <Container>
        <Topbar>
          <SearchBar />
          <button>Two</button>
        </Topbar>
        <Filterbar>
          <button>Active</button>
          <button>Completed</button>
          <button>Dropped</button>
        </Filterbar>
        <Card />
        <Card />
        <Card />
      </Container>
    );
  }
}

export default App;
