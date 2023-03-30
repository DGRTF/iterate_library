import checkThatValueType from "./checkThatValue";

test('checkThatValue', () => {
  const func = x => x;
  const numberResult = checkThatValueType(5).isNumber().isNotNaN();
  const secondNumberResult = checkThatValueType(5).isNotNaN().isNumber();
  const booleanResult = checkThatValueType(true).isBoolean();
  const functionResult = checkThatValueType(func).isFunction();
  const checkTypeOfCoupleValuesResult = checkThatValueType(6).isEqualTypeOf(5678);

  expect(numberResult).toBe(5);
  expect(secondNumberResult).toBe(5);
  expect(booleanResult).toBe(true);
  expect(functionResult).toBe(func);
  expect(checkTypeOfCoupleValuesResult).toBe(6);
});

test('checkThatValue throw exceptions', () => {
  expect(() => checkThatValueType(NaN).isNumber().isNotNaN()).toThrow();
  expect(() => checkThatValueType(NaN).isNotNaN().isNumber()).toThrow();
  expect(() => checkThatValueType('5').isNumber().isNotNaN()).toThrow();
  expect(() => checkThatValueType('5').isNotNaN().isNumber()).toThrow();
  expect(() => checkThatValueType({}).isBoolean()).toThrow();
  expect(() => checkThatValueType({}).isFunction()).toThrow();
  expect(() => checkThatValueType({}).isEqualTypeOf("")).toThrow();
});
