import React from "react";

const Button = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`font-mono px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_black] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-transform duration-75 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
