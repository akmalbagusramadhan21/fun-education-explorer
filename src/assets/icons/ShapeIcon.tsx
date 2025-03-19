
import React from 'react';

const ShapeIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="24" cy="24" r="20" fill="#98D8AA" />
      <path
        d="M24 15L31 28H17L24 15Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="18"
        y="24"
        width="12"
        height="8"
        rx="1"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};

export default ShapeIcon;
