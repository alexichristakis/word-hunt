export const scoreWord = (word: string): number => (word.length - 2) * 100;

export const scoreWords = (words: Iterable<string>): number =>
  Array.from(words).reduce((score, word) => {
    return score + scoreWord(word);
  }, 0);
