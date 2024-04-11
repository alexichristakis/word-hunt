import { EffectCallback, useEffect } from "react";

const useMountEffect = (effect: EffectCallback) => {
  useEffect(effect, []);
};

export default useMountEffect;
