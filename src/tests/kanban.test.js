import { getListIndex, getCardIndex, getList } from "../helpers/kanban";

import {
  getListIndexData,
  getCardIndexData,
  getListData,
  getListDataExpect
} from "./kanban.data";

it("getListIndex", () => {
  expect(getListIndex(getListIndexData, "aaa")).toEqual(0);
  expect(getListIndex(getListIndexData, "bbb")).toEqual(1);
});

it("getCardIndex", () => {
  expect(getCardIndex(getCardIndexData, "aaa")).toEqual(0);
  expect(getCardIndex(getCardIndexData, "bbb")).toEqual(1);
});

it("getList", () => {
  expect(getList(getListData, "aaa")).toEqual(getListDataExpect);
});
