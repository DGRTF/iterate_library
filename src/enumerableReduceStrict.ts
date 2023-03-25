export default function enumerableReduceStrict<TItem, TInitValue>(
  this: Iterable<TItem>,
  getNewValue: (previousResult: TInitValue, item: TItem) => TInitValue, initialValue: TInitValue): TInitValue {
  let iterateResult = initialValue;

  for (const item of this)
    iterateResult = getNewValue(iterateResult, item);

  return iterateResult;
}
