import { FC } from "react";
import classNames from "classnames/bind";
import styles from "./Score.module.scss";
import useFoundWords from "context/FoundWords/useFoundWords";
import { scoreWords } from "common/score";
import { animated, useSpring } from "@react-spring/web";
import Progress from "components/common/Progress";
import useGrid from "context/Grid/useGrid";
import BezierEasing from "bezier-easing";

const cx = classNames.bind(styles);

const easing = BezierEasing(0.07, 0.7, 0, 0.97);

const Score: FC = () => {
  const [foundWords] = useFoundWords();
  const { maxScore } = useGrid();

  const [{ score }] = useSpring(
    {
      from: { score: 0 },
      score: scoreWords(foundWords),
      config: { duration: 2000, easing },
    },
    [foundWords]
  );

  return (
    <div className={cx("main")}>
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
