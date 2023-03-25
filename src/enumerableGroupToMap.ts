import groupToMap from "./common/groupToMap";

export default function enumerableGroupToMap<TItem, TKey>(this: Iterable<TItem>, getKey: (item: TItem) => TKey): Map<TKey, TItem[]> {
  return groupToMap(this, getKey)
}
