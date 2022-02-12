import { FC } from "react";

const Grid: FC = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <line x1="3.5" x2="3.5" y2="16" stroke="currentColor" />
      <line x1="16" y1="3.5" x2="-2.18557e-08" y2="3.5" stroke="currentColor" />
      <line x1="8" x2="8" y2="16" stroke="currentColor" />
      <line x1="16" y1="8" x2="-2.18557e-08" y2="8" stroke="currentColor" />
      <line x1="12.5" x2="12.5" y2="16" stroke="currentColor" />
      <line
        x1="16"
        y1="12.5"
        x2="-2.18557e-08"
        y2="12.5"
        stroke="currentColor"
      />
    </svg>
  );
};

export default Grid;
