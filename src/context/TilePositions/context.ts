import { SpringValue } from "@react-spring/web";
import { createContext } from "react";

export type TilePositions = {
  x: SpringValue<number>;
  y: SpringValue<number>;
}[];

export type TilePositionsContextShape = {
  gridSize: SpringValue<number>;
  gridRotation: SpringValue<number>;
  gridGap: SpringValue<number>;
  tileSize: SpringValue<number>;
  tilePositions: TilePositions;
};

export const TilePositionsContext = createContext<TilePositionsContextShape>({
  gridSize: new SpringValue(0),
  gridRotation: new SpringValue(0),
  gridGap: new SpringValue(0),
  tileSize: new SpringValue(0),
  tilePositions: [],
});
