import { FC, useState } from "react";
import { WordContext } from "./context";

const GridProvider: FC = ({ children }) => {
  const value = useState<Set<number>>(new Set());
  return <WordContext.Provider value={value}>{children}</WordContext.Provider>;
};

export default GridProvider;
