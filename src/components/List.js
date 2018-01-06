import React, { Component } from "react";
import styled from "styled-components";
import InfoCard from "./InfoCard";
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
const ListQuery = gql`
  query ListQuery($userStatus: Int!) {
    seriesList(userStatus: $userStatus) {
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

class List extends Component {
  constructor() {
    super();
  }

  state = {
    userStatus: 1
  };

  refetchQuery = (refetch = this.props.data.refetch) => {
    refetch(ListQuery, {
      options: ({ userStatus }) => ({ variables: { userStatus } })
    });
  };

  newStatus = userStatus => {
    this.setState({
      userStatus
    });
  };

  componentWillReceiveProps(nextProps) {
    // if (this.state.userStatus !== nextProps.userStatus) {
    // Refetch with new parameter if user changes selection
    const { refetch } = nextProps.data;
    // if (nextProps.userStatus !== this.state.userStatus) {
    this.newStatus(nextProps.userStatus);
    this.refetchQuery(refetch);
    // }
  }

  render() {
    const { loading, error, seriesList } = this.props.data;
    const { showFilters, userStatus } = this.props;
    if (loading) {
      return <Loading>Loading...</Loading>;
    } else if (error) {
      return <p>Error!</p>;
    } else if (!seriesList) {
      return <p>Not found :(</p>;
    } else {
      return (
        <Container showFilters={showFilters ? "true" : "false"}>
          {seriesList.map(each => (
            <InfoCard
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

export default graphql(ListQuery, {
  options: ({ userStatus }) => ({ variables: { userStatus } })
})(List);
