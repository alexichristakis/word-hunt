import { FC, PropsWithChildren } from "react";
import { FoundWordsContext } from "./context";
import useLocalStorageState from "hooks/useLocalStorageState";
import getGridSeed from "common/getGridSeed";

const FoundWordsProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useLocalStorageState<Set<string>>(
    `${getGridSeed()}-foundWords`,
    () => new Set(),
    (value) => JSON.stringify(Array.from(value)),
    (stringifiedValue) => new Set(JSON.parse(stringifiedValue))
  );

  return (
    <FoundWordsContext.Provider value={value}>
      {children}
    </FoundWordsContext.Provider>
  );
};

export default FoundWordsProvider;
