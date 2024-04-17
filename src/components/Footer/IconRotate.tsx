import { FC } from "react";

export type IconRotateProps = {
  direction: "left" | "right";
};

const IconRotate: FC<IconRotateProps> = ({ direction }) => {
  return (
    <svg
      width="16"
      height="16"
      fill="none"
      style={{ transform: `scale(${direction === "right" ? -1 : 1}, 1)` }}
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M1.132.463h4.672c.276 0 .54.11.735.305.195.195.304.459.303.733v4.663c0 .57-.464 1.034-1.038 1.034a1.036 1.036 0 0 1-1.038-1.034V4.117a5.134 5.134 0 0 0-1.012 7.204 5.187 5.187 0 0 0 7.234 1.02 5.142 5.142 0 0 0 2.014-3.388 5.13 5.13 0 0 0-.978-3.814 1.035 1.035 0 0 1 .206-1.448 1.03 1.03 0 0 1 1.451.205 7.145 7.145 0 0 1 1.457 4.347 7.223 7.223 0 0 1-3.418 6.125 7.284 7.284 0 0 1-7.027.361A7.23 7.23 0 0 1 .658 8.988a7.217 7.217 0 0 1 2.749-6.45H1.132A1.04 1.04 0 0 1 .138 1.5c0-.554.437-1.011.994-1.037Z"
        clip-rule="evenodd"
      />
    </svg>
  );
};

export default IconRotate;
