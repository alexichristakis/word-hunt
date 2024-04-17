import { SpringValue, animated, to } from "@react-spring/web";
import {
  createUseGesture,
  dragAction,
  hoverAction,
  moveAction,
} from "@use-gesture/react";
import classNames from "classnames/bind";
import { FC, useRef, useState } from "react";
import { Letter } from "common/letters";
import useTileSize from "context/TilePositions/useTileSize";
import styles from "./Tile.module.scss";

const useGesture = createUseGesture([dragAction, hoverAction, moveAction]);

const cx = classNames.bind(styles);

export type TileStatus = "none" | "inWord" | "foundWord" | "validWord";

type TileProps = {
  status: TileStatus;
  letter: Letter;
  gridRotation: SpringValue<number>;
  onDragStart?: (xy: [number, number]) => void;
  onDrag?: (xy: [number, number]) => void;
  onDragEnd?: () => void;
};

const Tile: FC<TileProps> = ({
  status = "none",
  letter,
  gridRotation,
  onDrag,
  onDragStart,
  onDragEnd,
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const tileSize = useTileSize();

  useGesture(
    {
      onDragStart: ({ xy,  }) => onDragStart?.(xy),
      onDrag: ({ xy }) => onDrag?.(xy),
      onDragEnd,
    },
    {
      target: ref,
      eventOptions: { passive: true },
      drag: { pointer: { capture: false } },
    }
  );

  const scaleTransform = tileSize.to((size) => `scale(${size / 48})`);
  const rotationTransform = to(
    [gridRotation],
    (rotation) => `rotateZ(${-rotation}rad)`
  );

  return (
    <animated.li
      ref={ref}
      className={cx("main", status)}
      style={{ transform: rotationTransform }}
    >
      <span className={cx("face", status)}>
        <animated.span
          className={cx("letter")}
          style={{ transform: scaleTransform }}
        >
          {letter}
        </animated.span>
      </span>
    </animated.li>
  );
};

export default Tile;
