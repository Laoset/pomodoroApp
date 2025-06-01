import React from "react";

const Button = ({
  children,
  className,
  onClick,
  tooltip,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tooltip?: string;
}) => {
  return (
    <div className="relative group inline-block w-full">
      <button
        className={`cursor-pointer border-2 border-black shadow-[2px_2px_0px_0px_black] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-transform duration-75 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>

      {tooltip && (
        <span
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2
                     bg-black text-white text-xs font-mono px-2 py-1 
                     border-2 border-white shadow-[2px_2px_0px_0px_white] 
                     whitespace-nowrap opacity-0 group-hover:opacity-100 
                     transition-opacity duration-150 z-10"
        >
          {tooltip}
        </span>
      )}
    </div>
  );
};

export default Button;
