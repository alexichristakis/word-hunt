import { animated, SpringValue } from "@react-spring/web";
import { FC, useMemo } from "react";
import styles from "./Line.module.scss";
import { TilePositions } from "../../context/TilePositions/context";

export type LineProps = {
  word: Set<number>;
  gridSize: SpringValue<number>;
  dragX: SpringValue<number>;
  dragY: SpringValue<number>;
  tilePositions: TilePositions;
};

const Line: FC<LineProps> = ({
  tilePositions,
  gridSize,
  word,
  dragX,
  dragY,
}) => {
  const edges = useMemo(() => {
    const tiles = Array.from(word.keys());
    const lastTile = tiles.length - 1;
    const vertices = tiles.map((tile) => tilePositions[tile]);

    const pointer = { x: dragX, y: dragY };
    return vertices.map((vertex, index) => [
      vertex,
      index === lastTile ? pointer : vertices[index + 1],
    ]);
  }, [word, dragX, tilePositions, dragY]);

  return (
    <animated.svg
      viewBox={gridSize.to((size) => `0 0 ${size} ${size}`)}
      className={styles.main}
      style={{ width: gridSize, height: gridSize }}
    >
      {edges.map(([p1, p2], key) => (
        <animated.line
          key={key}
          x1={p1.x}
          x2={p2.x}
          y1={p1.y}
          y2={p2.y}
          strokeWidth={12}
          strokeLinecap="round"
          stroke="rgba(0, 0, 0, 0.5)"
        />
      ))}
    </animated.svg>
  );
};

export default Line;
