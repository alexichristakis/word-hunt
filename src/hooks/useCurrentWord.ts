import { useMemo } from "react";
import useGrid from "../context/Grid/useGrid";
import useWord from "../context/Word/useWord";

const useCurrentWord = (): { word: string; valid: boolean } => {
  const [word] = useWord();
  const { grid, checkWord } = useGrid();

  return useMemo(() => {
    const tiles = Array.from(word.keys());
    const wordString = tiles.map((tileIndex) => grid[tileIndex]).join("");
    return { word: wordString, valid: checkWord(wordString) };
  }, [word, grid, checkWord]);
};

export default useCurrentWord;
