import { Letter } from "./letters";

export type TrieNode = {
  valid: boolean;
  children: { [letter in Letter]?: TrieNode };
};

export type Trie = { [letter in Letter]?: TrieNode };

const makeNode = (valid = false): TrieNode => ({ valid, children: {} });

export const makeTrie = (words: Iterable<string>) => {
  return [...words].reduce<Trie>((trie, _word) => {
    const word = [..._word] as Letter[];

    const firstLetter = word[0];

    let wordRoot = trie[firstLetter] ?? makeNode();
    let root: TrieNode | null = null;
    word.forEach((letter, i) => {
      if (i === 0 || !root) {
        root = wordRoot;
      } else {
        root.children[letter] ??= makeNode();
        root = root.children[letter] ?? makeNode();
      }

      const valid = i === word.length - 1;
      root.valid ||= valid;
    });

    trie[firstLetter] = wordRoot;
    return trie;
  }, {});
};

export const checkWord = (_word: string, trie: Trie) => {
  const word = [..._word] as Letter[];
  let root = trie[word[0]];
  for (const letter of word.slice(1)) {
    root = root?.children[letter];
  }

  return !!root?.valid;
};
