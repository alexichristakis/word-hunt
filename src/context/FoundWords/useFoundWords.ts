import { useContext } from "react";
import { FoundWordsContext } from "./context";

const useFoundWords = () => {
  return useContext(FoundWordsContext);
};

export default useFoundWords;
