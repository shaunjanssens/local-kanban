// @flow
import React from "react";
import styled from "styled-components";

import type { ItemType } from "../Types";

type PropTypes = {
  data: ItemType
};

const Container = styled.div`
  margin-bottom: 20px;
  padding: 15px 20px;
  background: #ffffff;
  box-shadow: 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
`;
const Content = styled.div`
  font-size: 15px;
  line-height: 1.66;
  opacity: 0.6;
`;

const Card = ({ data }: PropTypes) => {
  return (
    <Container>
      <Content>{data.content}</Content>
    </Container>
  );
};

export default Card;
