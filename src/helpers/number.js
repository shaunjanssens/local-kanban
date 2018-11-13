// @flow
export const isPositiveNumber = (number: any): boolean => {
  return (
    typeof number === typeof 1 &&
    null !== number &&
    isFinite(number) &&
    number > -1
  );
};
