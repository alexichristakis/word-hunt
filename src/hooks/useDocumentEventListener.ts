import useMountEffect from "./useMountEffect";
import useCallbackRef from "./useCallbackRef";

const useDocumentEventListener = <K extends keyof DocumentEventMap>(
  event: K,
  callback: (e: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
) => {
  const stableCallback = useCallbackRef(callback);

  useMountEffect(() => {
    document.addEventListener(event, stableCallback, options);
    return () => {
      document.removeEventListener(event, stableCallback, options);
    };
  });
};

export default useDocumentEventListener;
