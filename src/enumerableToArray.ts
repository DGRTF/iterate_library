import checkThatValueType from "./common/checkThatValue";
import errorConstants from "./common/errorConstants";

export default function enumerableToArray<TItem>(this: Iterable<TItem>): TItem[] {
  checkThatValueType(this[Symbol.iterator]).isFunction(errorConstants.iteratorError);

  return [...this];
}
