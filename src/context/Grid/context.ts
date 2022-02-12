import { createContext } from "react";
import { Letter } from "../../common/letters";

export const GridContext = createContext<Letter[]>([]);
