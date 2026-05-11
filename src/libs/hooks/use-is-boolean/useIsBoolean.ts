import { Value } from "./types";

export type UseIsBooleanOptions = {
  value: Value;
};

export const useIsBoolean = (options: UseIsBooleanOptions) => {
  const { value } = options;

  const isBoolean = (val: Value): val is boolean => {
    return typeof val === "boolean";
  };

  return isBoolean(value);
};
