export default function enumerableFirstFluent<TItem>(this: Iterable<TItem>): IFirstFluentResult<TItem> {
  let result = undefined as TItem;
  let was = false;

  for (const item of this) {
    result = item;
    was = true;

    break;
  }

  return {
    IfFound(func: (item: TItem) => void) {
      if (was)
        func(result);

      return {
        IfNotFound: (func: () => void) => {
          was ? undefined : func()
        },
      };
    },
    IfNotFound(func: () => void) {
      if (!was)
        func();

      return {
        IfFound: (func: (item: TItem) => void) => {
          was ? func(result) : undefined
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
