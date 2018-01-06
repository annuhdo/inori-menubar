import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faMinus from "@fortawesome/fontawesome-free-solid/faMinus";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";

const shortenString = (s, limit) => {
  return `${s.substring(0, limit - 3)}...`;
};

const Container = styled("div")`
  padding: 10px 20px 10px 20px;
  padding-right: ${props => (props.showEdit === "true" ? "0" : "20px")};

  &:hover {
    padding-right: 0;
  }
`;

const SeriesInfo = styled("section")`
  display: flex;
`;

const Thumbnail = styled("div")`
  width: 110px;
  border-radius: 5px;
  overflow: hidden;
  background: url(${props => props.img});
  background-position: center center;
  background-size: cover;
  min-height: 156px;
`;

const Info = styled("div")`
  flex: 1;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled("h1")`
  font-weight: 400;
  font-size: 16px;
  color: #eee;
`;

const Type = styled("p")`
  font-size: 14px;
  font-weight: 400;
  color: #9094ff;
  margin-top: 2px;
`;

const Synopsis = styled("section")`
  margin-top: 5px;
  flex: 1;
`;

const Episodes = styled("section")`
  font-weight: 400;
  display: flex;
  align-items: center;
  display: ${props => (props.userStatus === 1 ? "block" : "none")};
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

  &:hover {
    color: #3f2f7c;
  }
`;

const Dec = styled(Inc)`
  right: 0;
`;

const Episode = styled("div")`
  display: inline;
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

  button {
    border: 0;
    outline: 0;
    padding: 8px 15px;
    border-radius: 25px;
    margin-right: 10px;
    font-size: 13px;
    font-family: "Source Sans Pro", sans-serif;
    cursor: pointer;
  }

  strong {
    font-weight: 600;
  }
`;

const ActionBtns = styled("div")`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 10px;

  button {
    background: #2024a4;
    color: #fff;
  }

  button:hover {
    background: #272cda;
  }
`;

const RemoveBtn = styled("div")`
  display: grid;
  grid-template-columns: 1fr;

  button {
    background: #a839b9;
    color: #fff;
  }

  button:hover {
    background: #d0021b;
  }
`;

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

class InfoCard extends Component {
  constructor() {
    super();
  }

  state = {
    openEditBtns: false,
    confirmRemoval: false
  };

  onClick = async (action, input) => {
    switch (action) {
      case "remove":
        await this.props.removeSeriesMutation({
          variables: {
            id: input
          }
        });
        break;
      case "update":
        await this.props.updateSeriesMutation({
          variables: input
        });
        break;
      default:
        break;
    }
    this.props.refetchQuery();
  };

  render() {
    const { info } = this.props;
    return (
      <Container showEdit={this.state.openEditBtns ? "true" : "false"}>
        <SeriesInfo onClick={() => this.setState({ confirmRemoval: false })}>
          <Thumbnail img={info.image_url} />
          <Info>
            <Title>{info.title}</Title>
            <Type>TV</Type>
            <Synopsis>{shortenString(info.synopsis, 100)}</Synopsis>
            <Episodes userStatus={info.userStatus}>
              Watching{" "}
              <Controls>
                <Dec
                  onClick={() =>
                    this.onClick("update", {
                      ...info,
                      watchedEps: info.watchedEps - 1
                    })
                  }
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
                  <button
                    key={index}
                    onClick={() =>
                      this.onClick("update", { ...info, userStatus: index + 1 })
                    }
                  >
                    Move to <strong>{status}</strong>
                  </button>
                );
              }
            })}
          </ActionBtns>
          <RemoveBtn>
            <button
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
            </button>
          </RemoveBtn>
        </Buttons>
      </Container>
    );
  }
}

export default compose(
  graphql(RemoveMutation, { name: "removeSeriesMutation" }),
  graphql(UpdateMutation, { name: "updateSeriesMutation" })
)(InfoCard);
