import { SpringValue, animated, to } from "@react-spring/web";
import {
  createUseGesture,
  dragAction,
  hoverAction,
  moveAction,
} from "@use-gesture/react";
import classNames from "classnames/bind";
import { FC, useEffect, useRef, useState } from "react";
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
  indexInWord: number | null;
  onDragStart?: (xy: [number, number]) => void;
  onDrag?: (xy: [number, number]) => void;
  onDragEnd?: () => void;
};

const Tile: FC<TileProps> = ({
  status = "none",
  letter,
  gridRotation,
  indexInWord,
  onDrag,
  onDragStart,
  onDragEnd,
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const tileSize = useTileSize();
  const [transitionDelay, setTransitionDelay] = useState(0);

  useEffect(() => {
    // we only want the delay to apply to the letter release
    requestAnimationFrame(() => setTransitionDelay((indexInWord ?? 0) * 25));
  }, [indexInWord]);

  useGesture(
    {
      onDragStart: ({ xy }) => onDragStart?.(xy),
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

  const dimensions = { width: tileSize, height: tileSize };
  return (
    <animated.li
      ref={ref}
      className={cx("main", status)}
      style={{ transform: rotationTransform, ...dimensions }}
    >
      <animated.span
        className={cx("face", status)}
        style={{ transitionDelay: `${transitionDelay}ms`, ...dimensions }}
      >
        <animated.span
          className={cx("letter")}
          style={{ transform: scaleTransform }}
        >
          {letter}
        </animated.span>
      </animated.span>
    </animated.li>
  );
};

export default Tile;
