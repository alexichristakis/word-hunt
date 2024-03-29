import { FC } from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

const Footer: FC = () => {
  return <footer className={cx("main")}></footer>;
};

export default Footer;
