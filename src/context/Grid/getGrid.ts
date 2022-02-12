import seedrandom from "seedrandom";
import { Letter } from "../../common/letters";

export const LETTER_FREQUENCIES: Record<Letter, number> = {
  a: 9,
  b: 2,
  c: 2,
  d: 4,
  e: 12,
  f: 2,
  g: 3,
  h: 2,
  i: 9,
  j: 1,
  k: 1,
  l: 4,
  m: 2,
  n: 6,
  o: 8,
  p: 2,
  q: 1,
  r: 6,
  s: 4,
  t: 6,
  u: 4,
  v: 2,
  w: 2,
  x: 1,
  y: 2,
  z: 1,
};

const LETTERS = Object.entries(LETTER_FREQUENCIES).flatMap(
  ([letter, frequency]) => new Array<Letter>(frequency).fill(letter as Letter)
);

const random = (i: number) => {
  const date = new Date().toDateString();
  return seedrandom(`${date}--${i}`)();
};

const pickLetter = (i: number) => {
  const index = Math.floor(random(i) * LETTERS.length);
  return LETTERS[index];
};

/**  */
const getGrid = (): Letter[] => {
  return new Array(4 * 4).fill(null).map((_, index) => pickLetter(index));
};

export default getGrid;
