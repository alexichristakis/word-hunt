import { SpringValue } from "@react-spring/web";
import { createContext } from "react";

export type TilePositions = {
  x: SpringValue<number>;
  y: SpringValue<number>;
}[];

export type TilePositionsContextShape = {
  gridSize: SpringValue<number>;
  tileSize: SpringValue<number>;
  tilePositions: TilePositions;
};

export const TilePositionsContext = createContext<TilePositionsContextShape>({
  gridSize: new SpringValue(0),
  tileSize: new SpringValue(0),
  tilePositions: [],
});
