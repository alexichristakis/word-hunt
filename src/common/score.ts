export const scoreWord = (word: string): number => {
  return word.length * 10;
};

export const scoreWords = (words: Iterable<string>): number => {
  return Array.from(words).reduce((score, word) => {
    return score + scoreWord(word);
  }, 0);
};
