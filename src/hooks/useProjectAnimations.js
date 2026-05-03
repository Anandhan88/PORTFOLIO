import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useProjectAnimations = (containerRef) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger cards from alternating sides
      const cards = gsap.utils.toArray('[data-project="card"]');
      
      cards.forEach((card, index) => {
        const fromDirection = index % 2 === 0 ? -100 : 100;
        
        gsap.from(card, {
          x: fromDirection,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Tech badges animation on scroll
      gsap.utils.toArray('[data-project="tech-badge"]').forEach((badge) => {
        gsap.from(badge, {
          opacity: 0,
          scale: 0.5,
          duration: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
};

// Hover animations using anime.js
export const applyProjectHoverEffects = () => {
  const cards = document.querySelectorAll('[data-project="card"]');
  
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.05,
        rotationY: 2,
        rotationX: -2,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  });
};
