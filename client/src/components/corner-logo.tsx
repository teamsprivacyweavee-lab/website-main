import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

const CornerLogo = () => {
  const [location] = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    // Only show on homepage
    setIsVisible(location === '/');

    // Hide logo on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowLogo(scrollPosition < 100); // Only show when near the top
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  if (!isVisible || !showLogo) return null;

  return (
    <motion.div 
      className="absolute top-16 right-6 z-40 sm:top-[4.5rem] sm:right-7 md:top-20 md:right-8 lg:top-24 lg:right-12 xl:top-28 xl:right-16"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img 
        src="/images/privacy-weave-logo.png" 
        alt="PrivacyWeave Logo" 
        className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-44 xl:h-44 rounded-full bg-[#F2EFE7] p-0 mix-blend-multiply object-contain" 
        style={{ 
          filter: 'brightness(1.05) contrast(1.05)',
          maxWidth: 'min(25vw, 11rem)',
          maxHeight: 'min(25vw, 11rem)'
        }}
      />
    </motion.div>
  );
};

export default CornerLogo;