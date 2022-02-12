import { useRef, useEffect, EffectCallback, DependencyList } from "react";

const useUpdateEffect = (effect: EffectCallback, deps: DependencyList) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return effect();
    }

    mounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useUpdateEffect;
