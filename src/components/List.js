// @flow
import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import { IconAdd } from "./Icons";

import type { ListType } from "../Types";

type PropTypes = {
  data: ListType,
  addContact: Function,
  editContact: Function
};

const Container = styled.div`
  flex: 0 0 350px;
  width: 350px;
  margin-right: 40px;
  background: #ffffff;
  border: 1px solid #eff3f5;
  border-radius: 3px;
  box-shadow: 0 2px 10px 0 rgba(79, 100, 128, 0.06),
    0 6px 8px -6px rgba(79, 100, 128, 0.2);
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid #eff3f5;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #879aaa;
`;
const Count = styled.div`
  margin-left: 10px;
  font-size: 16px;
  color: #afbac3;
`;
const AddCard = styled.div`
  margin-left: auto;
  padding: 5px;
  transition: 0.2s all;
  opacity: 0.4;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
const Items = styled.div``;

const List = ({ data, addContact, editContact }: PropTypes) => {
  const { id, title, items } = data;
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Count>{items.length} persons</Count>
        <AddCard onClick={() => addContact(id)}>
          <IconAdd />
        </AddCard>
      </Header>
      <Items>
        {items.map((item, i) => (
          <Draggable key={item.id} draggableId={item.id} index={i}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Card
                  data={item}
                  isDragging={snapshot.isDragging}
                  editContact={editContact}
                  listId={id}
                />
                {provided.placeholder}
              </div>
            )}
          </Draggable>
        ))}
      </Items>
    </Container>
  );
};

export default List;
