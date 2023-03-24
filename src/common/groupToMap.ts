export default function <TItem, TKey>(iterate: Iterable<TItem>, getKey: (item: TItem) => TKey): Map<TKey, TItem[]> {
  const resultMap = new Map<TKey, TItem[]>();

  for (const item of iterate) {
    const key = getKey(item)

    if (resultMap.has(key))
      resultMap.get(key)?.push(item);
    else
      resultMap.set(key, [item]);
  }

  return resultMap;
}
