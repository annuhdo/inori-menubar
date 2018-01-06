import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";
import { withApollo, graphql } from "react-apollo";
import gql from "graphql-tag";
import { SeriesInfo, Thumbnail, Title, Type, Button } from "../styles";

const Container = styled("div")`
  padding: 10px 20px 10px 20px;
  padding-right: 20px;
`;

const SearchThumbnail = styled(Thumbnail)`
  min-width: 80px;
  min-height: 115px;
`;

const Info = styled("div")`
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SearchType = styled("div")`
  flex: 1;
`;

const ActionBtn = styled(Button)`
  margin-top: 10px;
  background: ${props => (props.watching === "true" ? "#242552" : "#2024a4")};
  color: #fff;
  font-size: 13px;
  cursor: ${props => (props.watching === "true" ? "initial" : "pointer")};

  &:hover {
    background: ${props => (props.watching === "true" ? "$242552" : "#272cda")};
  }
`;

const Episode = styled("span")`
  margin-left: 20px;
`;

class SearchCard extends Component {
  constructor() {
    super();
  }

  state = {
    openEditBtns: false,
    watching: false
  };

  componentDidMount() {
    const { info } = this.props;
    const { store } = this.props.client;
    const listCache = store.cache.data.data.ROOT_QUERY;
    const watchingList = listCache['seriesList({"userStatus":1})'];

    watchingList.map(series => {
      const id = series.id.split(":")[1];

      if (info.id === id) {
        this.setState({
          watching: true
        });
      }
    });
  }

  onClick = async (action, input) => {
    if (!this.props.watching) {
      switch (action) {
        case "add":
          await this.props.addSeriesMutation({
            variables: input
          });
          this.setState({
            watching: !this.state.watching
          });
          break;
        default:
          break;
      }
    }
  };

  render() {
    const { info } = this.props;

    return (
      <Container showEdit={this.state.openEditBtns ? "true" : "false"}>
        <SeriesInfo>
          <SearchThumbnail img={info.image_url} />
          <Info>
            <Title>{info.title}</Title>
            <Type>
              TV
              <Episode>{info.episodes} Episodes</Episode>
            </Type>
            <ActionBtn
              watching={this.state.watching ? "true" : "false"}
              onClick={() =>
                this.onClick("add", { ...info, userStatus: 1, watchedEps: 1 })
              }
            >
              {this.state.watching ? "Watching" : "Add to Watching"}
            </ActionBtn>
          </Info>
        </SeriesInfo>
      </Container>
    );
  }
}

// We use the gql tag to parse our query string into a query document
const AddMutation = gql`
  mutation AddMutation(
    $id: String!
    $type: String
    $title: String
    $jp_title: String
    $url: String
    $image_url: String
    $synopsis: String
    $startDate: String
    $endDate: String
    $ageRating: String
    $subtype: String
    $status: String
    $episodes: Int
    $youtubeVideoId: String
    $userStatus: Int
    $watchedEps: Int
  ) {
    addSeries(
      id: $id
      type: $type
      title: $title
      jp_title: $jp_title
      url: $url
      image_url: $image_url
      synopsis: $synopsis
      startDate: $startDate
      endDate: $endDate
      ageRating: $ageRating
      subtype: $subtype
      status: $status
      episodes: $episodes
      youtubeVideoId: $youtubeVideoId
      userStatus: $userStatus
      watchedEps: $watchedEps
    )
  }
`;

export default withApollo(
  graphql(AddMutation, { name: "addSeriesMutation" })(SearchCard)
);
