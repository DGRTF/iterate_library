import addIterableMethodsInIterableObject from "./common/addIterableMethodsInIterableObject";
import checkThatValueType from "./common/checkThatValue";
import errorConstants from "./common/errorConstants";

export default <TMethods extends Object>(methods: TMethods) =>
  function enumerableMergeSort<TItem>(this: Iterable<TItem>, comparator: (a: TItem, b: TItem) => number) {
    checkThatValueType(comparator).isFunction();
    checkThatValueType(this[Symbol.iterator]).isFunction(errorConstants.iteratorError);
    let accumulate = getTuplesFromIterator(this, comparator);

    if (accumulate[0].length < 2)
      return addIterableMethodsInIterableObject(accumulate[0], methods);

    let resultAccumulate: TItem[][] = [];

    for (let index = 0; index < accumulate.length; index += 2) {
      const first = accumulate[index];
      const second = accumulate[index + 1] ?? [];
      resultAccumulate.push([]);
      const resultTuple = resultAccumulate[index / 2];
      let firstSecondIndex = first.length + second.length - 1;

      while (true) {
        if (first.length == 0) {
          addReverse(second, resultTuple);
          break;
        }
        if (second.length == 0) {
          addReverse(first, resultTuple);
          break;
        }

        const compareResult = comparator(first[first.length - 1], second[second.length - 1]);
        checkCompareResult(compareResult);

        compareResult > 0 ?
          resultTuple[firstSecondIndex] = first.pop() as TItem :
          resultTuple[firstSecondIndex] = second.pop() as TItem;

        firstSecondIndex--;
      }

      if (index >= accumulate.length - 2) {
        if (resultAccumulate.length === 1)
          break;

        accumulate = resultAccumulate;
        resultAccumulate = [];
        index = -2;
      }
    }

    return addIterableMethodsInIterableObject(resultAccumulate[0], methods);
  }

const getTuplesFromIterator = <TItem>(iterable: Iterable<TItem>, comparator: (a: TItem, b: TItem) => number) => {
  const accumulate: TItem[][] = [[]];

  for (const item of iterable) {
    let tuple = accumulate[accumulate.length - 1];

    if (tuple.length === 2) {
      const compareResult = comparator(tuple[0], tuple[1]);
      checkCompareResult(compareResult);

      if (compareResult > 0)
        [tuple[0], tuple[1]] = [tuple[1], tuple[0]];

      tuple = []
      accumulate.push(tuple);
    }

    tuple.push(item);
  }

  return accumulate;
}

const addReverse = <TItem>(arr: TItem[], resultTuple: TItem[]) => {
  for (let i = 0; i < arr.length; i++) {
    resultTuple[i] = arr[i];
  }
}

const checkCompareResult = (compareResult: number) =>
  checkThatValueType(compareResult).isNumber().isNotNaN();
