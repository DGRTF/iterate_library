const addIterableMethodsInIterableObject =
  <TObject extends Iterable<TItem>, TItem, TMethods extends object>(object: TObject, methods: TMethods) => {

    Object.entries(methods)
      .forEach(x => {
        const [method, methodName] = x;
        object[method] = methodName;
      });

    return object as TObject & TMethods;
  }

export default addIterableMethodsInIterableObject;
