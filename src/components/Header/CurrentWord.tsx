import { animated, to, useSpring } from "@react-spring/web";
import classNames from "classnames/bind";
import styles from "./CurrentWord.module.scss";
import { FC, useEffect, useMemo, useState } from "react";
import measureText from "common/measureText";
import useCurrentWord from "hooks/useCurrentWord";
import useWindowSize from "hooks/useWindowSize";
import { GRID_MAX_WIDTH } from "common/constants";
import useGrid from "context/Grid/useGrid";
import usePreviousDistinctValue from "hooks/usePreviousDistinctValue";

const cx = classNames.bind(styles);

const CurrentWord: FC = () => {
  const { word } = useCurrentWord();
  const { checkWord } = useGrid();

  const previousWord = usePreviousDistinctValue(word) ?? "";
  const [justCommittedInvalidWord, setJustCommittedInvalidWord] =
    useState(false);

  useEffect(() => {
    const justCommittedWord = !word && !!previousWord;
    if (justCommittedWord && !checkWord(previousWord)) {
      setJustCommittedInvalidWord(true);
    } else if (word) {
      setJustCommittedInvalidWord(false);
      shake.set(0);
      shake.stop(true);
    }
  }, [word, previousWord]);

  const activeWord = justCommittedInvalidWord ? previousWord : word;

  const wordWidth = useMemo(
    () => measureText(activeWord, 72) ?? 0,
    [activeWord]
  );

  const { width: windowWidth } = useWindowSize();

  const wordScale = to(
    [windowWidth, wordWidth],
    (windowWidth, wordWidth) =>
      `scale(${Math.min(
        1,
        Math.min(windowWidth - 40, GRID_MAX_WIDTH) / wordWidth
      )})`
  );

  const [{ shake }] = useSpring(
    {
      from: { shake: 0 },
      shake: justCommittedInvalidWord ? 1 : 0,
      config: {
        mass: 1,
        tension: 200,
        friction: 15,
      },
      onRest: () => setJustCommittedInvalidWord(false),
    },
    [justCommittedInvalidWord]
  );

  const translateX = to(shake, [0, 0.33, 0.66, 1], [0, -10, 20, 0]);

  const transform = to(
    [wordScale, translateX],
    (scale, translateX) => `${scale} translateX(${translateX}px)`
  );

  return (
    <animated.div className={cx("main")} style={{ transform }}>
      <span className={cx("word")}>{activeWord}</span>
    </animated.div>
  );
};

export default CurrentWord;
