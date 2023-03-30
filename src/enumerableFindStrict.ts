import checkThatValueType from "./common/checkThatValue";
import errorConstants from "./common/errorConstants";

export default function enumerableFindStrict<TItem>(this: Iterable<TItem>, predicate: (item: TItem, iterateCount: number) => boolean): TItem | undefined {
  checkThatValueType(predicate).isFunction();
  checkThatValueType(this[Symbol.iterator]).isFunction(errorConstants.iteratorError);
  let iterateCount = -1;

  for (const item of this)
    if (checkThatValueType(predicate(item, ++iterateCount)).isBoolean() === true)
      return item;

  return undefined;
}
