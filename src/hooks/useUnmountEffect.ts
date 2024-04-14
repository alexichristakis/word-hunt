import { useEffect, useRef } from "react";

const useUnmountEffect = (effect: () => void): void => {
  const effectRef = useRef(effect);
  effectRef.current = effect;

  useEffect(
    () => () => {
      effectRef.current();
    },
    []
  );
};

export default useUnmountEffect;
