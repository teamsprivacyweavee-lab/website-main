import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', width = 240, height = 90 }) => {
  // Using a deep blue for text
  const primaryDeepBlue = "#0F2167";
  
  return (
    <div 
      className={`flex items-center justify-start ${className}`} 
      style={{ width, height }}
    >
      <span 
        className="text-4xl font-bold tracking-tight pl-2"
        style={{ color: primaryDeepBlue }}
      >
        Privacy<span className="text-primary ml-0">Weave</span>
      </span>
    </div>
  );
};

export default Logo;