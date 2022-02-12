import { MutableRefObject, Ref } from "react";

const setMultipleRefs =
  <T = any>(...refs: ReadonlyArray<Ref<T>>) =>
  (element: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref != null) {
        (ref as MutableRefObject<any>).current = element;
      }
    }
  };

export default setMultipleRefs;
