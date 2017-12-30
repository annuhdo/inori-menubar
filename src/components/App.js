import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";

const darkBg = "#090F2C";
const lighterDark = "#0B1028";

injectGlobal`
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700");
body {
  font-family: 'Source Sans Pro', sans-serif;
  background: ${darkBg};
  overflow-x: hidden;
}

* {
  margin: 0;
  padding: 0;
}
`;

const Container = styled("div")`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
`;

const Topbar = styled("div")`
  height: 45px;
  background: ${lighterDark};
  display: grid;
  grid-template-columns: 1fr 30px 30px;
  grid-gap: 20px;
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
          <button>One</button>
          <button>Two</button>
          <button>Three</button>
        </Topbar>
        <Filterbar>
          <button>Active</button>
          <button>Completed</button>
          <button>Dropped</button>
        </Filterbar>
        <div>Howdy</div>
      </Container>
    );
  }
}

export default App;
