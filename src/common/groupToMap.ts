import checkThatValueType from "./checkThatValue";
import errorConstants from "./errorConstants";

export default function <TItem, TKey>(iterate: Iterable<TItem>, getKey: (item: TItem, iterationCount: number) => TKey): Map<TKey, TItem[]> {
  checkThatValueType(iterate[Symbol.iterator]).isFunction(errorConstants.iteratorError);
  checkThatValueType(getKey).isFunction();

  const resultMap = new Map<TKey, TItem[]>();
  let iterationCount = 0;

  for (const item of iterate) {
    const key = getKey(item, iterationCount);

    if (resultMap.has(key))
      resultMap.get(key)?.push(item);
    else
      resultMap.set(key, [item]);

    iterationCount++;
  }

  return resultMap;
}
