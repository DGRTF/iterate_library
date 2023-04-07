const addMethodsInObject =
  <TObject extends {}, TMethods extends object>(object: TObject, methods: TMethods) => {

    Object.entries(methods)
      .forEach(x => {
        const [method, methodName] = x;
        (object as any)[method] = methodName;
      });

    return object as TObject & TMethods;
  }

export default addMethodsInObject;
