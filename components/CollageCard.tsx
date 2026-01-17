
import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const CollageCard: React.FC<Props> = ({ children, className = '', style }) => {
  return (
    <div 
      className={`relative bg-white border-2 border-black rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] p-8 transition-all duration-300 w-full ${className}`}
      style={style}
    >
      {/* Decorative Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/60 backdrop-blur-sm border border-yellow-300 transform rotate-1 opacity-80 pointer-events-none"></div>
      
      {/* Texture Layer */}
      <div className="absolute inset-0 paper-texture opacity-5 rounded-[2rem] pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default CollageCard;
