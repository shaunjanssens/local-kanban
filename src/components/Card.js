// @flow
import React, { Component } from "react";
import styled from "styled-components";

import { IconEdit } from "./Icons";

import type { ItemType } from "../Types";

type PropTypes = {
  data: ItemType,
  isDragging: boolean,
  editContact: Function,
  listId: string
};
type StateTypes = {};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background: #ffffff;
  border-bottom: 1px solid #eef3f5;

  ${props => {
    if (props.isDragging) {
      return `
        box-shadow: 0 2px 10px 0 rgba(79, 100, 128, 0.06),
        0 6px 8px -6px rgba(79, 100, 128, 0.2);
      `;
    }
  }};
`;
const Picture = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 50%;
  background: url(${props => props.background}) no-repeat;
  background-size: contain;
`;
const Content = styled.div`
  flex: 1;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Name = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #879aaa;
  margin-bottom: 8px;
`;
const Edit = styled.div`
  padding: 5px;
  transition: 0.2s all;
  opacity: 0.4;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
const Meta = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;
const MetaItem = styled.div`
  font-size: 12px;
  line-height: 12px;
  font-weight: 500;
  color: #afbac3;
  margin-right: 15px;

  &:last-child {
    margin-right: 0;
  }
`;

export default class Card extends Component<PropTypes, StateTypes> {
  render = () => {
    const { data, isDragging, editContact, listId } = this.props;
    const { id, picture, age, name, gender, location } = data;

    return (
      <Container isDragging={isDragging}>
        <Picture background={picture} />
        <Content>
          <Title>
            <Name>{name}</Name>
            <Edit onClick={() => editContact(listId, id, data)}>
              <IconEdit />
            </Edit>
          </Title>
          <Meta>
            {age && <MetaItem>{age} year old</MetaItem>}
            {gender && <MetaItem>{gender}</MetaItem>}
            {location && <MetaItem>{location}</MetaItem>}
          </Meta>
        </Content>
      </Container>
    );
  };
}
