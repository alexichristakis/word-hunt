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
    word += letter;

    if (root.valid) {
      foundWords.add(word);
    }

    const [row, col] = indexToCoordinates(index);
    for (let i = row - 1; i <= row + 1 && i < GRID_SIZE; i++) {
      for (let j = col - 1; j <= col + 1 && j < GRID_SIZE; j++) {
        const index = coordinatesToIndex(i, j);
        const letter = grid[index];
        if (
          i >= 0 &&
          j >= 0 &&
          !visited.has(coordinatesToIndex(i, j)) &&
          root.children[letter]
        ) {
          visit(index, new Set(visited), word, root.children[letter]);
        }
      }
    }
  };

  grid.forEach((firstLetter, index) => {
    let root = trie[firstLetter];
    visit(index, new Set(), "", root);
  });

  console.log("solver:", performance.now() - startTime);
  return [foundWords, scoreWords(foundWords)];
};

export default solver;
