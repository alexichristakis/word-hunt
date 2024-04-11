// TODO
export const scoreWord = (word: string): number => (word.length - 2) * 100;

export const scoreWords = (words: Iterable<string>): number => {
  return Array.from(words).reduce((score, word) => score + scoreWord(word), 0);
};
