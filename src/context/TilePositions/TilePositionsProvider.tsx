import { useSpring, useSpringValue, useSprings } from "@react-spring/web";
import { GRID_MARGIN, GRID_MAX_WIDTH, GRID_SIZE } from "common/constants";
import { indexToCoordinates } from "common/utils";
import useCallbackRef from "hooks/useCallbackRef";
import useWindowSize from "hooks/useWindowSize";
import { FC, PropsWithChildren, useMemo } from "react";
import { TilePositionsContext, TilePositionsContextShape } from "./context";

const TilePositionsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [{ tileSize, gridSize, gridGap }] =
    useSpring<TilePositionsContextShape>(() => ({
      tileSize: 0,
      gridSize: 0,
      gridGap: 8,
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
    const gap = gridGap.get();
    const x = size / 2 + (column * size + column * gap);
    const y = size / 2 + (row * size + row * gap);

    return { x, y };
  });

  const refreshPositions = useCallbackRef(() => {
    for (const [index, position] of tilePositions.entries()) {
      const { x, y } = getTilePosition(index);
      position.x.set(x);
      position.y.set(y);
    }
  });

  useWindowSize(({ width, height }) => {
    const dimension = Math.min(width, height);
    const calculatedGridSize = Math.min(
      dimension - GRID_MARGIN * 2,
      GRID_MAX_WIDTH
    );

    gridGap.set(calculatedGridSize > 600 ? 12 : 8);
    gridSize.set(calculatedGridSize);
    tileSize.set(
      (calculatedGridSize - (GRID_SIZE - 1) * gridGap.get()) / GRID_SIZE
    );

    refreshPositions();
  });

  const value = useMemo(
    () => ({ gridSize, tileSize, tilePositions, gridGap, gridRotation }),
    [tileSize, gridSize, tilePositions, gridGap, gridRotation]
  );

  return (
    <TilePositionsContext.Provider value={value}>
      {children}
    </TilePositionsContext.Provider>
  );
};

export default TilePositionsProvider;
