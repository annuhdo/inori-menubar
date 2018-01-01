import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";
import LeftIcon from "../assets/icons/left-arrow.svg";

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
`;

const Controls = styled("span")`
  font-size: 14px;
  margin-left: 10px;
  position: relative;
`;

const Inc = styled("div")`
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
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
  margin: 0 20px;
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

const ActionBtns = styled("div")`
  display: flex;
  margin: 20px 10px 5px 0;
  display: ${props => props.show};

  button {
    border: 0;
    outline: 0;
    padding: 10px 15px;
    border-radius: 25px;
    margin-right: 10px;
    font-size: 13px;
    font-family: "Source Sans Pro", sans-serif;
    cursor: pointer;
  }

  button:nth-child(1),
  button:nth-child(2) {
    background: #2024a4;
    color: #fff;
  }

  button:nth-child(1):hover,
  button:nth-child(2):hover {
    background: #272cda;
  }

  button:nth-child(3) {
    background: #a839b9;
    color: #fff;
  }

  button:nth-child(3):hover {
    background: #d0021b;
  }

  strong {
    font-weight: 600;
  }
`;

class Card extends Component {
  constructor() {
    super();
  }

  state = {
    openEditBtns: false
  };

  render() {
    return (
      <Container showEdit={this.state.openEditBtns ? "true" : "false"}>
        <SeriesInfo>
          <Thumbnail img="https://media.kitsu.io/anime/poster_images/11614/medium.jpg?1496075336" />
          <Info>
            <Title>Kimi no na wa.</Title>
            <Type>TV</Type>
            <Synopsis>
              From director Makoto Shinkai, the innovative mind behind Voices of
              a Distant Star and 5 Centimeters Per Second, comes...
            </Synopsis>
            <Episodes>
              Watching{" "}
              <Controls>
                <Inc>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="20"
                    viewBox="0 0 14 26"
                  >
                    <polyline
                      fill="none"
                      stroke="#7857F9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      points="-6 19 4.395 9 16 19"
                      transform="rotate(-90 5.5 12.5)"
                    />
                  </svg>
                </Inc>
                <Episode>3/24</Episode>{" "}
                <Dec>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="20"
                    viewBox="0 0 14 26"
                  >
                    <polyline
                      fill="none"
                      stroke="#7857F9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      points="92 19 102.395 9 114 19"
                      transform="rotate(90 55.5 -34.5)"
                    />
                  </svg>
                </Dec>
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
        <ActionBtns show={this.state.openEditBtns ? "block" : "none"}>
          <button>
            Move to <strong>Complete</strong>
          </button>
          <button>
            Move to <strong>Dropped</strong>
          </button>
          <button onClick={() => console.log("are you sure")}>
            <strong>Remove</strong>
          </button>
        </ActionBtns>
      </Container>
    );
  }
}

export default Card;
