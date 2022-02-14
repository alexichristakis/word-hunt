import classNames from "classnames/bind";
import { FC } from "react";
import CurrentWord from "./CurrentWord";
import styles from "./Header.module.scss";
import Score from "./Score";

const cx = classNames.bind(styles);

const Header: FC = () => {
  return (
    <header className={cx("main")}>
      <div className={cx("content")}>
        <Score />
        <CurrentWord />
      </div>
    </header>
  );
};

export default Header;
