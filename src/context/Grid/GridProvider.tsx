import { FC, useMemo } from "react";
import getGrid from "./getGrid";
import { GridContext } from "./context";
import useAsyncValue from "../../hooks/useAsyncValue";
import getWords from "../../common/getWords";
import { makeTrie, checkWord } from "../../common/Trie";
import solver from "../../common/solver";
import useCallbackRef from "../../hooks/useCallbackRef";

const GridProvider: FC = ({ children }) => {
  const grid = useMemo(() => getGrid(), []);
  const words = useAsyncValue(() => getWords());
  const trie = useMemo(() => (words ? makeTrie(words) : null), [words]);

  const [allWords, maxScore] = useMemo(() => {
    if (!trie) {
      return [];
    }

    return solver(grid, trie);
  }, [grid, trie]);

  const handleCheckWord = useCallbackRef((word: string) =>
    trie ? checkWord(word, trie) : false
  );

  return (
    <GridContext.Provider
      value={{
        grid,
        allWords,
        maxScore,
        checkWord: handleCheckWord,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export default GridProvider;
