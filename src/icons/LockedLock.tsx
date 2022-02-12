import { FC } from "react";

const LockedLock: FC = () => {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
      <rect y="8" width="10" height="8" rx="0.5" fill="currentColor" />
      <path
        d="M8 8V3C8 1.89543 7.10457 1 6 1H5H4C2.89543 1 2 1.89543 2 3V8"
        stroke="currentColor"
      />
    </svg>
  );
};

export default LockedLock;
