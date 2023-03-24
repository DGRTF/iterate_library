export default function <TItem>(this: Iterable<TItem>, predicate: (item: TItem) => boolean): boolean {
  for (const item of this) {
    if (predicate(item) === true)
      return true;
  }

  return false;
}
