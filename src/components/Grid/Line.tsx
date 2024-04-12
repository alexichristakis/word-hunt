import { animated, SpringValue, to } from "@react-spring/web";
import { FC, useMemo } from "react";
import { TilePositions } from "context/TilePositions/context";
import useWindowSize from "hooks/useWindowSize";
import styles from "./Line.module.scss";

export type LineProps = {
  word: Set<number>;
  gridSize: SpringValue<number>;
  dragX: SpringValue<number>;
  dragY: SpringValue<number>;
  tilePositions: TilePositions;
};

type Point = {
  x: SpringValue<number>;
  y: SpringValue<number>;
};

type EdgeProps = {
  p1: Point;
  p2: Point;
};

const SEGMENT_STROKE_WIDTH = 12;

const Segment: FC<EdgeProps> = ({ p1, p2 }) => {
  const width = to([p1.x, p1.y, p2.x, p2.y], (x1, y1, x2, y2) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  );

  const transform = to(
    [width, p1.x, p1.y, p2.x, p2.y],
    (width, x1, y1, x2, y2) => {
      const rotation = Math.atan2(y2 - y1, x2 - x1);
      const origin = width / 2;
      return `translateX(${-origin}px) rotateZ(${rotation}rad) translateX(${origin}px)`;
    }
  );

  return (
    <animated.div
      className={styles.segment}
      style={{
        position: "absolute",
        left: p1.x,
        top: p1.y,
        height: SEGMENT_STROKE_WIDTH,
        borderRadius: SEGMENT_STROKE_WIDTH / 2,
        width,
        transform,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    />
  );
};

const Line: FC<LineProps> = ({
  tilePositions,
  gridSize,
  word,
  dragX,
  dragY,
}) => {
  const { width, height } = useWindowSize();

  const segments = useMemo(() => {
    const tiles = Array.from(word.keys());
    const lastTile = tiles.length - 1;
    const vertices = tiles.map((tile) => tilePositions[tile]);

    const pointer = { x: dragX, y: dragY };
    return vertices.map((vertex, index) => [
      vertex,
      index === lastTile ? pointer : vertices[index + 1],
    ]);
  }, [word, dragX, tilePositions, dragY]);

  const top = to(
    [height, gridSize],
    (height, gridSize) => (height - gridSize) / 2 - SEGMENT_STROKE_WIDTH / 2
  );

  const left = to(
    [width, gridSize],
    (width, gridSize) => (width - gridSize) / 2
  );

  return (
    <animated.div className={styles.main} style={{ width, height }}>
      <animated.div className={styles.segments} style={{ top, left, width: gridSize, height: gridSize }}>
        {segments.map(([p1, p2], key) => (
          <Segment key={`${key}/${segments.length}`} p1={p1} p2={p2} />
        ))}
      </animated.div>
    </animated.div>
  );
};

export default Line;
