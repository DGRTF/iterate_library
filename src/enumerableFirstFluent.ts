import checkThatValueType from "./common/checkThatValue";
import errorConstants from "./common/errorConstants";

export default function enumerableFirstFluent<TItem>(this: Iterable<TItem>): IFirstFluentResult<TItem> {
  checkThatValueType(this[Symbol.iterator]).isFunction(errorConstants.iteratorError);
  let result = undefined as TItem;
  let isFound = false;

  for (const item of this) {
    result = item;
    isFound = true;

    break;
  }

  return {
    IfFound(func: (item: TItem) => void) {
      if (isFound)
        func(result);

      return {
        IfNotFound: (func: () => void) => {
          isFound ? undefined : func()
        },
      };
    },
    IfNotFound(func: () => void) {
      if (!isFound)
        func();

      return {
        IfFound: (func: (item: TItem) => void) => {
          isFound ? func(result) : undefined
        },
      };
    }
  };
}

export type IIfWasObject<TItem> = {
  IfFound(func: (item: TItem) => void): void;
}

export type IIfNotWasObject = {
  IfNotFound(func: () => void): void;
}

export type IFirstFluentResult<TItem> = {
  IfFound(func: (item: TItem) => void): IIfNotWasObject;
  IfNotFound(func: () => void): IIfWasObject<TItem>;
}
