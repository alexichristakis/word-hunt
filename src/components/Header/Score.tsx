import { FC, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Score.module.scss";
import useFoundWords from "../../context/FoundWords/useFoundWords";
import { scoreWords } from "common/score";
import { animated, useSpring } from "@react-spring/web";

const cx = classNames.bind(styles);

const Score: FC = () => {
  const [foundWords] = useFoundWords();
  const [counting, setCounting] = useState(false);

  const [{ score }] = useSpring(
    {
      from: { score: 0 },
      score: scoreWords(foundWords),
      delay: 200,
      onStart: () => setCounting(true),
      onRest: () => setCounting(false),
    },
    [foundWords]
  );

  return (
    <div className={cx("main")}>
      <animated.span className={cx("score", { counting })}>
        {score.to((score) => Number(score.toFixed(0)).toLocaleString())}
      </animated.span>
    </div>
  );
};

export default Score;
