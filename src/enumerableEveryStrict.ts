export default function enumerableEveryStrict<TItem>(this: Iterable<TItem>, predicate: (item: TItem) => boolean): boolean {
  for (const item of this) {
    if (predicate(item) !== true)
      return false;
  }

  return true;
}
