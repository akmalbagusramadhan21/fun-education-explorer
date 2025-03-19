
import React from 'react';

const NumberIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="24" cy="24" r="20" fill="#7ACBF1" />
      <path
        d="M16 16H32M24 16V32M18 24H30M18 32H30"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NumberIcon;
