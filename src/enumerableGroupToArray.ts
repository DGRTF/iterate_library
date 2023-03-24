import groupToMap from "./common/groupToMap";

export default function <TItem, TKey>(this: Iterable<TItem>, getKey: (item: TItem) => TKey): [TKey, TItem[]][] {
  return [...groupToMap(this, getKey)];
}
