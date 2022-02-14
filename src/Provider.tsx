import { FC } from "react";
import TilePositionsProvider from "./context/TilePositions/TilePositionsProvider";
import WordProvider from "./context/Word/WordProvider";
import GridProvider from "./context/Grid/GridProvider";
import WordsProvider from "./context/Words/WordsProvider";
import FoundWordsProvider from "./context/FoundWords/FoundWordsProvider";

const Provider: FC = ({ children }) => (
  <TilePositionsProvider>
    <WordProvider>
      <WordsProvider>
        <FoundWordsProvider>
          <GridProvider>{children}</GridProvider>
        </FoundWordsProvider>
      </WordsProvider>
    </WordProvider>
  </TilePositionsProvider>
);
export default Provider;
