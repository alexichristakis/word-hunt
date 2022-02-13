import { useContext } from "react";
import { TilePositionsContext } from "./context";

const useTileSize = () => {
  return useContext(TilePositionsContext).tileSize;
};

export default useTileSize;
