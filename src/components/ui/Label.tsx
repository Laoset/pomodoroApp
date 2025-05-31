import React from 'react';

const Label = ({
  children,
  className,
  htmlFor,
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}) => {
  return (
    <label
      className={`"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 ${className}`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default Label;
