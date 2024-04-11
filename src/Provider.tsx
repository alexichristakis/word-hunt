import { FC, PropsWithChildren } from "react";
import TilePositionsProvider from "./context/TilePositions/TilePositionsProvider";
import WordProvider from "./context/Word/WordProvider";
import GridProvider from "./context/Grid/GridProvider";
import FoundWordsProvider from "./context/FoundWords/FoundWordsProvider";

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <TilePositionsProvider>
    <WordProvider>
      <FoundWordsProvider>
        <GridProvider>{children}</GridProvider>
      </FoundWordsProvider>
    </WordProvider>
  </TilePositionsProvider>
);
export default Provider;
