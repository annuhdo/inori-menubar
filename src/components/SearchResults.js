import React, { Component } from "react";
import styled from "styled-components";
import SearchCard from "./SearchCard";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Message } from "../styles";

const Container = styled("section")`
  overflow: auto;
  margin-top: 45px;
`;

class SearchResults extends Component {
  constructor() {
    super();
  }

  state = {
    keyword: ""
  };

  refetchQuery = (refetch = this.props.data.refetch) => {
    refetch(SearchQuery, {
      options: ({ keyword }) => ({ variables: { keyword } })
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.keyword !== this.state.keyword && this.state.keyword !== "") {
      // Refetch with new parameter if user types another search query
      const { refetch } = nextProps.data;
      this.setState({ keyword: nextProps.keyword });
      this.refetchQuery(refetch);
    }
  }

  render() {
    const { loading, error, search } = this.props.data;
    const { searching } = this.props;
    if (loading) {
      return <Message>Loading...</Message>;
    } else if (error) {
      return <Message>Error!</Message>;
    } else if (!search) {
      return <Message>Not found :(</Message>;
    } else {
      return (
        <Container>
          {searching &&
            search.map(each => (
              <SearchCard
                key={each["id"]}
                info={each}
                refetchQuery={this.refetchQuery}
              />
            ))}
        </Container>
      );
    }
  }
}

const SearchQuery = gql`
  query SearchQuery($keyword: String!) {
    search(keyword: $keyword) {
      id
      type
      title
      image_url
      synopsis
      subtype
      episodes
      watchedEps
      userStatus
    }
  }
`;

export default graphql(SearchQuery, {
  options: ({ keyword }) => ({ variables: { keyword } })
})(SearchResults);
