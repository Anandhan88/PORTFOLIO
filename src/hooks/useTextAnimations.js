import { useEffect } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';

export const useTextSplitAnimation = (selector, containerRef) => {
  useEffect(() => {
    if (!containerRef?.current) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(selector);
      
      elements.forEach((element) => {
        // Split text into characters
        const split = new SplitType(element, { types: 'chars' });
        
        // Animate each character
        gsap.from(split.chars, {
          opacity: 0,
          y: 20,
          rotateX: -90,
          stagger: 0.03,
          duration: 0.8,
          ease: 'back.out(1.7)',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector, containerRef]);
};

export const useHeroNameAnimation = (containerRef) => {
  useEffect(() => {
    if (!containerRef?.current) return;

    const ctx = gsap.context(() => {
      const nameElement = containerRef.current.querySelector('[data-text="hero-name"]');
      
      if (nameElement) {
        const split = new SplitType(nameElement, { types: 'chars' });
        
        // Create a shimmer effect
        gsap.set(split.chars, { opacity: 0, y: 50 });
        
        gsap.to(split.chars, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: 0.3,
        });

        // Add continuous shimmer effect
        gsap.to(split.chars, {
          backgroundPosition: '200% center',
          duration: 2,
          ease: 'none',
          stagger: {
            each: 0.1,
            repeat: -1,
            yoyo: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
};
