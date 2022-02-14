import { animated, to } from "@react-spring/web";
import classNames from "classnames/bind";
import styles from "./CurrentWord.module.scss";
import { FC, useMemo } from "react";
import measureText from "../../common/measureText";
import useCurrentWord from "../../hooks/useCurrentWord";
import useWindowSize from "../../hooks/useWindowSize";

const cx = classNames.bind(styles);

const CurrentWord: FC = () => {
  const currentWord = useCurrentWord();

  const wordWidth = useMemo(
    () => measureText(currentWord, 72) ?? 0,
    [currentWord]
  );

  const { width } = useWindowSize();

  const wordScale = to(
    [width, wordWidth],
    (width, wordWidth) => `scale(${Math.min(1, (width - 40) / wordWidth)})`
  );

  return (
    <animated.div className={cx("main")} style={{ transform: wordScale }}>
      <span>{currentWord}</span>
    </animated.div>
  );
};

export default CurrentWord;
