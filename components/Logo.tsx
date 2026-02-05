import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-shrink-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gold-500">
           {/* Stylized 'C' */}
          <path d="M70 25 C 50 15, 20 25, 20 50 C 20 75, 50 85, 70 75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          
          {/* Stylized Flower (Tulip shape) inside the C */}
          <path d="M45 65 L 45 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M45 40 C 35 30, 30 45, 45 55 C 60 45, 55 30, 45 40" stroke="currentColor" strokeWidth="3" fill="none" />
          
          {/* Leaf */}
          <path d="M45 55 Q 65 55 70 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-serif text-xl font-bold tracking-wide text-spa-900 leading-none">Claudia Martínez</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500 mt-1">Estética Spa</span>
      </div>
    </div>
  );
};