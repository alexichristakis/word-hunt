import { createContext } from "react";
import { Letter } from "common/letters";

type Context = {
  grid: Letter[];
  checkWord: (word: string) => boolean;
  maxScore?: number;
  allWords?: Set<string>;
};

export const GridContext = createContext<Context>({
  grid: [],
  checkWord: () => false,
});
