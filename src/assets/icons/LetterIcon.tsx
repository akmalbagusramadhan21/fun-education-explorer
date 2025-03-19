
import React from 'react';

const LetterIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="24" cy="24" r="20" fill="#FFB6C1" />
      <path
        d="M17 32V16H31M17 24H27"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LetterIcon;
