export default function enumerableForEach<TItem>(this: Iterable<TItem>, functionForEveryItem: (item: TItem, iterationCount: number) => void): void {
  let iterationCount = 0;

  for (const item of this) {
    functionForEveryItem(item, iterationCount);
    iterationCount++
  }
}
