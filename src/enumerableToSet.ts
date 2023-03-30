import checkThatValueType from "./common/checkThatValue";
import errorConstants from "./common/errorConstants";

export default function enumerableToSet<TItem>(this: Iterable<TItem>): Set<TItem> {
  checkThatValueType(this[Symbol.iterator]).isFunction(errorConstants.iteratorError);

  return new Set(this);
}
