import checkThatValueType from "./common/checkThatValue";
import errorConstants from "./common/errorConstants";

export default function enumerableCount<TItem>(this: Iterable<TItem>): number {
  checkThatValueType(this[Symbol.iterator]).isFunction(errorConstants.iteratorError);

  if (Array.isArray(this))
    return this.length;

  if (this instanceof Set || this instanceof Map)
    return this.size;

  let count = 0;

  for (const { } of this)
    count++;

  return count;
}
