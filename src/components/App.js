import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";
import List from "./List";
import SearchBar from "./SearchBar";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";
import faFilter from "@fortawesome/fontawesome-free-solid/faFilter";

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
  /* display: grid;
  grid-template-rows: 45px 35px 1fr;
  grid-gap: 0px 10px; */
  display: flex;
  flex-direction: column;
`;

const Topbar = styled("div")`
  height: 45px;
  background: ${lighterDark};
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
`;

const FilterIcon = styled("span")`
  font-size: 16px;
  margin: 10px 10px 10px 0;
  cursor: pointer;
  color: ${props => (props.searching === "true" ? "#4c50d6" : "#7857f9")};
  display: ${props => (props.searching === "true" ? "none" : "block")};

  &:hover {
    color: #4c50d6;
  }
`;

const Filterbar = styled("div")`
  height: 35px;
  grid-template-columns: repeat(3, 1fr);
  display: ${props => (props.show === "true" ? "grid" : "none")};
  position: fixed;
  top: 45px;
  left: 0;
  right: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);

  & button {
    outline: 0;
    border: 0;
    background: ${darkBg};
    color: #eee;
    font-size: 14px;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 400;
    cursor: pointer;
    box-sizing: border-box;
    border-bottom: 2px solid transparent;
  }

  & button:hover {
    border-bottom: 2px solid #454af3;
  }
`;

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: "",
      searching: false,
      showFilters: false
    };
  }

  setSearchVisibility = searching => {
    this.setState({
      searching
    });
  };

  setFiltersVisibility = filtering => {
    this.setState({
      showFilters: filtering
    });
  };

  render() {
    return (
      <Container>
        <Topbar>
          <SearchBar
            setSearchVisibility={this.setSearchVisibility}
            setFiltersVisibility={this.setFiltersVisibility}
          />
          <FilterIcon
            onClick={() =>
              this.setState({ showFilters: !this.state.showFilters })
            }
            searching={this.state.searching ? "true" : "false"}
          >
            <FontAwesomeIcon icon={faFilter} />
          </FilterIcon>
        </Topbar>
        <Filterbar show={this.state.showFilters ? "true" : "false"}>
          <button>Active</button>
          <button>Completed</button>
          <button>Dropped</button>
        </Filterbar>
        <List
          showFilters={this.state.showFilters}
          searching={this.state.searching}
        />
      </Container>
    );
  }
}

export default App;
