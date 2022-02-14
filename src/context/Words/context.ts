import { createContext } from "react";

export const WordsContext = createContext<Set<string> | null>(null);
