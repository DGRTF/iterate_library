export default function enumerableReduce<TItem, TInitValue, TResult>(
  this: Iterable<TItem>,
  getNewValue: (previousResult: TItem | TInitValue | TResult | undefined, item: TItem
  ) =>
    TResult, initialValue?: TInitValue | undefined | TResult): TInitValue | TItem | TResult | undefined {

  let iterateResult: TResult | undefined;
  let iterationCount = 0;
  let firstElement: TItem | undefined;
  let secondElement: TItem | undefined;

  for (const item of this) {
    if (iterationCount == 0) {
      firstElement = item;
      iterationCount++;

      continue;
    }

    if (iterationCount === 1) {
      secondElement = item;
      iterationCount++;

      continue;
    }

    if (iterationCount === 2) {
      if (arguments.length < 2) {
        iterateResult = getNewValue(firstElement, secondElement as TItem);
      }
      else {
        iterateResult = getNewValue(initialValue, firstElement as TItem);
        iterateResult = getNewValue(iterateResult, secondElement as TItem);
      }
    }

    iterateResult = getNewValue(iterateResult, item);
    iterationCount++;
  }

  if (!iterationCount) {
    if (arguments.length < 2) {
      throw new TypeError('reduce of empty sequences with no initial value')
    }

    return initialValue;
  }

  if (iterationCount == 1)
    return firstElement;

  return iterateResult;
}
