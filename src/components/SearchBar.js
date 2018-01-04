import React, { Component } from "react";
import styled from "styled-components";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";
import faArrowLeft from "@fortawesome/fontawesome-free-solid/faArrowLeft";

const Bar = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
  flex: 1;
`;

const SearchIcon = styled("span")`
  font-size: 16px;
  margin: 10px;
  color: #4c50d6;
`;

const BackIcon = styled("span")`
  font-size: 18px;
  margin-right: 10px;
  color: #7857f9;
  display: ${props => (props.searching === "true" ? "block" : "none")};
  cursor: pointer;

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
`;

const Form = styled("form")`
  width: 100%;
  display: flex;
`;

class SearchBar extends Component {
  constructor() {
    super();
  }

  state = {
    fetchSearch: false,
    searchKeyword: ""
  };

  handleClick = e => {
    e.preventDefault();
    this.searchForm.reset();
    this.setState({
      fetchSearch: false,
      searchKeyword: ""
    });
    this.props.setSearchVisibility(false);
  };

  handleChange = e => {
    this.setState({
      searchKeyword: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      fetchSearch: true
    });
    this.props.setSearchVisibility(true);
    this.props.setFiltersVisibility(false);
    this.searchInput.blur();

    this.props.fetchSearch(this.state.searchKeyword);
  };

  render() {
    return (
      <Bar>
        <BackIcon
          onClick={this.handleClick}
          searching={this.state.fetchSearch ? "true" : "false"}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </BackIcon>
        <Form
          innerRef={input => (this.searchForm = input)}
          onSubmit={this.handleSubmit}
        >
          <SearchInput
            type="search"
            innerRef={input => (this.searchInput = input)}
            value={this.state.searchKeyword}
            placeholder="Search for a keyword..."
            onChange={this.handleChange}
            name="search"
          />
          <input type="submit" style={{ display: "none" }} />
        </Form>
      </Bar>
    );
  }
}

export default SearchBar;
