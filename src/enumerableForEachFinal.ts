export default function <TItem>(this: Iterable<TItem>, functionForEveryItem: (item: TItem) => void): void {
  for (const item of this)
    functionForEveryItem(item);
}
