import checkThatValueType from "./common/checkThatValue";
import errorConstants from "./common/errorConstants";

export default function enumerableForEach<TItem>(this: Iterable<TItem>, functionForEveryItem: (item: TItem, iterationCount: number) => void): void {
  checkThatValueType(this[Symbol.iterator]).isFunction(errorConstants.iteratorError);
  let iterationCount = 0;

  for (const item of this) {
    functionForEveryItem(item, iterationCount);
    iterationCount++
  }
}
