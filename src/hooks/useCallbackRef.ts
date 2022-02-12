import { useRef, useCallback } from "react";

const useCallbackRef = <T extends (...args: any[]) => any>(callback: T): T => {
  const ref = useRef(callback);
  ref.current = callback;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(((...args) => ref.current(...args)) as T, []);
};

export default useCallbackRef;
