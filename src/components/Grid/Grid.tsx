import { animated, to, useSpring } from "@react-spring/web";
import { GRID_MARGIN, GRID_SIZE } from "common/constants";
import { indexToCoordinates } from "common/utils";
import useFoundWords from "context/FoundWords/useFoundWords";
import useGrid from "context/Grid/useGrid";
import useTilePositions from "context/TilePositions/useTilePositions";
import useWord from "context/Word/useWord";
import useCallbackRef from "hooks/useCallbackRef";
import useCurrentWord from "hooks/useCurrentWord";
import { CSSProperties, FC, useRef, useState } from "react";
import styles from "./Grid.module.scss";
import Line from "./Line";
import Tile from "./Tile";

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
  const { gridSize, tileSize, gridRotation, gridGap, tilePositions } =
    useTilePositions();

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

    const [activeLetterRow, activeLetterColumn] = indexToCoordinates(
      activeLetter,
      gridRotation.get()
    );

    tilePositions.forEach(({ x, y }, tileIndex) => {
      if (word.has(tileIndex)) {
        return;
      }

      const [row, column] = indexToCoordinates(tileIndex, gridRotation.get());

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
    <main
      className={styles.main}
      style={
        {
          "--grid-columns": GRID_SIZE,
          "--grid-margin": `${GRID_MARGIN}px`,
        } as CSSProperties
      }
    >
      <Line
        gridSize={gridSize}
        tilePositions={tilePositions}
        dragX={dragX}
        dragY={dragY}
        word={word}
      />
      <animated.ol
        ref={gridRef}
        className={styles.grid}
        style={{
          transform: to(
            [gridRotation],
            (rotation) => `rotateZ(${rotation}rad)`
          ),
          width: gridSize,
          maxWidth: gridSize,
          gap: gridGap,
        }}
      >
        {grid.map((letter, index) => (
          <Tile
            key={index}
            letter={letter}
            status={word.has(index) ? wordStatus : "none"}
            onDragStart={() => handleDragStart(index)}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            gridRotation={gridRotation}
          />
        ))}
      </animated.ol>
    </main>
  );
};

export default Grid;
