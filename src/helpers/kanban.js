export const getListIndex = (data, id) => {
  return data.findIndex(list => list.id === id);
};

export const reorder = (data, list, startIndex, endIndex) => {
  const itemIndex = getListIndex(data, list.id);
  const result = list.items;
  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);
  data[itemIndex].items = result;

  return data;
};

export const move = (
  data,
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  const sourceIndex = getListIndex(data, source.id);
  const sourceClone = Array.from(source.items);

  const destIndex = getListIndex(data, destination.id);
  const destClone = Array.from(destination.items);

  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  data[sourceIndex].items = sourceClone;
  data[destIndex].items = destClone;

  return data;
};
