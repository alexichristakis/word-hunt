import { useSpring } from "@react-spring/web";
import { CSSProperties, FC, useRef, useState } from "react";
import { indexToCoordinates } from "common/utils";
import useGrid from "context/Grid/useGrid";
import useTilePositions from "context/TilePositions/useTilePositions";
import useWord from "context/Word/useWord";
import useCallbackRef from "hooks/useCallbackRef";
import styles from "./Grid.module.scss";
import Line from "./Line";
import Tile from "./Tile";
import useCurrentWord from "hooks/useCurrentWord";
import useFoundWords from "context/FoundWords/useFoundWords";
import { GRID_SIZE } from "common/constants";

const Grid: FC = () => {
  const { grid } = useGrid();
  const gridRef = useRef<HTMLOListElement>(null);
  const { word: currentWord, valid } = useCurrentWord();
  const [word, setWord] = useWord();
  const [foundWords, setFoundWords] = useFoundWords();
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

      const buffer = 8;
      const minX = cx - tileSize.get() / 2 + buffer;
      const maxX = cx + tileSize.get() / 2 - buffer;
      const minY = cy - tileSize.get() / 2 + buffer;
      const maxY = cy + tileSize.get() / 2 - buffer;

      if (px >= minX && px <= maxX && py >= minY && py <= maxY) {
        const nextWord = new Set(word);
        setWord(nextWord.add(tileIndex));
        setActiveLetter(tileIndex);
      }
    });
  });

  const handleDragEnd = useCallbackRef(() => {
    setDragging(false);
    setWord(new Set());
    setActiveLetter(null);

    if (valid) {
      setFoundWords(new Set([...foundWords.keys(), currentWord]));
    }
  });

  const wordStatus = foundWords.has(currentWord)
    ? "foundWord"
    : valid
    ? "validWord"
    : "inWord";

  return (
    <main className={styles.main}>
      <Line
        gridSize={gridSize}
        tilePositions={tilePositions}
        dragX={dragX}
        dragY={dragY}
        word={word}
      />
      <ol
        ref={gridRef} 
        className={styles.grid}
        style={{ "--grid-columns": GRID_SIZE } as CSSProperties}
      >
        {grid.map((letter, index) => (
          <Tile
            key={index}
            letter={letter}
            status={word.has(index) ? wordStatus : "none"}
            onDragStart={() => handleDragStart(index)}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          />
        ))}
      </ol>
    </main>
  );
};

export default Grid;
