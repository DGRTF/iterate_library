import iterator from "./iterator";
import getItemWithoutNext from './getItemWithoutNext';
import lastValue from "./lastValue";

export default function <TItem, TOutItem, TMethods extends {}>
  (enumerableObject: Iterable<TItem>, continueIterate: (item: TItem) => IteratorYieldResult<TOutItem> | true, methods: TMethods)
  : Generator<TOutItem, void> & TMethods {
  let isContinue = true;

  const it = iterator(enumerableObject);

  return {
    ...getItemWithoutNext(it, methods),

    next(...args: [] | [unknown]): IteratorResult<TOutItem, void> {
      while (isContinue) {
        const result = it.next(...args);

        if (result.done)
          return result;

        const resultContinue = continueIterate(result.value);

        if (resultContinue === true)
          continue;

        return {
          ...result,
          value: resultContinue.value,
        };
      }

      return lastValue;
    },
  };
}
