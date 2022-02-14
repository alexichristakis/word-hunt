import getWords from "../../common/getWords";
import useAsyncValue from "../../hooks/useAsyncValue";
import { FC } from "react";
import { WordsContext } from "./context";

const WordsProvider: FC = ({ children }) => {
  const words = useAsyncValue(() => getWords());
  return (
    <WordsContext.Provider value={words}>{children}</WordsContext.Provider>
  );
};

export default WordsProvider;
