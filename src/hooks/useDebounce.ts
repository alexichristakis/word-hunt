import { useRef } from "react";
import useCallbackRef from "./useCallbackRef";
import useUnmountEffect from "./useUnmountEffect";

export type Fn<Args extends unknown[]> = (...args: Args) => void;

const useDebounce = <Args extends unknown[] = []>(
  callback: Fn<Args>,
  delay: number
): [fn: Fn<Args>, cancel: () => void] => {
  const ref = useRef<number>();
  const stableCallback = useCallbackRef(callback);

  const cancel = useCallbackRef(() => {
    if (ref.current) {
      cancelAnimationFrame(ref.current);
      ref.current = undefined;
    }
  });

  useUnmountEffect(cancel);

  const tick = useCallbackRef((start: number, ...args: Args) => {
    if (Date.now() - start >= delay) {
      stableCallback(...args);
    } else {
      ref.current = requestAnimationFrame(() => tick(start, ...args));
    }
  });

  const fn = useCallbackRef<Fn<Args>>((...args) => {
    cancel();
    tick(Date.now(), ...args);
  });

  return [fn, cancel];
};

export default useDebounce;
