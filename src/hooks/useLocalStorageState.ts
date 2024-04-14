import { useState } from "react";
import useCallbackRef from "./useCallbackRef";
import useDocumentEventListener from "./useDocumentEventListener";
import useDebounce from "./useDebounce";

const useLocalStorageState = <T>(
  key: string,
  defaultValue: T | (() => T),
  stringify = (value: T) => JSON.stringify(value),
  parse = (value: string) => JSON.parse(value)
): [T, (newValue: T) => void] => {
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

  const persistValue = useCallbackRef((value: T = state) => {
    localStorage.setItem(key, stringify(value));
  });

  useDocumentEventListener("visibilitychange", () => {
    persistValue();
  });

  const [debouncedPersistValue] = useDebounce((newValue: T) => {
    persistValue(newValue);
  }, 1000);

  const handleSetState = useCallbackRef((newValue: T) => {
    debouncedPersistValue(newValue);
    setState(newValue);
  });

  return [state, handleSetState];
};

export default useLocalStorageState;
