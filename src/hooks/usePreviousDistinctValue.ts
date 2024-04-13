import { useRef } from "react";

import usePreviousValue from "./usePreviousValue";

/**
 * Returns the last value from a previous render that is different from the current value
 */
export default function usePreviousDistinctValue<T>(value: T): T | undefined {
  const ref = useRef<T>();
  const prevValue = usePreviousValue(value);

  if (prevValue !== value) {
    ref.current = prevValue;
  }

  return ref.current;
}
