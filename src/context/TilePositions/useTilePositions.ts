import { useContext } from "react";
import { TilePositionsContext } from "./context";

const useTilePositions = () => {
  return useContext(TilePositionsContext);
};

export default useTilePositions;
