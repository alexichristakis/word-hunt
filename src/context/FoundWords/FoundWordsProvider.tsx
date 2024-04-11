import { FC, PropsWithChildren, useState } from "react";
import { FoundWordsContext } from "./context";

const FoundWordsProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useState<Set<string>>(new Set());
  return (
    <FoundWordsContext.Provider value={value}>
      {children}
    </FoundWordsContext.Provider>
  );
};

export default FoundWordsProvider;
