import { animated, to } from "@react-spring/web";
import classNames from "classnames/bind";
import { FC, useMemo } from "react";
import measureText from "../../common/measureText";
import useCurrentWord from "../../hooks/useCurrentWord";
import useWindowSize from "../../hooks/useWindowSize";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const Header: FC = () => {
  const currentWord = useCurrentWord().toUpperCase();

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
    <header className={cx("main")}>
      <animated.div className={cx("word")} style={{ transform: wordScale }}>
        <span>{currentWord}</span>
      </animated.div>
    </header>
  );
};

export default Header;
