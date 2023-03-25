import getItem from "../common/getItem";

export default <TMethods extends {}>(methods: TMethods) =>
  function enumerableFilterStrict<TItem>(this: Iterable<TItem>, predicate: (item: TItem, iterationCount: number) => boolean) {
    return getItem(this, (x, counter) => {
      if (predicate(x, counter) === true)
        return {
          value: x,
          done: false,
        };

      return true;
    },
      methods);
  }
