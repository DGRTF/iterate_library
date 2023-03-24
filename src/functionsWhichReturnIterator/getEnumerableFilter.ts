import getItem from "../common/getItem";

export default <TMethods extends {}>(methods: TMethods) =>
  function enumerableFilter<TItem>(this: Iterable<TItem>, predicate: (item: TItem) => any) {
    return getItem(this, x => {
      if (predicate(x))
        return {
          value: x,
          done: false,
        };

      return true;
    },
      methods);
  }
