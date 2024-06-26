import { GRID_SIZE } from "./constants";
import { Letter } from "./letters";
import { scoreWords } from "./score";
import { Trie, TrieNode } from "./Trie";
import { coordinatesToIndex, indexToCoordinates } from "./utils";

const solver = (
  grid: Letter[],
  trie: Trie
): [foundWords: Set<string>, score: number] => {
  const startTime = performance.now();
  const foundWords = new Set<string>();

  const visit = (
    index: number,
    visited: Set<number>,
    word: string,
    root?: TrieNode
  ) => {
    if (!root) {
      return;
    }

    visited.add(index);
    const letter = grid[index];
    word = word + letter;

    if (root.valid) {
      foundWords.add(word);
    }

    const [row, col] = indexToCoordinates(index);
    for (
      let nextRow = row - 1;
      nextRow <= row + 1 && nextRow < GRID_SIZE;
      nextRow++
    ) {
      for (
        let nextCol = col - 1;
        nextCol <= col + 1 && nextCol < GRID_SIZE;
        nextCol++
      ) {
        const nextIndex = coordinatesToIndex(nextRow, nextCol);
        const nextLetter = grid[nextIndex];

        const inBounds = nextRow >= 0 && nextCol >= 0;
        const notInWord = visited.has(nextIndex) && root.children[nextLetter];

        if (inBounds && !notInWord) {
          visit(nextIndex, new Set(visited), word, root.children[nextLetter]);
        }
      }
    }
  };

  grid.forEach((firstLetter, index) => {
    const root = trie[firstLetter];
    visit(index, new Set(), "", root);
  });

  console.log(`solver: ${(performance.now() - startTime).toFixed(2)}ms`);
  return [foundWords, scoreWords(foundWords)];
};

export default solver;
