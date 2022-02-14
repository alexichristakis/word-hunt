import { useState } from "react";
import useMountEffect from "./useMountEffect";

const useAsyncValue = <T>(factory: () => Promise<T>): null | T => {
  const [value, setValue] = useState<T | null>(null);

  useMountEffect(() => {
    const fetch = async () => {
      setValue(await factory());
    };

    fetch();
  });

  return value;
};

export default useAsyncValue;
