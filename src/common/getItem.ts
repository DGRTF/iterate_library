import iterator from "./iterator";
import getItemWithoutNext from './getItemWithoutNext';
import lastValue from "./lastValue";
import errorConstants from "./errorConstants";
import checkThatValueType from "./checkThatValue";

export default function <TItem, TOutItem, TMethods extends {}>
  (enumerableObject: Iterable<TItem>, continueIterate: (item: TItem, iterationCount: number) => IteratorYieldResult<TOutItem> | boolean, methods: TMethods)
  : Generator<TOutItem, void> & TMethods {

  checkThatValueType(enumerableObject[Symbol.iterator]).isFunction(errorConstants.iteratorError);

  const it = iterator(enumerableObject);
  let iterationCount = -1;

  return {
    ...getItemWithoutNext(it, methods),

    next(...args: [] | [unknown]): IteratorResult<TOutItem, void> {
      while (true) {
        iterationCount++;
        const result = it.next(...args);

        if (result.done)
          return result;

        const resultContinue = continueIterate(result.value, iterationCount);

        if (resultContinue === true)
          continue;

        if (resultContinue === false)
          return lastValue;

        return {
          ...result,
          value: resultContinue.value,
        };
      }
    },
  };
}
