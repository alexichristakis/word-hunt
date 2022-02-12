import { GRID_SIZE } from "./constants";

export const indexToCoordinates = (index: number) => [
  Math.floor(index / GRID_SIZE),
  index % GRID_SIZE,
];
