import { animated } from "@react-spring/web";
import {
  createUseGesture,
  dragAction,
  hoverAction,
  moveAction,
} from "@use-gesture/react";
import classNames from "classnames/bind";
import { FC, useRef } from "react";
import { Letter } from "../../common/letters";
import useTileSize from "../../context/TilePositions/useTileSize";
import styles from "./Tile.module.scss";

const useGesture = createUseGesture([dragAction, hoverAction, moveAction]);

const cx = classNames.bind(styles);

export type TileStatus = "none" | "inWord" | "foundWord" | "validWord";

type TileProps = {
  status: TileStatus;
  letter: Letter;
  onDragStart?: () => void;
  onDrag?: (x: number, y: number) => void;
  onDragEnd?: () => void;
};

const Tile: FC<TileProps> = ({
  status = "none",
  letter,
  onDrag,
  onDragStart,
  onDragEnd,
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const tileSize = useTileSize();

  useGesture(
    {
      onDragStart,
      onDrag: ({ xy: [x, y] }) => onDrag?.(x, y),
      onDragEnd,
    },
    {
      target: ref,
      eventOptions: { passive: true },
      drag: { pointer: { capture: false } },
    }
  );

  const transform = tileSize.to((size) => `scale(${size / 48})`);
  return (
    <li ref={ref} className={cx("main", status)}>
      <span className={cx("face", status)}>
        <animated.span className={cx("letter")} style={{ transform }}>
          {letter}
        </animated.span>
      </span>
    </li>
  );
};

export default Tile;
