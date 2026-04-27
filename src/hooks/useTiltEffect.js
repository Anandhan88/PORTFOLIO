import { useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';

export const useTiltEffect = (selector, options = {}) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    const defaultOptions = {
      max: 5,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      scale: 1.02,
      ...options,
    };

    elements.forEach((element) => {
      VanillaTilt.init(element, defaultOptions);
    });

    return () => {
      elements.forEach((element) => {
        if (element.vanillaTilt) {
          element.vanillaTilt.destroy();
        }
      });
    };
  }, [selector, options]);
};
