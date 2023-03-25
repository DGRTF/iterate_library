export default function enumerableToSet<TItem>(this: Iterable<TItem>): Set<TItem> {
  return new Set(this);
}
