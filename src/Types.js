// @flow
export type ListType = {
  id: string,
  name: string,
  disabled?: boolean,
  items: Array<ItemType>
};

export type ItemType = {
  id: string,
  content: string
};
