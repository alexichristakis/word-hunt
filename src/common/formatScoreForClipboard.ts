import getGridSeed from "./getGridSeed";
import { scoreWords } from "./score";

const formatScoreForClipboard = (
  foundWords: Set<string>,
  allWords: Set<string>
): string => {
  const score = scoreWords(foundWords);
  const maxScore = scoreWords(allWords);

  return `🌚 ${getGridSeed()} 🌝

Score: ${score.toLocaleString()} / ${maxScore.toLocaleString()}

Words found: ${foundWords.size.toLocaleString()} / ${allWords.size.toLocaleString()}`;
};

export default formatScoreForClipboard;
