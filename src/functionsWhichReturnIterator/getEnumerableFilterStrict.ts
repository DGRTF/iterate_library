import getItem from "../common/getItem";

export default <TMethods extends {}>(methods: TMethods) =>
  function enumerableFilterStrict<TItem>(this: Iterable<TItem>, predicate: (item: TItem) => boolean) {
    return getItem(this, x => {
      if (predicate(x) === true)
        return {
          value: x,
          done: false,
        };

      return true;
    },
      methods);
  }
