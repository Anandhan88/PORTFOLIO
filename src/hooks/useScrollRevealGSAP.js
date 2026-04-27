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

    // Track created ScrollTriggers for scoped cleanup
    const createdTriggers = [];

    // Animate container rotation
    const rotateTween = gsap.fromTo(
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
    if (rotateTween && rotateTween.scrollTrigger) createdTriggers.push(rotateTween.scrollTrigger);

    // Get all word spans
    const wordElements = el.querySelectorAll('.scroll-word');

    // Animate word opacity
    const wordsOpacityTween = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: staggerDelay,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom-=20%',
          end: 'bottom bottom',
          scrub: true
        }
      }
    );
    if (wordsOpacityTween && wordsOpacityTween.scrollTrigger) createdTriggers.push(wordsOpacityTween.scrollTrigger);

    // Animate word blur
    if (enableBlur) {
      const wordsBlurTween = gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: staggerDelay,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=20%',
            end: 'bottom bottom',
            scrub: true
          }
        }
      );
      if (wordsBlurTween && wordsBlurTween.scrollTrigger) createdTriggers.push(wordsBlurTween.scrollTrigger);
    }

    // Reveal generic items with class .reveal-item
    const revealItems = el.querySelectorAll('.reveal-item');
    if (revealItems && revealItems.length > 0) {
      const fromState = {
        opacity: 0,
        y: 24,
        filter: enableBlur ? `blur(${Math.max(blurStrength, 4)}px)` : 'none',
        willChange: 'opacity, transform, filter'
      };
      const toState = {
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
      };
      const itemsTween = gsap.fromTo(revealItems, fromState, toState);
      if (itemsTween && itemsTween.scrollTrigger) createdTriggers.push(itemsTween.scrollTrigger);
    }

    return () => {
      createdTriggers.forEach(t => t && t.kill());
    };
  }, [enableBlur, baseRotation, baseOpacity, blurStrength, staggerDelay]);

  return containerRef;
};
