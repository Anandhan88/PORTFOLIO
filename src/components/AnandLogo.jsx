import React from 'react';

/**
 * AnandLogo
 * Uses the external SVG logo from public/assets
 */
const AnandLogo = ({ className = 'w-40 h-12' }) => {
  return (
    <img 
      src="/assets/anand-logo.svg" 
      alt="ANAND" 
      className={`${className} dark-logo-filter`}
      aria-label="ANAND logo"
    />
  );
};

export default AnandLogo;
