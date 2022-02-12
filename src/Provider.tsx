import { FC } from "react";
import TilePositionsProvider from "./context/TilePositions/TilePositionsProvider";
import WordProvider from "./context/Word/WordProvider";
import GridProvider from "./context/Grid/GridProvider";

const Provider: FC = ({ children }) => (
  <TilePositionsProvider>
    <WordProvider>
      <GridProvider>{children}</GridProvider>
    </WordProvider>
  </TilePositionsProvider>
);
export default Provider;
