import useMountEffect from "./useMountEffect";
import useCallbackRef from "./useCallbackRef";

const useWindowEventListener = <K extends keyof WindowEventMap>(
  event: K,
  callback: (e: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
) => {
  const stableCallback = useCallbackRef(callback);

  useMountEffect(() => {
    window.addEventListener(event, stableCallback, options);
    return () => {
      window.removeEventListener(event, stableCallback, options);
    };
  });
};

export default useWindowEventListener;
