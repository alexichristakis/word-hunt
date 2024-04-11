import { FC } from "react";
import classNames from "classnames/bind";
import styles from "./Score.module.scss";
import useFoundWords from "context/FoundWords/useFoundWords";
import { scoreWords } from "common/score";
import { animated, useSpring } from "@react-spring/web";
import Progress from "components/common/Progress";
import useGrid from "context/Grid/useGrid";
import BezierEasing from "bezier-easing";
import useCallbackRef from "hooks/useCallbackRef";
import formatScoreForClipboard from "common/formatScoreForClipboard";

const cx = classNames.bind(styles);

const easing = BezierEasing(0.07, 0.7, 0, 0.97);

const Score: FC = () => {
  const [foundWords] = useFoundWords();
  const { allWords, maxScore } = useGrid();

  const handleClick = useCallbackRef(async () => {
    const formattedScore = formatScoreForClipboard(
      foundWords,
      allWords ?? new Set<string>()
    );

    await navigator.clipboard.writeText(formattedScore);
  });

  const [{ score }] = useSpring(
    {
      from: { score: 0 },
      score: scoreWords(foundWords),
      config: { duration: 2000, easing },
    },
    [foundWords]
  );

  return (
    <div role="button" className={cx("main")} onClick={handleClick}>
      <span className={cx("score")}>
        <animated.span className={cx("number")}>
          {score.to((score) => Number(score.toFixed(0)).toLocaleString())}
        </animated.span>
        <Progress min={0} max={maxScore ?? Infinity} value={score} />
      </span>
    </div>
  );
};

export default Score;
