import getItem from "../common/getItem";

export default <TMethods extends {}>(methods: TMethods) =>
  function enumerableTake<TItem>(this: Iterable<TItem>, takeCount: number) {
    return getItem(this, (x, counter) => {
      if (counter + 1 > takeCount)
        return false;

      return {
        value: x,
        done: false,
      };

    },
      methods);
  }
