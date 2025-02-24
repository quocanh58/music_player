import React from "react";
import "./processCircle.css";

const Circle = ({ color, percentage, size, strokeWidth }) => {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const strokePct = (1 - percentage / 100) * circumference;

  return (
    <circle
      r={radius}
      cx="50%"
      cy="50%"
      fill="transparent"
      stroke={percentage > 0 ? color : "transparent"}
      strokeWidth={strokeWidth}
      strokeDasharray={circumference}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

export default function ProcessCircle({ percentage, isPlaying, size, color }) {
  return (
    <div className="progress-circle">
      <svg width={size} height={size}>
        <defs>
          <clipPath id="myCircle">
            <circle cx="50%" cy="50%" r={size / 2 - 30} fill="#ffffff" />
          </clipPath>
          <clipPath id="myInnerCircle">
            <circle cx="50%" cy="50%" r={size / 2 - 100} fill="#ffffff" />
          </clipPath>
        </defs>
        <g>
          <Circle
            strokeWidth="4"
            color="#3B4D73"
            percentage={100}
            size={size}
          />
          <Circle
            strokeWidth="6"
            color={color || "#C96850"}
            percentage={percentage}
            size={size}
          />
        </g>
        <image
          className={isPlaying ? "active" : ""}
          x={30}
          y={30}
          width={2 * (size / 2 - 30)}
          height={2 * (size / 2 - 30)}
          href="/images/PNG107.png" // ✅ Sửa href đúng cách
          clipPath="url(#myCircle)" // ✅ Sửa clipPath đúng cách
        ></image>
        <image
          className={isPlaying ? "active" : ""}
          x={100}
          y={100}
          width={2 * (size / 2 - 100)}
          height={2 * (size / 2 - 100)}
          href=""
          clipPath="url(#myInnerCircle)"
        ></image>
      </svg>
    </div>
  );
}
