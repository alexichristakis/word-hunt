import {
  createUseGesture,
  dragAction,
  hoverAction,
  moveAction,
} from "@use-gesture/react";
import classNames from "classnames/bind";
import { FC, useRef } from "react";
import { Letter } from "../../common/letters";
import styles from "./Tile.module.scss";

const useGesture = createUseGesture([dragAction, hoverAction, moveAction]);

const cx = classNames.bind(styles);

type TileProps = {
  inWord?: boolean;
  index: number;
  letter: Letter;
  onDragStart?: () => void;
  onDrag?: (x: number, y: number) => void;
  onDragEnd?: () => void;
};

const Tile: FC<TileProps> = ({
  index,
  inWord = false,
  letter,
  onDrag,
  onDragStart,
  onDragEnd,
}) => {
  const ref = useRef<HTMLLIElement>(null);

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

  return (
    <li ref={ref} className={cx("main", { inWord })}>
      {letter}
    </li>
  );
};

export default Tile;
