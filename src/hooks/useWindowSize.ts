import { useSpring } from "@react-spring/web";
import useCallbackRef from "./useCallbackRef";
import useWindowEventListener from "./useWindowEventListener";
import { useLayoutEffect } from "react";

export const getWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const useWindowSize = (
  onChange?: (windowSize: ReturnType<typeof getWindowSize>) => void
) => {
  const [dimensions, api] = useSpring(() => getWindowSize());
  const handleChange = useCallbackRef(() => {
    const { width, height } = getWindowSize();
    onChange?.({ width, height });
    api.set({ width, height });
  });

  useWindowEventListener("resize", handleChange);
  useLayoutEffect(() => {
    handleChange();
  }, []);

  return dimensions;
};

export default useWindowSize;
