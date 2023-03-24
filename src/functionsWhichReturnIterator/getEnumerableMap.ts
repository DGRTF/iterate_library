import getItem from "../common/getItem";

export default <TMethods extends {}>(methods: TMethods) =>
  function enumerableMap<TItem, TNewItem>(this: Iterable<TItem>, convert: (item: TItem) => TNewItem) {
    return getItem(this, x => ({
      value: convert(x),
      done: false,
    }),
      methods);
  }
