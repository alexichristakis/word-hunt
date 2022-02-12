import { useContext } from "react";
import { WordContext } from "./context";

const useWord = () => {
  return useContext(WordContext);
};

export default useWord;
