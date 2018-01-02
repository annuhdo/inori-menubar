import React, { Component } from "react";
import styled from "styled-components";
import InfoCard from "./InfoCard";
import SearchCard from "./SearchCard";

const Container = styled("section")`
  overflow: auto;
  margin-top: ${props => (props.showFilters === "true" ? "80px" : "45px")};
`;

class List extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container showFilters={this.props.showFilters ? "true" : "false"}>
        {this.props.searching
          ? [
              <SearchCard key="1" status="watching" />,
              <SearchCard key="2" status="completed" />
            ]
          : [<InfoCard key="1" />, <InfoCard key="2" />]}
      </Container>
    );
  }
}

export default List;
