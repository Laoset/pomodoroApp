import React from "react";

interface InputProps {
  id?: string;
  type?: string;
  min?: string;
  max?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ id, type, min, max, value, onChange }: InputProps) => {
  return (
    <input
      id={id}
      type={type || "text"}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className='className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 focus:border-pomodoro-red'
    />
  );
};

export default Input;
