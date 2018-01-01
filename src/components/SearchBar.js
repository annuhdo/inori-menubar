import React, { Component } from "react";
import styled from "styled-components";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";

const Bar = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  color: ${props => (props.fetching === "true" ? "#4c50d6" : "#7857f9")};

  &:hover {
    color: #4c50d6;
  }
`;

const SearchInput = styled("input")`
  flex: 1;
  padding: 5px 10px;
  background: #1d2444;
  color: #eee;
  font-size: 16px;
  font-family: "Source Sans Pro", sans-serif;
  border: 0;
  outline: 0;
  border-radius: 20px;
  font-weight: 400;
  opacity: ${props => (props.isVisible === "true" ? "1" : "0")};
`;

class SearchBar extends Component {
  constructor() {
    super();
  }

  state = {
    fetchSearch: false
  };

  render() {
    return (
      <Bar>
        <SearchIcon
          icon={faSearch}
          onClick={() =>
            this.setState({ fetchSearch: !this.state.fetchSearch })
          }
          fetching={this.state.fetchSearch ? "true" : "false"}
        />
        <SearchInput
          type="search"
          isVisible={this.state.fetchSearch ? "true" : "false"}
        />
      </Bar>
    );
  }
}

export default SearchBar;
