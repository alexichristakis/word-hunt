import { useContext } from "react";
import { WordsContext } from "./context";

const useWords = () => {
  return useContext(WordsContext);
};

export default useWords;
