// @flow
import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  getListIndex,
  getCardIndex,
  getList,
  reorder,
  move
} from "../helpers/kanban";
import { isPositiveNumber } from "../helpers/number";
import { randomId } from "../helpers/random";
import List from "./List";
import EditCard from "./EditCard";

import type { ListType, ItemType } from "../Types";

import { fakeData } from "../data";

type PropTypes = {};
type StateTypes = {
  data: Array<ListType>,
  showModal: boolean,
  editListId: string,
  editCardId: string,
  editData: ?ItemType
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-y: scroll;
  min-height: 100vh;
  padding: 50px 40px 30px;

  &::after {
    position: fixed;
    content: "";
    display: block;
    width: 40px;
    height: 100vh;
    right: 0;
    top: 0;
    z-index: 10;
    background: linear-gradient(
      to left,
      rgba(251, 253, 254, 1),
      rgba(251, 253, 254, 0)
    );
  }
`;

export default class Board extends Component<PropTypes, StateTypes> {
  state = {
    data: [],
    showModal: false,
    editListId: "",
    editCardId: "",
    editData: null
  };

  componentWillMount = () => {
    this.setState({ data: this.getData() });
    document.body.style.backgroundColor = "#f0f5f7";
  };

  componentWillUnmount = () => {
    document.body.style.backgroundColor = null;
  };

  getData = () => {
    const localData = localStorage.getItem("board");
    return localData ? JSON.parse(localData) : fakeData;
  };

  saveDataToLocalstorage = (data: Array<ListType>) => {
    if (typeof Storage !== "undefined") {
      localStorage.setItem("board", JSON.stringify(data));
    }
  };

  onDragEnd = (result: any) => {
    const { source, destination } = result;
    const { data: oldData } = this.state;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const list = getList(oldData, source.droppableId);
      if (list) {
        const data = reorder(oldData, list, source.index, destination.index);

        this.setState({ data });
        this.saveDataToLocalstorage(data);
      }
    } else {
      const sourceList = getList(oldData, source.droppableId);
      const destinationList = getList(oldData, destination.droppableId);

      if (sourceList && destinationList) {
        const data = move(
          oldData,
          getList(oldData, source.droppableId),
          getList(oldData, destination.droppableId),
          source,
          destination
        );

        this.setState({ data });
        this.saveDataToLocalstorage(data);
      }
    }
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  addContact = (editListId: string) => {
    this.setState({ editListId }, () => {
      this.toggleModal();
    });
  };

  editContact = (
    editListId: string,
    editCardId: string,
    editData: ItemType
  ) => {
    this.setState({ editListId, editCardId, editData }, () => {
      this.toggleModal();
    });
  };

  saveContact = (contact: ItemType) => {
    const { editListId, editCardId } = this.state;
    let { data } = this.state;

    if (!editListId && !editCardId) {
      return;
    }

    const listIndex = getListIndex(data, editListId);
    const cardIndex = getCardIndex(data[listIndex].items, editCardId);

    if (isPositiveNumber(listIndex) && !isPositiveNumber(cardIndex)) {
      data[listIndex].items.push({
        ...contact,
        id: randomId(),
        lastUpdated: new Date().toString(),
        picture: "https://placeimg.com/100/100/people"
      });
    } else if (isPositiveNumber(listIndex) && isPositiveNumber(cardIndex)) {
      data[listIndex].items[cardIndex] = {
        ...contact,
        lastUpdated: new Date().toString()
      };
    }

    this.setState(
      { data, editData: null, editCardId: "", editListId: "" },
      () => {
        this.toggleModal();
        this.saveDataToLocalstorage(data);
      }
    );
  };

  render = () => {
    const { data, showModal, editData } = this.state;

    if (data.length > 0) {
      return (
        <Fragment>
          {showModal && (
            <EditCard
              initialData={editData}
              toggleModal={this.toggleModal}
              saveContact={this.saveContact}
            />
          )}
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Container>
              {data.map(list => (
                <Droppable key={list.id} droppableId={list.id}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef}>
                      <List
                        data={list}
                        addContact={this.addContact}
                        editContact={this.editContact}
                      />
                    </div>
                  )}
                </Droppable>
              ))}
            </Container>
          </DragDropContext>
        </Fragment>
      );
    } else {
      return null;
    }
  };
}
