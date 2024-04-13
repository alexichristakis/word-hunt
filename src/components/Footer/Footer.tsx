import classNames from "classnames/bind";
import useTilePositions from "context/TilePositions/useTilePositions";
import { FC } from "react";
import DragHandle from "./DragHandle";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

const Footer: FC = () => {
  const { gridSize, gridRotation } = useTilePositions();

  return (
    <footer className={cx("main")}>
      <DragHandle gridSize={gridSize} gridRotation={gridRotation} />
    </footer>
  );
};

export default Footer;
