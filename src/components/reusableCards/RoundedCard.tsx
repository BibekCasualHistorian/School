import React from "react";

interface RoundedCardProps {
  children: React.ReactNode;
  className?: string;
  isHeader?: boolean;
}

const RoundedCard = ({ children, className, isHeader }: RoundedCardProps) => {
  console.log(className);
  if (isHeader) {
    return <header className={`${className} rounded-lg`}>{children}</header>;
  }
  return <div className={`${className} rounded-lg`}>{children}</div>;
};

export default RoundedCard;
