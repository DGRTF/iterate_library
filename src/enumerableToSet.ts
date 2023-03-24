export default function <TItem>(this: Iterable<TItem>): Set<TItem> {
  return new Set(this);
}
