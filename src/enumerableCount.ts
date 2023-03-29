export default function enumerableCount<TItem>(this: Iterable<TItem>): number {
  if (Array.isArray(this))
    return this.length;

  let count = 0;

  for (const { } of this)
    count++;

  return count;
}
