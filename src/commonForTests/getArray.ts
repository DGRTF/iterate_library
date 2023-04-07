import { addIterableMethodsInArray } from "..";

export interface IRating {
  rating: number;
}

interface INumbers {
  numbers: number[];
}

export interface IRatingNumbers extends IRating, INumbers { }

export default () => addIterableMethodsInArray([
  {
    rating: 1,
    numbers: [1, 11, 111],
  },
  {
    rating: 2,
    numbers: [2, 22, 222],
  },
  {
    rating: 3,
    numbers: [3, 33, 333],
  },
  {
    rating: 4,
    numbers: [4, 44, 444],
  },
  {
    rating: 5,
    numbers: [5, 55, 555],
  },
]);

export const getEmptyArray = () => addIterableMethodsInArray<IRatingNumbers>([]);
