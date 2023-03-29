export default function enumerableFirst<TItem>(this: Iterable<TItem>): [TItem | undefined, boolean] {
  for (const item of this)
    return [item, true];

  return [undefined, false];
}
