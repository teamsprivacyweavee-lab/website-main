import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showTagline?: boolean;
}

const taglines = [
  "Privacy Handling · AI & ML Solutions",
  "Intelligent Data Protection",
  "Secure AI Infrastructure",
  "Privacy-First ML Engineering",
  "Compliance & Security Automation",
  "Trustworthy AI · Zero Data Leaks",
];

const Logo: React.FC<LogoProps> = ({ className = '', width = 240, height = 90, showTagline = false }) => {
  const primaryDeepBlue = "#0F2167";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!showTagline) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 2600);
    return () => clearInterval(id);
  }, [showTagline]);

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
        <div className="pl-2 mt-0.5 h-[14px] overflow-hidden relative w-full">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute left-0 text-[10px] font-semibold tracking-widest uppercase text-blue-500/80 whitespace-nowrap"
            >
              {taglines[index]}
            </motion.span>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Logo;
