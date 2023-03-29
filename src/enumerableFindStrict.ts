export default function enumerableFindStrict<TItem>(this: Iterable<TItem>, predicate: (item: TItem, iterateCount: number) => boolean): TItem | undefined {
  let iterateCount = -1;

  for (const item of this)
    if (predicate(item, ++iterateCount) === true)
      return item;

  return undefined;
}
