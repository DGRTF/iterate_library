export default function <TItem>(this: Iterable<TItem>): number {
  if (Array.isArray(this))
    return this.length;

  let count = 0;

  for (const item of this)
    count++;

  return count;
}
