import checkThatValueType from "./common/checkThatValue";
import errorConstants from "./common/errorConstants";

export default function enumerableReduceStrict<TItem, TInitValue>(
  this: Iterable<TItem>,
  getNewValue: (previousResult: TInitValue, item: TItem, iterationCount: number) => TInitValue, initialValue: TInitValue): TInitValue {

  checkThatValueType(getNewValue).isFunction();
  checkThatValueType(this[Symbol.iterator]).isFunction(errorConstants.iteratorError);

  let iterateResult = initialValue;
  let iterationCount = 0;

  for (const item of this) {
    iterateResult = getNewValue(iterateResult, item, iterationCount);
    checkThatValueType(iterateResult).isEqualTypeOf(initialValue);
    iterationCount++;
  }

  return iterateResult;
}
