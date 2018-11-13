import { isPositiveNumber } from "../helpers/number";

it("isPositiveNumber", () => {
  expect(isPositiveNumber(0)).toEqual(true);
  expect(isPositiveNumber(1)).toEqual(true);
  expect(isPositiveNumber(null)).toEqual(false);
  expect(isPositiveNumber(-1)).toEqual(false);
  expect(isPositiveNumber("test")).toEqual(false);
  expect(isPositiveNumber({})).toEqual(false);
});
