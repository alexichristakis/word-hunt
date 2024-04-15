import { createContext } from "react";

type State = [Set<string>, (newValue: Set<string>) => void];
export const FoundWordsContext = createContext<State>([new Set(), () => {}]);
