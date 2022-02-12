import useMountEffect from "./useMountEffect";
import useWindowEventListener from "./useWindowEventListener";

const getWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const useWindowSize = (
  onChange: (windowSize: ReturnType<typeof getWindowSize>) => void
) => {
  useWindowEventListener("resize", () => onChange(getWindowSize()));
  useMountEffect(() => {
    onChange(getWindowSize());
  });
};

export default useWindowSize;
