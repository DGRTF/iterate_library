export default function enumerableSome<TItem>(this: Iterable<TItem>, predicate: (item: TItem) => any): boolean {
  for (const item of this) {
    if (predicate(item))
      return true;
  }

  return false;
}
