export default <TMethods extends Object>(methods: TMethods) =>
  function enumerableMergeSort<TItem>(this: Iterable<TItem>, comparator: (a: TItem, b: TItem) => number) {
    let accumulate = getTuplesFromIterator(this, comparator);

    if (accumulate[0].length < 2)
      return addMethodsInArray(accumulate[0], methods);

    let resultAccumulate: TItem[][] = [];

    for (let index = 0; index < accumulate.length; index += 2) {
      const first = accumulate[index];
      const second = accumulate[index + 1] ?? [];
      resultAccumulate.push([]);
      const resultTuple = resultAccumulate[index / 2];
      let firstSecondIndex = first.length + second.length - 1;

      while (true) {
        if (first.length === 0 && second.length === 0)
          break;

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

    return addMethodsInArray(resultAccumulate[0], methods);
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

const addMethodsInArray = <TItem, TMethods extends Object>(array: TItem[], methods: TMethods) => {
  Object.entries(methods)
    .forEach(x => {
      const [method, methodName] = x;
      array[method] = methodName;
    });

  return array;
}

const checkCompareResult = (compareResult: number) => {
  if (typeof compareResult !== 'number')
    throw new TypeError(`Comparator returned ${typeof compareResult} instead a number!`);
}
