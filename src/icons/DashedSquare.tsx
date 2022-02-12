import { FC } from "react";

const DashedSquare: FC = () => {
  const dashes = "2 4 4 4 2";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <line
        x1="0"
        x2="0"
        y2="16"
        stroke="currentColor"
        strokeDasharray={dashes}
      />
      <line
        x1="16"
        y1="0"
        x2="0"
        y2="0"
        stroke="currentColor"
        strokeDasharray={dashes}
      />
      <line
        x1="16"
        y1="16"
        x2="0"
        y2="16"
        stroke="currentColor"
        strokeDasharray={dashes}
      />
      <line
        x1="16"
        y1="16"
        x2="16"
        y2="0"
        stroke="currentColor"
        strokeDasharray={dashes}
      />
    </svg>
  );
};

export default DashedSquare;
