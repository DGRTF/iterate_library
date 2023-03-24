import groupToMap from "./common/groupToMap";

export default function <TItem, TKey>(this: Iterable<TItem>, getKey: (item: TItem) => TKey): Map<TKey, TItem[]> {
  return groupToMap(this, getKey)
}
