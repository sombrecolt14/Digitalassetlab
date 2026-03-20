import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`p-5 rounded-xl flex flex-col gap-4 bg-[#1a1a1a] border border-[#2a2a2a] ${className}`}
      style={{
        boxShadow: '0 8px 24px rgba(0, 217, 255, 0.1)'
      }}
    >
      {children}
    </div>
  );
}