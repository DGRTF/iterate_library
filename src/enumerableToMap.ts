import checkThatValueType from "./common/checkThatValue";
import errorConstants from "./common/errorConstants";

export default function enumerableToMap<TItem, TKey, TValue>(
  this: Iterable<TItem>,
  getKey: (item: TItem, iterationCount: number) => TKey,
  getValue: (item: TItem, iterationCount: number) => TValue): Map<TKey, TValue> {

  checkThatValueType(this[Symbol.iterator]).isFunction(errorConstants.iteratorError);
  const map = new Map();
  let iterationCount = 0;

  for (const item of this) {
    map.set(getKey(item, iterationCount), getValue(item, iterationCount));
    iterationCount++;
  }

  return map;
}
