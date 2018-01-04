import React, { Component } from "react";
import styled from "styled-components";
import InfoCard from "./InfoCard";
import SearchCard from "./SearchCard";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const Container = styled("section")`
  overflow: auto;
  margin-top: ${props => (props.showFilters === "true" ? "80px" : "45px")};
`;

const Loading = styled("div")`
  color: #fff;
`;

// We use the gql tag to parse our query string into a query document
const SearchQuery = gql`
  query SearchQuery($keyword: String!) {
    search(keyword: $keyword) {
      id
      type
      title
      image_url
      subtype
      episodes
      youtubeVideoId
    }
  }
`;

class List extends Component {
  constructor() {
    super();
  }

  state = {
    keyword: ""
  };

  componentWillMount() {
    // Refetch with new parameter if user types another search query
    const { refetch } = this.props.data;
    if (this.props.keyword != this.state.keyword) {
      this.setState({ keyword: this.props.keyword });
      refetch(SearchQuery, {
        options: ({ keyword }) => ({ variables: { keyword } })
      });
    }
  }

  render() {
    const { loading, error, search } = this.props.data;
    if (loading) {
      return <Loading>Loading...</Loading>;
    } else if (error) {
      return <p>Error!</p>;
    } else {
      return (
        <Container showFilters={this.props.showFilters ? "true" : "false"}>
          {this.props.searching
            ? search.map(each => <SearchCard key={each["id"]} info={each} />)
            : [<InfoCard key="1" />, <InfoCard key="2" />]}
        </Container>
      );
    }
  }
}

export default graphql(SearchQuery, {
  options: ({ keyword }) => ({ variables: { keyword } })
})(List);
