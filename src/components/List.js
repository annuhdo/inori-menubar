import React, { Component } from "react";
import styled from "styled-components";
import InfoCard from "./InfoCard";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Message } from "../styles";

const Container = styled("section")`
  overflow: auto;
  margin-top: ${props => (props.showFilters === "true" ? "80px" : "45px")};
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
      return <Message>Loading...</Message>;
    } else if (error) {
      return <Message>Error!</Message>;
    } else if (!seriesList) {
      return <Message>Not found :(</Message>;
    } else {
      return (
        <Container showFilters={showFilters ? "true" : "false"}>
          {seriesList.map(each => <InfoCard key={each["id"]} info={each} />)}
        </Container>
      );
    }
  }
}

export const ListQuery = gql`
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

export default graphql(ListQuery, {
  options: ({ userStatus }) => ({ variables: { userStatus } })
})(List);
