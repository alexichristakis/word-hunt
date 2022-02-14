import { FC, useState } from "react";
import { FoundWordsContext } from "./context";

const FoundWordsProvider: FC = ({ children }) => {
  const value = useState<Set<string>>(new Set());
  return (
    <FoundWordsContext.Provider value={value}>
      {children}
    </FoundWordsContext.Provider>
  );
};

export default FoundWordsProvider;
