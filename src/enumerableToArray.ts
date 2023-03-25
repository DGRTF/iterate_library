export default function enumerableToArray<TItem>(this: Iterable<TItem>): TItem[] {
  return [...this];
}
