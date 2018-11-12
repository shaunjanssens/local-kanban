// @flow
import React, { Component } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getListIndex, reorder, move } from "../helpers/kanban";
import List from "./List";

import type { ListType, ItemType } from "../Types";

import { fakeData } from "../data";

type PropTypes = {};
type StateTypes = {
  data: Array<ListType>
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-y: scroll;
  min-height: 100vh;
  padding: 50px 30px 30px;
  background: #fbfdfe;

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

export default class Board extends Component<PropTypes, StateTypes> {
  state = {
    data: fakeData
  };

  getList = (id: string) => {
    const { data } = this.state;
    const list = data.find(list => list.id === id);

    return list;
  };

  onDragEnd = (result: any) => {
    const { source, destination } = result;
    const { data: oldData } = this.state;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const data = reorder(
        oldData,
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      this.setState({ data });
    } else {
      const data = move(
        oldData,
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({ data });
    }
  };

  addCard = (id: string) => {
    const { data } = this.state;
    const index = getListIndex(data, id);

    console.log("Add new item");
  };

  editCard = (data: ItemType) => {
    console.log("Edit item");
  };

  render = () => {
    const { data } = this.state;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {data.map(list => (
            <Droppable key={list.id} droppableId={list.id}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  <List
                    data={list}
                    addCard={this.addCard}
                    editCard={this.editCard}
                  />
                </div>
              )}
            </Droppable>
          ))}
        </Container>
      </DragDropContext>
    );
  };
}
