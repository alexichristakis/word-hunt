import { useGesture } from "@use-gesture/react";
import classNames from "classnames/bind";
import { FC, useRef, useState } from "react";
import styles from "./DragHandle.module.scss";
import { SpringValue, animated, to, useSpringValue } from "@react-spring/web";
import { snapPoint } from "common/snapPoint";
import IconRotate from "./IconRotate";
import clamp from "common/clamp";
import mix from "common/mix";

const cx = classNames.bind(styles);

type DragHandleProps = {
  gridSize: SpringValue<number>;
  gridRotation: SpringValue<number>;
};

const DragHandle: FC<DragHandleProps> = ({ gridSize, gridRotation }) => {
  const ref = useRef<HTMLDivElement>(null);
  const xOffset = useSpringValue(0);
  const iconOpacity = useSpringValue(0);
  const initialRotation = useRef(gridRotation.get());
  const [isDragging, setIsDragging] = useState(false);

  useGesture(
    {
      onDragStart: () => {
        setIsDragging(true);
        iconOpacity.start(0.5);
        initialRotation.current = gridRotation.get();
      },
      onDrag: ({ delta }) => {
        const [deltaX] = delta;
        xOffset.set(xOffset.get() + deltaX);

        const rotationDelta = -(xOffset.get() / gridSize.get()) * (Math.PI / 2);

        gridRotation.set(initialRotation.current + rotationDelta);
      },
      onDragEnd: ({ velocity: [vx] }) => {
        const currentOffset = xOffset.get();

        const point = snapPoint(currentOffset, vx, [
          -gridSize.get() / 2,
          0,
          gridSize.get() / 2,
        ]);

        if (point > 0) {
          gridRotation.start(initialRotation.current - Math.PI / 2);
        } else if (point < 0) {
          gridRotation.start(initialRotation.current + Math.PI / 2);
        } else {
          gridRotation.start(initialRotation.current);
        }

        xOffset.start(0);
        iconOpacity.start(0);
        setIsDragging(false);
      },
    },
    { target: ref }
  );

  const minOffset = to([gridSize], (gridSize) => -gridSize / 2 + 8);
  const maxOffset = to([gridSize], (gridSize) => gridSize / 2 - 8);

  const clampedOffset = to(
    [xOffset, minOffset, maxOffset],
    (xOffset, min, max) => clamp(xOffset, min, max)
  );

  const transform = to([clampedOffset, gridSize], (offset) => {
    return `translateX(${offset}px)`;
  });

  const rightIconOpacity = to(
    [iconOpacity, clampedOffset, maxOffset],
    (opacity, clampedOffset, max) =>
      opacity + mix(clampedOffset, [0, max], [0, 0.5])
  );

  const leftIconOpacity = to(
    [iconOpacity, clampedOffset, minOffset],
    (opacity, clampedOffset, min) =>
      opacity + mix(clampedOffset, [min, 0], [0.5, 0])
  );

  return (
    <animated.div className={styles.main} style={{ width: gridSize }}>
      <animated.div
        className={cx("rotateIcon", { isDragging })}
        style={{ opacity: leftIconOpacity }}
      >
        <IconRotate direction="left" />
      </animated.div>
      <animated.div role="drag" style={{ transform }}>
        <animated.div ref={ref} className={cx("dot", { isDragging })} />
      </animated.div>
      <animated.div
        className={cx("rotateIcon", { isDragging })}
        style={{ opacity: rightIconOpacity }}
      >
        <IconRotate direction="right" />
      </animated.div>
    </animated.div>
  );
};

export default DragHandle;
