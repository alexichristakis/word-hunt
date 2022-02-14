import { animated, SpringValue, to } from "@react-spring/web";
import { FC, useMemo } from "react";
import { TilePositions } from "../../context/TilePositions/context";
import useWindowSize from "../../hooks/useWindowSize";
import styles from "./Line.module.scss";

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
  const { width, height } = useWindowSize();

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

  const viewBox = to([width, height, gridSize], (width, height, gridSize) => {
    const minY = (gridSize - height) / 2;
    const minX = (gridSize - width) / 2;
    return `${minX} ${minY} ${width} ${height}`;
  });

  return (
    <animated.svg
      viewBox={viewBox}
      className={styles.main}
      style={{ width, height }}
    >
      {edges.map(([p1, p2], key) => (
        <animated.line
          key={`${key}/${edges.length}`}
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
