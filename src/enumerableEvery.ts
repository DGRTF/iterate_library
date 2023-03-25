export default function enumerableEvery<TItem>(this: Iterable<TItem>, predicate: (item: TItem, iterationCount: number) => any): boolean {
  let iterationCount = 0;

  for (const item of this) {
    if (!predicate(item, iterationCount))
      return false;

    iterationCount++;
  }

  return true;
}
