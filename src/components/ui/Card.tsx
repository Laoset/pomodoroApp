import React from "react";
interface CardProps {
  children?: React.ReactNode;
  className?: string;
}
const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`rounded-lg border-gray-50 bg-white/70 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
