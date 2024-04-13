import { SpringValue } from "@react-spring/web";
import { GRID_SIZE } from "./constants";

export const indexToCoordinates = (index: number, gridRotation: number = 0) => {
  const rotation = (((gridRotation / (Math.PI / 2)) % 4) + 4) % 4;
  const row = Math.floor(index / GRID_SIZE);
  const column = index % GRID_SIZE;

  if (rotation === 1) {
    return [column, GRID_SIZE - 1 - row];
  } else if (rotation === 2) {
    return [GRID_SIZE - 1 - row, GRID_SIZE - 1 - column];
  } else if (rotation === 3) {
    return [GRID_SIZE - 1 - column, row];
  }

  return [row, column];
};

export const coordinatesToIndex = (row: number, column: number) =>
  row * GRID_SIZE + column;
