// @flow
export const randomId = () => {
  return Math.random()
    .toString(32)
    .replace(/[^a-z]+/g, "");
};
