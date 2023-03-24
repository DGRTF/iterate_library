export default function <TItem>(this: Iterable<TItem>): TItem[] {
  return [...this];
}
