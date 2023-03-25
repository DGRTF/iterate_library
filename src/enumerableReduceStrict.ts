export default function enumerableReduceStrict<TItem, TInitValue>(
  this: Iterable<TItem>,
  getNewValue: (previousResult: TInitValue, item: TItem, iterationCount: number) => TInitValue, initialValue: TInitValue): TInitValue {
  let iterateResult = initialValue;
  let iterationCount = 0;

  for (const item of this) {
    iterateResult = getNewValue(iterateResult, item, iterationCount);
    iterationCount++;
  }

  return iterateResult;
}
