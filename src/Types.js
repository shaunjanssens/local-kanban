// @flow
export type ListType = {
  id: string,
  title: string,
  items: Array<ItemType>
};

export type ItemType = {
  id: string,
  picture: string,
  age: string,
  name: string,
  gender: string,
  email: string,
  phone: string,
  location: string,
  notes: string,
  lastUpdated: string
};

export type dndResultType = {
  droppableId: string,
  index: number
};
