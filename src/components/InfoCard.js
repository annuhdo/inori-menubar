import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faMinus from "@fortawesome/fontawesome-free-solid/faMinus";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import { ListQuery } from "./List";
import { SeriesInfo, Thumbnail, Title, Type, Button } from "../styles";

const shortenString = (s, limit) => {
  if (s.length <= limit) {
    return s;
  }
  return `${s.substring(0, limit - 3)}...`;
};

const Container = styled("div")`
  padding: 10px 20px 10px 20px;
  padding-right: ${props => (props.showEdit === "true" ? "0" : "20px")};

  &:hover {
    padding-right: 0;
  }
`;

const Info = styled("div")`
  flex: 1;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
`;

const Synopsis = styled("section")`
  margin-top: 5px;
  flex: 1;
`;

const Episodes = styled("section")`
  font-weight: 400;
  display: flex;
  align-items: center;
`;

const Controls = styled("span")`
  font-size: 14px;
  margin-left: 5px;
  position: relative;
`;

const Inc = styled("div")`
  display: inline-block;
  margin: auto;
  cursor: pointer;
  font-size: 15px;
  color: #7857f9;
  padding: 0 10px;
  display: ${props => (props.userStatus === 1 ? "inline-block" : "none")};

  &:hover {
    color: #3f2f7c;
  }
`;

const Dec = styled(Inc)`
  right: 0;
`;

const Episode = styled("div")`
  display: inline-block;
  background: #454af3;
  color: #fff;
  font-size: 16px;
  padding: 5px 10px 7px;
  border-radius: 50px;
  margin: 0;
`;

const EditBtn = styled("button")`
  outline: none;
  border: 0;
  background: ${props => props.backgroundColor};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: ${props => (props.stayVisible === "true" ? "block" : "none")};
  width: 50px;

  ${SeriesInfo}:hover & {
    display: block;
  }

  &:hover {
    background: #272cda;
  }
`;

const Buttons = styled("div")`
  display: flex;
  margin: 20px 10px 5px 0;
  display: ${props => props.show};
`;

const ActionBtns = styled("div")`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 10px;
`;

const InfoButton = styled(Button)`
  background: #2024a4;
  color: #fff;

  &:hover {
    background: #272cda;
  }
`;

const RemoveBtn = styled("div")`
  display: grid;
  grid-template-columns: 1fr;

  button {
    background: #b50218;
  }

  button:hover {
    background: #d0021b;
  }
`;

class InfoCard extends Component {
  constructor() {
    super();
  }

  state = {
    openEditBtns: false,
    confirmRemoval: false
  };

  onClick = async (action, input) => {
    const { userStatus } = this.props.info;
    switch (action) {
      case "remove":
        await this.props.removeSeriesMutation({
          variables: {
            id: input
          },
          refetchQueries: [
            {
              query: ListQuery,
              variables: {
                userStatus
              }
            }
          ]
        });
        break;
      case "update":
        await this.props.updateSeriesMutation({
          variables: input,
          refetchQueries: [
            {
              query: ListQuery,
              variables: {
                userStatus
              }
            }
          ]
        });
        break;
      default:
        break;
    }
    // this.props.refetchQuery();
  };

  render() {
    const { info } = this.props;
    return (
      <Container showEdit={this.state.openEditBtns ? "true" : "false"}>
        <SeriesInfo onClick={() => this.setState({ confirmRemoval: false })}>
          <Thumbnail img={info.image_url} />
          <Info>
            <Title>{shortenString(info.title, 60)}</Title>
            <Type>TV</Type>
            <Synopsis>{shortenString(info.synopsis, 90)}</Synopsis>
            <Episodes>
              {info.userStatus === 1 ? "Watching" : "Watched"}
              <Controls>
                <Dec
                  onClick={() =>
                    this.onClick("update", {
                      ...info,
                      watchedEps: info.watchedEps - 1
                    })
                  }
                  userStatus={info.userStatus}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Dec>
                <Episode>
                  {info.watchedEps} {info.episodes ? " /" : ""} {info.episodes}
                </Episode>{" "}
                <Inc
                  onClick={() =>
                    this.onClick("update", {
                      ...info,
                      watchedEps: info.watchedEps + 1
                    })
                  }
                  userStatus={info.userStatus}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Inc>
              </Controls>
            </Episodes>
          </Info>
          <EditBtn
            onClick={() =>
              this.setState({ openEditBtns: !this.state.openEditBtns })
            }
            backgroundColor={this.state.openEditBtns ? "#262767" : "#2024a4"}
            stayVisible={this.state.openEditBtns ? "true" : "false"}
          >
            {this.state.openEditBtns ? "Close" : "Edit"}
          </EditBtn>
        </SeriesInfo>
        <Buttons show={this.state.openEditBtns ? "block" : "none"}>
          <ActionBtns>
            {["Watching", "Completed", "Dropped"].map((status, index) => {
              if (index !== info.userStatus - 1) {
                return (
                  <InfoButton
                    key={index}
                    onClick={() =>
                      this.onClick("update", { ...info, userStatus: index + 1 })
                    }
                  >
                    Move to <strong>{status}</strong>
                  </InfoButton>
                );
              }
            })}
          </ActionBtns>
          <RemoveBtn>
            <InfoButton
              onClick={() =>
                !this.state.confirmRemoval
                  ? this.setState({ confirmRemoval: true })
                  : this.onClick("remove", info.id)
              }
            >
              <strong>
                {this.state.confirmRemoval
                  ? "Are you sure about removing?"
                  : "Remove"}
              </strong>
            </InfoButton>
          </RemoveBtn>
        </Buttons>
      </Container>
    );
  }
}

const RemoveMutation = gql`
  mutation RemoveMutation($id: String!) {
    removeSeries(id: $id)
  }
`;

const UpdateMutation = gql`
  mutation UpdateMutation(
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
    updateSeries(
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

export default compose(
  graphql(RemoveMutation, { name: "removeSeriesMutation" }),
  graphql(UpdateMutation, { name: "updateSeriesMutation" })
)(InfoCard);
