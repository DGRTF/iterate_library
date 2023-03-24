export default function <TItem>(this: Iterable<TItem>, predicate: (item: TItem) => any): boolean {
  for (const item of this) {
    if (!predicate(item))
      return false;
  }

  return true;
}
