import { addIterableMethodsInArray } from ".";


test('enumerableGroupToArray', () => {
  const inventory = addIterableMethodsInArray([
    { name: "asparagus", type: "vegetables", quantity: 9 },
    { name: "bananas", type: "fruit", quantity: 5 },
    { name: "goat", type: "meat", quantity: 9 },
    { name: "cherries", type: "fruit", quantity: 5 },
    { name: "fish", type: "meat", quantity: 22 },
  ]);
  const w = inventory.enumerableGroupToArray(({ quantity }) => quantity).enumerableToArray();

  expect(w).toEqual([
    [9, [
      { name: "asparagus", type: "vegetables", quantity: 9 },
      { name: "goat", type: "meat", quantity: 9 },
    ],
    ],
    [5, [
      { name: "bananas", type: "fruit", quantity: 5 },
      { name: "cherries", type: "fruit", quantity: 5 },
    ],
    ],
    [22, [
      { name: "fish", type: "meat", quantity: 22 },
    ],
    ],
  ]);
});