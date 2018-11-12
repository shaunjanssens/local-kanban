// @flow
import React, { Component } from "react";
import styled from "styled-components";
import Board from "./components/Board";

type PropTypes = {};
type StateTypes = {};

const Container = styled.div``;

export default class App extends Component<PropTypes, StateTypes> {
  render() {
    return (
      <Container>
        <Board />
      </Container>
    );
  }
}
