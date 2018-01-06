import styled, { css } from "styled-components";

export const SeriesInfo = styled("section")`
  display: flex;
`;

export const Thumbnail = styled("div")`
  min-width: 110px;
  border-radius: 5px;
  overflow: hidden;
  background: url(${props => props.img});
  background-position: center center;
  background-size: cover;
  min-height: 156px;
`;

export const Title = styled("h1")`
  font-weight: 400;
  font-size: 16px;
  color: #eee;
`;

export const Type = styled("p")`
  font-size: 14px;
  font-weight: 400;
  color: #9094ff;
  margin-top: 2px;
`;

export const Button = styled("button")`
  border: 0;
  outline: 0;
  padding: 8px 15px;
  border-radius: 25px;
  margin-right: 10px;
  font-size: 13px;
  font-family: "Source Sans Pro", sans-serif;
  cursor: pointer;

  strong {
    font-weight: 600;
  }
`;

export const Message = styled("div")`
  color: #fff;
`;
