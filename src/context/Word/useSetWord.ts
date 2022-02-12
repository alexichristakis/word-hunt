import { useContext } from "react";
import { SetWordContext } from "./context";

const useSetWord = () => {
  return useContext(SetWordContext);
};

export default useSetWord;
