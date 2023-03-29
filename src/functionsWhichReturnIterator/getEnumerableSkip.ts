import getItem from "../common/getItem";

export default <TMethods extends {}>(methods: TMethods) =>
  function enumerableSkip<TItem>(this: Iterable<TItem>, skipCount: number) {
    return getItem(this, (x, counter) => {
      if (counter + 1 > skipCount)
        return {
          value: x,
          done: false,
        };

      return true;
    },
      methods);
  }
