// @flow
export type ListType = {
  id: string,
  title: string,
  items: Array<ItemType>
};

export type ItemType = {
  id: string,
  picture: string,
  age: number,
  name: string,
  gender: string,
  email: string,
  phone: string,
  location: string
};
