import { createContext, Dispatch, SetStateAction } from "react";

type State = [Set<string>, Dispatch<SetStateAction<Set<string>>>];
export const FoundWordsContext = createContext<State>([new Set(), () => {}]);
