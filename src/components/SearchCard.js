import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faMinus from "@fortawesome/fontawesome-free-solid/faMinus";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";

const Container = styled("div")`
  padding: 10px 20px 10px 20px;
  padding-right: 20px;
`;

const SeriesInfo = styled("section")`
  display: flex;
`;

const Thumbnail = styled("div")`
  width: 80px;
  border-radius: 5px;
  overflow: hidden;
  background: url(${props => props.img});
  background-position: center center;
  background-size: cover;
  min-height: 115px;
`;

const Info = styled("div")`
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled("h1")`
  font-weight: 400;
  font-size: 16px;
  color: #eee;
`;

const Type = styled("div")`
  font-size: 14px;
  font-weight: 400;
  color: #9094ff;
  margin-top: 2px;
  flex: 1;
`;

const Trailer = styled("p")``;

const Synopsis = styled("section")`
  margin-top: 5px;
  flex: 1;
`;

const ActionBtn = styled("button")`
  padding: 8px 15px;
  border-radius: 25px;
  background: ${props => (props.status === "watching" ? "#242552" : "#2024a4")};
  color: #fff;
  font-size: 13px;
  font-family: "Source Sans Pro", sans-serif;
  border: 0;
  outline: 0;
  cursor: ${props => (props.status === "watching" ? "initial" : "pointer")};

  &:hover {
    background: ${props =>
      props.status === "watching" ? "$242552" : "#272cda"};
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
    openEditBtns: false
  };

  render() {
    const { info } = this.props;
    return (
      <Container showEdit={this.state.openEditBtns ? "true" : "false"}>
        <SeriesInfo>
          <Thumbnail img={info.image_url} />
          <Info>
            <Title>{info.title}</Title>
            <Type>
              TV
              <Episode>{info.episodes} Episodes</Episode>
            </Type>
            <ActionBtn status={this.props.status}>
              {this.props.status === "watching"
                ? "Watching"
                : "Add to Watching"}
            </ActionBtn>
          </Info>
        </SeriesInfo>
      </Container>
    );
  }
}

export default SearchCard;
