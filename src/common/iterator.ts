export default function* <TItem>(it: Iterable<TItem>) {
  for (const item of it) {
    yield item;
  }
}
