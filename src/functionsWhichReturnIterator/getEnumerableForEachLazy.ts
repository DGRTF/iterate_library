import checkThatValueType from "../common/checkThatValue";
import errorConstants from "../common/errorConstants";
import getItem from "../common/getItem";

export default <TMethods extends {}>(methods: TMethods) =>
  function enumerableForEachLazy<TItem>(this: Iterable<TItem>, functionForEveryItem: (item: TItem, iterationCount: number) => void) {
    checkThatValueType(functionForEveryItem).isFunction();

    return getItem(this, (x, counter) => {
      functionForEveryItem(x, counter);

      return {
        value: x,
        done: false,
      };
    },
      methods);
  }
