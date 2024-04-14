import { useGesture } from "@use-gesture/react";
import classNames from "classnames/bind";
import { FC, useRef, useState } from "react";
import styles from "./DragHandle.module.scss";
import { SpringValue, animated, to, useSpringValue } from "@react-spring/web";
import { snapPoint } from "common/snapPoint";

const cx = classNames.bind(styles);

type DragHandleProps = {
  gridSize: SpringValue<number>;
  gridRotation: SpringValue<number>;
};

const DragHandle: FC<DragHandleProps> = ({ gridSize, gridRotation }) => {
  const ref = useRef<HTMLDivElement>(null);
  const xOffset = useSpringValue(0);
  const initialRotation = useRef(gridRotation.get());
  const [isDragging, setIsDragging] = useState(false);

  useGesture(
    {
      onDragStart: () => {
        setIsDragging(true);
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
        setIsDragging(false);
      },
    },
    { target: ref }
  );

  return (
    <animated.div
      className={styles.main}
      role="drag"
      style={{
        transform: to([xOffset], (xOffset) => ` translateX(${xOffset}px)`),
      }}
    >
      <animated.div ref={ref} className={cx("dot", { isDragging })} />
    </animated.div>
  );
};

export default DragHandle;
