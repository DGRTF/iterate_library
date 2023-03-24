import getItem from "../common/getItem";
import getItemWithoutNext from "../common/getItemWithoutNext";
import iterator from "../common/iterator";

export default <TMethods extends {}>(methods: TMethods) =>
  function enumerableFlatMap<TItem, TResultItem>(this: Iterable<TItem>, getInnerIterator: (item: TItem) => Iterable<TResultItem>) {
    const it = innerIterator(this, getInnerIterator);

    return {
      ...getItemWithoutNext(it, methods),

      next(...args: [] | [unknown]): IteratorResult<TResultItem, void> {
        return it.next(...args);
      },
    };
  }

function* innerIterator<TItem, TResultItem>(it: Iterable<TItem>, getInnerIterator: (item: TItem) => Iterable<TResultItem>) {
  for (const i of it)
    yield* iterator(getInnerIterator(i));
}
