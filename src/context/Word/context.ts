import { createContext } from "react";

export const WordContext = createContext(new Set<number>());

export const SetWordContext = createContext<(word: Set<number>) => void>(
  () => {}
);
