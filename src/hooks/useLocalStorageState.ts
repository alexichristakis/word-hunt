import { Dispatch, SetStateAction, useCallback, useState } from "react";
import useCallbackRef from "./useCallbackRef";
import useDocumentEventListener from "./useDocumentEventListener";
import useWindowEventListener from "./useWindowEventListener";

const useLocalStorageState = <T>(
  key: string,
  defaultValue: T | (() => T),
  stringify = (value: T) => JSON.stringify(value),
  parse = (value: string) => JSON.parse(value)
): [T, Dispatch<SetStateAction<T>>] => {
  const getDefaultValue = useCallbackRef(() => {
    try {
      const cachedState = localStorage.getItem(key);
      if (cachedState) {
        return parse(cachedState);
      }
    } catch (err) {}

    return typeof defaultValue === "function"
      ? (defaultValue as () => T)()
      : defaultValue;
  });

  const [state, setState] = useState(getDefaultValue);

  useWindowEventListener("unload", () => {
    localStorage.setItem(key, stringify(state));
  });

  return [state, setState];
};

export default useLocalStorageState;
