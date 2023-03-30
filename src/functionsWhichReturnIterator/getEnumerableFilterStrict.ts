import checkThatValueType from "../common/checkThatValue";
import errorConstants from "../common/errorConstants";
import getItem from "../common/getItem";

export default <TMethods extends {}>(methods: TMethods) =>
  function enumerableFilterStrict<TItem>(this: Iterable<TItem>, predicate: (item: TItem, iterationCount: number) => boolean) {
    checkThatValueType(predicate).isFunction();

    return getItem(this, (x, counter) => {
      const predicateResult = predicate(x, counter);

      if (checkThatValueType(predicateResult).isBoolean() === true)
        return {
          value: x,
          done: false,
        };

      return true;
    },
      methods);
  }
