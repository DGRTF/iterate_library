export default function enumerableFind<TItem>(this: Iterable<TItem>, predicate: (item: TItem, iterateCount: number) => any): TItem | undefined {
  let iterateCount = -1;

  for (const item of this)
    if (predicate(item, ++iterateCount))
      return item;

  return undefined;
}
