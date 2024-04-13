export const scoreWord = (word: string): number => {
  if (word.length < 5) {
    return 100;
  }

  if (word.length > 7) {
    return word.length * 100;
  }

  return (word.length - 2) * 100;
};

export const scoreWords = (words: Iterable<string>): number => {
  return Array.from(words).reduce((score, word) => score + scoreWord(word), 0);
};
