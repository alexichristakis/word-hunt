import { useSpring, useSpringValue, useSprings } from "@react-spring/web";
import { GRID_GAP, GRID_MAX_WIDTH, GRID_SIZE } from "common/constants";
import { indexToCoordinates } from "common/utils";
import useCallbackRef from "hooks/useCallbackRef";
import useWindowSize from "hooks/useWindowSize";
import { FC, PropsWithChildren, useMemo } from "react";
import { TilePositionsContext, TilePositionsContextShape } from "./context";

const TilePositionsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [{ tileSize, gridSize }] = useSpring<TilePositionsContextShape>(() => ({
    tileSize: 0,
    gridSize: 0,
  }));

  const gridRotation = useSpringValue(0, {
    onRest: () => {
      refreshPositions();
    },
  });

  const [tilePositions] = useSprings(GRID_SIZE * GRID_SIZE, () => ({
    x: 0,
    y: 0,
  }));

  const getTilePosition = useCallbackRef((index: number) => {
    const [row, column] = indexToCoordinates(index, gridRotation.get());

    const size = tileSize.get();
    const x = size / 2 + (column * size + column * GRID_GAP);
    const y = size / 2 + (row * size + row * GRID_GAP);

    return { x, y };
  });

  const refreshPositions = useCallbackRef(() => {
    for (const [index, position] of tilePositions.entries()) {
      const { x, y } = getTilePosition(index);
      position.x.set(x);
      position.y.set(y);
    }
  });

  useWindowSize(({ width }) => {
    gridSize.set(Math.min(width - GRID_GAP * 2, GRID_MAX_WIDTH));
    tileSize.set((gridSize.get() - (GRID_SIZE - 1) * GRID_GAP) / GRID_SIZE);
    refreshPositions();
  });

  const value = useMemo(
    () => ({ gridSize, tileSize, tilePositions, gridRotation }),
    [tileSize, gridSize, tilePositions, gridRotation]
  );

  return (
    <TilePositionsContext.Provider value={value}>
      {children}
    </TilePositionsContext.Provider>
  );
};

export default TilePositionsProvider;
