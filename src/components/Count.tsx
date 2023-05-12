import React from "react";
import "./Count.css";
interface CircleProps {
  timing: number;
}
const Circle: React.FC<CircleProps> = ({ timing }) => {
  const strokeWidth = 10;
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = circumference - (timing / 100) * circumference;
  return (
    <div>
      <svg className="circle" width="100" height="100">
        <circle
          className="circle-background"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="circle-progress"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />
        <text className="circle-text" x="50" y="50">
          {timing}
        </text>
      </svg>
    </div>
  );
};

export default Circle;
