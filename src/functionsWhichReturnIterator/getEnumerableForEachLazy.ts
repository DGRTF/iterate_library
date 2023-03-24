import getItem from "../common/getItem";

export default <TMethods extends {}>(methods: TMethods) =>
  function enumerableForEachLazy<TItem>(this: Iterable<TItem>, functionForEveryItem: (item: TItem) => void) {
    return getItem(this, x => {
      functionForEveryItem(x);

      return {
        value: x,
        done: false,
      };
    },
      methods);
  }
