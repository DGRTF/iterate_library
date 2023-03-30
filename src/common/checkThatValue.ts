const checkThatValueType = <TValue>(value: TValue) => {
  return {
    isBoolean(message?: string) {
      checkTypeThrowException(value, "boolean", message ?? "Value is not a boolean!");

      return value as boolean;
    },
    isNumber(message?: string) {
      checkTypeThrowException(value, "number", message ?? "Value type is not number!");

      return {
        isNotNaN: (message?: string): number => this.isNotNaN(message).value as number,
        value: value as number,
      };
    },
    isNotNaN(message?: string) {
      if (Number.isNaN(value))
        throw new TypeError(message ?? "Value is NaN!");

      return {
        isNumber: (message?: string): number => this.isNumber(message).value as number,
        value: value as number,
      };
    },
    isFunction(message?: string) {
      checkTypeThrowException(value, "function", message ?? "Value is not a function");

      return value;
    },
    isEqualTypeOf(secondValue: TValue, message?: string) {
      if (typeof value !== typeof secondValue)
        throw TypeError(message ?? "");

      return value;
    }
  };
}

export default checkThatValueType;

const checkTypeThrowException = <TValue>(value: TValue, type: JsTypes, message: string) => {
  if (typeof value !== type)
    throw TypeError(message);

  return value;
}

export type JsTypes = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";