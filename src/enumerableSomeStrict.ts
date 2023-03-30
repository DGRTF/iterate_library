import checkThatValueType from "./common/checkThatValue";
import errorConstants from "./common/errorConstants";

export default function enumerableSomeStrict<TItem>(this: Iterable<TItem>, predicate: (item: TItem, iterationCount: number) => boolean): boolean {
  checkThatValueType(predicate).isFunction();
  checkThatValueType(this[Symbol.iterator]).isFunction(errorConstants.iteratorError);
  let iterationCount = 0;

  for (const item of this) {
    if (checkThatValueType(predicate(item, iterationCount)).isBoolean() === true)
      return true;

    iterationCount++;
  }

  return false;
}
