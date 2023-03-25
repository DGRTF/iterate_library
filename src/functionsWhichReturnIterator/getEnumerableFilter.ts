import getItem from "../common/getItem";

export default <TMethods extends {}>(methods: TMethods) =>
  function enumerableFilter<TItem>(this: Iterable<TItem>, predicate: (item: TItem, iterationCount: number) => any) {
    return getItem(this, (x, counter) => {
      if (predicate(x, counter))
        return {
          value: x,
          done: false,
        };

      return true;
    },
      methods);
  }
