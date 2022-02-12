import { FC, useMemo } from "react";
import getGrid from "./getGrid";
import { GridContext } from "./context";

const GridProvider: FC = ({ children }) => {
  const grid = useMemo(() => getGrid(), []);

  return <GridContext.Provider value={grid}>{children}</GridContext.Provider>;
};

export default GridProvider;
