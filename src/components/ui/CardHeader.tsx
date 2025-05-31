interface CardHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div
      className={`space-y-1.5 p-6 flex flex-row items-center justify-between ${className}`}
    >
      {children}
    </div>
  );
};

export default CardHeader;
