// @flow
import React, { Component } from "react";
import styled from "styled-components";
import List from "./List";

import { data } from "../data";

type PropTypes = {};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-y: scroll;
  min-height: 100vh;
  padding: 50px 30px 30px;
  background: #f6f6f6;

  &::after {
    position: fixed;
    content: "";
    display: block;
    width: 120px;
    height: 100vh;
    right: 0;
    top: 0;
    z-index: 10;
    background: linear-gradient(
      to left,
      rgba(246, 246, 246, 1),
      rgba(246, 246, 246, 0)
    );
  }
`;

export default class Board extends Component<PropTypes> {
  render = () => {
    return (
      <Container>
        {data.map(list => (
          <List key={list.id} data={list} />
        ))}
      </Container>
    );
  };
}
