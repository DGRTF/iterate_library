import getItemWithoutNext from "../common/getItemWithoutNext";
import iterator from "../common/iterator";
import lastValue from "../common/lastValue";

export default <TMethods extends {}>(methods: TMethods) =>
  function enumerableConcat<TItem>(this: Iterable<TItem>, ...sequences: (Iterable<TItem> | TItem)[]): Generator<TItem, void> & TMethods {
    let it = iterator(this);
    let it2 = iterator(sequences);

    return {
      ...getItemWithoutNext(it, methods),

      next(...args: [] | [unknown]): IteratorResult<TItem, void> {
        while (true) {
          const result = it.next(...args);

          if (!result.done)
            return result;
          else {
            const nextSequence = it2.next(...args);

            if (nextSequence.done)
              return lastValue;

            if (typeof nextSequence.value?.[Symbol.iterator] !== 'function')
              return {
                done: false,
                value: nextSequence.value as TItem,
              }

            it = iterator(nextSequence.value as Iterable<TItem>);
            const result = it.next(...args);

            if (!result.done)
              return result;
          }
        }
      },
    };
  }
