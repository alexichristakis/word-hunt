import seedrandom from "seedrandom";
import { Letter } from "common/letters";
import { GRID_SIZE } from "common/constants";

const DICE_5x5: [Letter, Letter, Letter, Letter, Letter, Letter][] = [
  ["a", "a", "a", "f", "r", "s"],
  ["a", "a", "e", "e", "e", "e"],
  ["a", "a", "f", "i", "r", "s"],
  ["a", "d", "e", "n", "n", "n"],
  ["a", "e", "e", "e", "e", "m"],
  ["a", "e", "e", "g", "m", "u"],
  ["a", "e", "g", "m", "n", "n"],
  ["a", "f", "i", "r", "s", "y"],
  ["b", "j", "k", "qu", "x", "z"],
  ["c", "c", "e", "n", "s", "t"],
  ["c", "e", "i", "i", "l", "t"],
  ["c", "e", "i", "l", "p", "t"],
  ["c", "e", "i", "p", "s", "t"],
  ["d", "d", "h", "n", "o", "t"],
  ["d", "h", "h", "l", "o", "r"],
  ["d", "h", "l", "n", "o", "r"],
  ["d", "h", "l", "n", "o", "r"],
  ["e", "i", "i", "i", "t", "t"],
  ["e", "m", "o", "t", "t", "t"],
  ["e", "n", "s", "s", "s", "u"],
  ["f", "i", "p", "r", "s", "y"],
  ["g", "o", "r", "r", "v", "w"],
  ["i", "p", "r", "r", "r", "y"],
  ["n", "o", "o", "t", "u", "w"],
  ["o", "o", "o", "t", "t", "u"],
];

const random = (seed: number | string, max = 1) => {
  const rand = seedrandom(`${seed}`)();
  return Math.floor(rand * max);
};

const getGrid = (seed: string): Letter[] => {
  const grid = new Array(GRID_SIZE * GRID_SIZE).fill(null);

  const dice = DICE_5x5.concat();

  for (const index of grid.keys()) {
    // choose a die
    const chosenDieIndex = random(`${seed}-${index}-die`, dice.length);
    const die = dice[chosenDieIndex];

    // remove it
    dice.splice(chosenDieIndex, 1);

    // choose a letter
    const chosenLetterIndex = random(`${seed}-${index}-letter`, die.length);
    grid[index] = die[chosenLetterIndex];
  }

  return grid;
};

export default getGrid;
