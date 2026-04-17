import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', width = 240, height = 90, showTagline = false }) => {
  const primaryDeepBlue = "#0F2167";
  
  return (
    <div 
      className={`flex flex-col items-start justify-center ${className}`} 
      style={{ width, height }}
    >
      <span 
        className="text-4xl font-bold tracking-tight pl-2 leading-none"
        style={{ color: primaryDeepBlue }}
      >
        Privacy<span className="text-primary ml-0">Weave</span>
      </span>
      {showTagline && (
        <span className="pl-2 text-[10px] font-semibold tracking-widest uppercase text-blue-500/80 mt-0.5">
          AI &amp; ML Solutions
        </span>
      )}
    </div>
  );
};

export default Logo;