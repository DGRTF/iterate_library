import getArray, { getEmptyArray } from "./commonForTests/getArray";

it.each([
  [getArray(), 1, false],
  [getEmptyArray(), 0, true],
])('enumerableFirstFluent', (array: ReturnType<typeof getArray>, expectedResultWas: number, expectedResultNotWas: boolean) => {
  let resultWas = 0;
  let resultNotWas = false;

  array
    .enumerableFirstFluent()
    .IfFound(x => resultWas = x.rating)
    .IfNotFound(() => resultNotWas = true);

  expect(resultWas).toBe(expectedResultWas);
  expect(resultNotWas).toBe(expectedResultNotWas);
});

it.each([
  [getArray(), 1, false],
  [getEmptyArray(), 0, true],
])('enumerableFirstFluent', (array: ReturnType<typeof getArray>, expectedResultWas: number, expectedResultNotWas: boolean) => {
  let resultWas = 0;
  let resultNotWas = false;

  array
    .enumerableFirstFluent()
    .IfNotFound(() => resultNotWas = true)
    .IfFound(x => resultWas = x.rating);

  expect(resultWas).toBe(expectedResultWas);
  expect(resultNotWas).toBe(expectedResultNotWas);
});
