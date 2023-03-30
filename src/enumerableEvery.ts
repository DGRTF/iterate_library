import checkThatValueType from "./common/checkThatValue";
import errorConstants from "./common/errorConstants";

export default function enumerableEvery<TItem>(this: Iterable<TItem>, predicate: (item: TItem, iterationCount: number) => any): boolean {
  checkThatValueType(this[Symbol.iterator]).isFunction(errorConstants.iteratorError);
  let iterationCount = 0;

  for (const item of this) {
    if (!predicate(item, iterationCount))
      return false;

    iterationCount++;
  }

  return true;
}
