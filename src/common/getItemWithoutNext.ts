import lastValue from "./lastValue";

export default function <TItem, TOutItem, TMethods extends {}>(it: Generator<TItem, void, unknown>, methods: TMethods) {
  return {
    ...methods,
    return(value: void): IteratorResult<TOutItem, void> {
      it.return(value);

      return lastValue;
    },
    throw(e: any): IteratorResult<TOutItem, void> {
      it.return(e);

      return lastValue;
    },
    [Symbol.iterator](this: Generator<TOutItem, void, unknown>): Generator<TOutItem, void, unknown> {
      return this;
    }
  };
}
