import { MutableRefObject, useRef } from "react";

const useLazyRef = <T>(initialValue: () => T): MutableRefObject<T> => {
  const ref = useRef<T | null>(null);

  if (ref.current === null) {
    ref.current = initialValue();
  }

  return ref as MutableRefObject<T>;
};

export default useLazyRef;
