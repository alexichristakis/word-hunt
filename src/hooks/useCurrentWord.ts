import { useMemo } from "react";
import useGrid from "../context/Grid/useGrid";
import useWord from "../context/Word/useWord";

const useCurrentWord = () => {
  const [word] = useWord();
  const grid = useGrid();

  return useMemo(() => {
    const tiles = Array.from(word.keys());
    const wordString = tiles.map((tileIndex) => grid[tileIndex]).join("");
    return wordString;
  }, [word, grid]);
};

export default useCurrentWord;
