// @flow
import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { IconAdd } from "./Icons";

import type { ListType } from "../Types";

type PropTypes = {
  data: ListType
};

const Container = styled.div`
  flex: 0 0 350px;
  width: 350px;
  margin-right: 40px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  opacity: 0.4;
`;
const AddCard = styled.div``;
const Items = styled.div``;

const List = ({ data }: PropTypes) => {
  const { id, name, disabled, items } = data;
  return (
    <Container>
      <Header>
        <Title>{name}</Title>
        <AddCard>
          <IconAdd style={{ opacity: 0.4 }} />
        </AddCard>
      </Header>
      <Items>
        {items.map(item => (
          <Card key={item.id} data={item} />
        ))}
      </Items>
    </Container>
  );
};

export default List;
