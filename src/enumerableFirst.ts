import checkThatValueType from "./common/checkThatValue";
import errorConstants from "./common/errorConstants";

export default function enumerableFirst<TItem>(this: Iterable<TItem>): [TItem | undefined, boolean] {
  checkThatValueType(this[Symbol.iterator]).isFunction(errorConstants.iteratorError);

  for (const item of this)
    return [item, true];

  return [undefined, false];
}
