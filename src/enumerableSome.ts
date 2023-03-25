export default function enumerableSome<TItem>(this: Iterable<TItem>, predicate: (item: TItem, iterationCount: number) => any): boolean {
  let iterationCount = 0;

  for (const item of this) {
    if (predicate(item, iterationCount))
      return true;

    iterationCount++;
  }

  return false;
}
