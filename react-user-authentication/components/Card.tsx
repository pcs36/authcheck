
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white text-slate-800 shadow-2xl rounded-2xl p-8 sm:p-12 w-full max-w-md ${className}`}>
      {children}
    </div>
  );
};

export default Card;
