import { FC } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import useCurrentWord from "../../hooks/useCurrentWord";

const cx = classNames.bind(styles);

const Header: FC = () => {
  const currentWord = useCurrentWord();
  return <header className={styles.main}>{currentWord}</header>;
};

export default Header;
