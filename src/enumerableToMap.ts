export default function <TItem, TKey, TValue>(this: Iterable<TItem>, getKey: (item: TItem) => TKey, getValue: (item: TItem) => TValue): Map<TKey, TValue> {
  const map = new Map();

  for (const item of this) {
    map.set(getKey(item), getValue(item));
  }

  return map;
}
