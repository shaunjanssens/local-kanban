// @flow
import type { ListType, ItemType, dndResultType } from "../Types";

export const getListIndex = (data: Array<ListType>, id: string): number => {
  return data && id ? data.findIndex(list => list.id === id) : -1;
};

export const getCardIndex = (data: Array<ItemType>, id: string): number => {
  return data && id ? data.findIndex(list => list.id === id) : -1;
};

export const getList = (data: Array<ListType>, id: string): ListType => {
  // $FlowFixMe
  return data.find(list => list.id === id);
};

export const reorder = (
  data: Array<ListType>,
  list: ListType,
  startIndex: number,
  endIndex: number
) => {
  if (list) {
    const itemIndex = getListIndex(data, list.id);
    const result = list.items;
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);
    data[itemIndex].items = result;
  }

  return data;
};

export const move = (
  data: Array<ListType>,
  source: ListType,
  destination: ListType,
  droppableSource: dndResultType,
  droppableDestination: dndResultType
) => {
  if (source && destination) {
    const sourceIndex = getListIndex(data, source.id);
    const sourceClone = Array.from(source.items);

    const destIndex = getListIndex(data, destination.id);
    const destClone = Array.from(destination.items);

    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    data[sourceIndex].items = sourceClone;
    data[destIndex].items = destClone;
  }
  return data;
};
