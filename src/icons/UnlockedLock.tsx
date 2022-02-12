import { FC } from "react";

const LockedLock: FC = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="5" y="8" width="10" height="8" rx="0.5" fill="currentColor" />
      <path
        d="M1 8L1 3C1 1.89543 1.89543 1 3 1H4H5C6.10457 1 7 1.89543 7 3V8"
        stroke="currentColor"
      />
    </svg>
  );
};

export default LockedLock;
