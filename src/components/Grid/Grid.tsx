import { useSpring } from "@react-spring/web";
import classNames from "classnames/bind";
import { FC, useRef, useState } from "react";
import { indexToCoordinates } from "../../common/utils";
import useGrid from "../../context/Grid/useGrid";
import useTilePositions from "../../context/TilePositions/useTilePositions";
import useSetWord from "../../context/Word/useSetWord";
import useWord from "../../context/Word/useWord";
import useCallbackRef from "../../hooks/useCallbackRef";
import styles from "./Grid.module.scss";
import Line from "./Line";
import Tile from "./Tile";

const cx = classNames.bind(styles);

const Grid: FC = () => {
  const grid = useGrid();
  const gridRef = useRef<HTMLUListElement>(null);
  const word = useWord();
  const setWord = useSetWord();
  const [activeLetter, setActiveLetter] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const gridOffset = useRef({ x: 0, y: 0 });
  const [{ dragX, dragY }] = useSpring(() => ({ dragX: 0, dragY: 0 }));
  const { gridSize, tileSize, tilePositions } = useTilePositions();

  const handleDragStart = useCallbackRef((index: number) => {
    if (dragging) {
      return;
    }

    const gridRect = gridRef.current?.getBoundingClientRect();
    if (gridRect) {
      gridOffset.current = gridRect;
    }

    setActiveLetter(index);
    setWord(new Set([index]));
    setDragging(true);
  });

  const handleDrag = useCallbackRef((px: number, py: number) => {
    if (!dragging || activeLetter === null) {
      return;
    }

    px -= gridOffset.current.x;
    py -= gridOffset.current.y;

    dragX.set(px);
    dragY.set(py);

    const [activeLetterRow, activeLetterColumn] =
      indexToCoordinates(activeLetter);

    tilePositions.forEach(({ x, y }, tileIndex) => {
      if (word.has(tileIndex)) {
        return;
      }

      const [row, column] = indexToCoordinates(tileIndex);

      // check if valid tile
      if (
        Math.abs(row - activeLetterRow) > 1 ||
        Math.abs(column - activeLetterColumn) > 1
      ) {
        return;
      }

      const cx = x.get();
      const cy = y.get();

      const minX = cx - tileSize.get() / 2;
      const maxX = cx + tileSize.get() / 2;
      const minY = cy - tileSize.get() / 2;
      const maxY = cy + tileSize.get() / 2;

      if (px >= minX && px <= maxX && py >= minY && py <= maxY) {
        const nextWord = new Set(word);
        setWord(nextWord.add(tileIndex));
        setActiveLetter(tileIndex);
      }
    });
  });

  const handleDragEnd = useCallbackRef(() => {
    const tiles = word.keys();
    const joinedWord = Array.from(tiles)
      .map((index) => grid[index])
      .join("");

    console.log(joinedWord);

    setDragging(false);
    setWord(new Set());
    setActiveLetter(null);
  });

  return (
    <main className={styles.main}>
      <Line
        gridSize={gridSize}
        tilePositions={tilePositions}
        dragX={dragX}
        dragY={dragY}
        word={word}
      />
      <ul ref={gridRef} className={styles.grid}>
        {grid.map((letter, index) => (
          <Tile
            key={index}
            index={index}
            letter={letter}
            inWord={word.has(index)}
            onDragStart={() => handleDragStart(index)}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          />
        ))}
      </ul>
    </main>
  );
};

export default Grid;
