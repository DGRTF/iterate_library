import getItem from "../common/getItem";

export default <TMethods extends {}>(methods: TMethods) =>
  function enumerableMap<TItem, TNewItem>(this: Iterable<TItem>, convert: (item: TItem, iterationCount: number) => TNewItem) {
    return getItem(this, (x, counter) => ({
      value: convert(x, counter),
      done: false,
    }),
      methods);
  }
