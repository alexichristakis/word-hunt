import { FC } from "react";

const DragHandle: FC = () => {
  return (
    <svg width="16" height="16" fill="none">
      <rect x="5" y="3" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="9" y="3" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="5" y="7" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="9" y="7" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="5" y="11" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="9" y="11" width="2" height="2" rx="0.5" fill="currentColor" />
    </svg>
  );
};

export default DragHandle;
