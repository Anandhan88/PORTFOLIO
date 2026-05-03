import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollRevealGSAP = ({
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  staggerDelay = 0.05
} = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Animate container rotation
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true
          }
        }
      );

      // Get all word spans
      const wordElements = el.querySelectorAll('.scroll-word');

      // Animate word opacity
      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity' },
        {
          ease: 'power2.out',
          opacity: 1,
          duration: 0.8,
          stagger: staggerDelay,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Animate word blur
      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'power2.out',
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: staggerDelay,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Reveal generic items with class .reveal-item
      const revealItems = el.querySelectorAll('.reveal-item');
      if (revealItems && revealItems.length > 0) {
        gsap.fromTo(revealItems, 
          {
            opacity: 0,
            y: 24,
            filter: enableBlur ? `blur(${Math.max(blurStrength, 4)}px)` : 'none',
            willChange: 'opacity, transform, filter'
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            ease: 'power1.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'bottom 40%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [enableBlur, baseRotation, baseOpacity, blurStrength, staggerDelay]);

  return containerRef;
};
