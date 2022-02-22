import { animated, to, SpringValue } from "@react-spring/web";
import { CSSProperties, FC } from "react";
import classNames from "classnames/bind";
import styles from "./Progress.module.scss";

const cx = classNames.bind(styles);

export type ProgressProps = {
  min: number;
  max: number;
  value: number | SpringValue<number>;
  size?: number;
  strokeWidth?: number;
};

const Progress: FC<ProgressProps> = ({
  min,
  max,
  size = 32,
  strokeWidth = 2,
  value,
}) => {
  const halfSize = size / 2;

  const radius = halfSize - strokeWidth / 2;
  const circumference = radius * 2 * Math.PI;

  const offset = to(
    [value],
    (value) => `${(1 - (value - min) / max) * circumference}`
  );

  return (
    <div
      className={styles.main}
      style={
        {
          width: size,
          height: size,
          "--strokeWidth": `${strokeWidth}px`,
        } as CSSProperties
      }
    >
      <svg viewBox={`0 0 ${size} ${size}`}>
        <circle
          className={styles.track}
          r={radius}
          cx={halfSize}
          cy={halfSize}
        />
        <animated.circle
          className={styles.fill}
          strokeDashoffset={offset}
          strokeDasharray={`${circumference} ${circumference}`}
          r={radius}
          cx={halfSize}
          cy={halfSize}
        />
      </svg>
    </div>
  );
};

export default Progress;
