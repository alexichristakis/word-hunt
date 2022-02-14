import { createContext, Dispatch, SetStateAction } from "react";

type State = [Set<number>, Dispatch<SetStateAction<Set<number>>>];
export const WordContext = createContext<State>([new Set<number>(), () => {}]);
