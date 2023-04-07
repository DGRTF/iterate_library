import addMethodsObject from "./addMethodsInObject";

const addIterableMethodsInIterableObject =
  <TObject extends Iterable<TItem>, TItem, TMethods extends object>(object: TObject, methods: TMethods) =>
    addMethodsObject(object, methods);

export default addIterableMethodsInIterableObject;
