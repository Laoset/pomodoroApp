interface CardContentProps {
  children?: React.ReactNode;
  className?: string;
}
const CardContent = ({ children, className }: CardContentProps) => {
  return <div className={`p-4 text-center ${className}`}>{children}</div>;
};

export default CardContent;
