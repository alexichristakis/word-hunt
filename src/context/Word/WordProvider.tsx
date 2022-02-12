import { FC, useState } from "react";
import { WordContext, SetWordContext } from "./context";

const GridProvider: FC = ({ children }) => {
  const [word, setWord] = useState<Set<number>>(new Set());

  return (
    <WordContext.Provider value={word}>
      <SetWordContext.Provider value={setWord}>
        {children}
      </SetWordContext.Provider>
    </WordContext.Provider>
  );
};

export default GridProvider;
