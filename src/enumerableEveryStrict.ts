export default function enumerableEveryStrict<TItem>(this: Iterable<TItem>, predicate: (item: TItem, iterationCount: number) => boolean): boolean {
  let iterationCount = 0;

  for (const item of this) {
    if (predicate(item, iterationCount) !== true)
      return false;

    iterationCount++;
  }

  return true;
}
