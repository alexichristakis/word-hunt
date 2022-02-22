import { useSpring, useSprings } from "@react-spring/web";
import { FC, useMemo } from "react";
import { GRID_GAP, GRID_MAX_WIDTH, GRID_SIZE } from "common/constants";
import { indexToCoordinates } from "common/utils";
import useCallbackRef from "hooks/useCallbackRef";
import useWindowSize from "hooks/useWindowSize";
import { TilePositionsContext, TilePositionsContextShape } from "./context";

const TilePositionsProvider: FC = ({ children }) => {
  const [{ tileSize, gridSize }] = useSpring<TilePositionsContextShape>(() => ({
    tileSize: 0,
    gridSize: 0,
  }));

  const [tilePositions] = useSprings(GRID_SIZE * GRID_SIZE, () => ({
    x: 0,
    y: 0,
  }));

  const getTilePosition = useCallbackRef((index: number) => {
    const [row, column] = indexToCoordinates(index);

    const size = tileSize.get();
    const x = size / 2 + (column * size + column * GRID_GAP);
    const y = size / 2 + (row * size + row * GRID_GAP);
    return { x, y };
  });

  useWindowSize(({ width }) => {
    gridSize.set(Math.min(width - GRID_GAP * 2, GRID_MAX_WIDTH));
    tileSize.set((gridSize.get() - (GRID_SIZE - 1) * GRID_GAP) / GRID_SIZE);

    tilePositions.forEach((position, index) => {
      const { x, y } = getTilePosition(index);
      position.x.set(x);
      position.y.set(y);
    });
  });

  const value = useMemo(
    () => ({ gridSize, tileSize, tilePositions }),
    [tileSize, gridSize, tilePositions]
  );

  return (
    <TilePositionsContext.Provider value={value}>
      {children}
    </TilePositionsContext.Provider>
  );
};

export default TilePositionsProvider;
