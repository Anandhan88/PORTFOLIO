import { useEffect } from 'react';
import gsap from 'gsap';

export const useHeroAnimation = (containerRef) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create hero timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Safely check if elements exist before animating
      const icon = document.querySelector('[data-hero="icon"]');
      const greeting = document.querySelector('[data-hero="greeting"]');
      const name = document.querySelector('[data-hero="name"]');
      const role = document.querySelector('[data-hero="role"]');
      const description = document.querySelector('[data-hero="description"]');
      const buttons = document.querySelector('[data-hero="buttons"]');
      const socials = document.querySelectorAll('[data-hero="social"]');

      // Animate elements only if they exist
      if (icon) {
        tl.from(icon, {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
        });
      }

      if (greeting) {
        tl.from(greeting, {
          opacity: 0,
          y: 30,
          duration: 0.6,
        }, '-=0.3');
      }

      if (name) {
        tl.from(name, {
          opacity: 0,
          y: 30,
          duration: 0.6,
        }, '-=0.4');
      }

      if (role) {
        tl.from(role, {
          opacity: 0,
          y: 20,
          duration: 0.5,
        }, '-=0.3');
      }

      if (description) {
        tl.from(description, {
          opacity: 0,
          y: 20,
          duration: 0.5,
        }, '-=0.2');
      }

      if (buttons) {
        tl.from(buttons, {
          opacity: 0,
          y: 20,
          duration: 0.5,
        }, '-=0.2');
      }

      if (socials.length > 0) {
        tl.from(socials, {
          opacity: 0,
          scale: 0,
          stagger: 0.1,
          duration: 0.4,
        }, '-=0.3');
      }

      // Floating animation for icon
      const iconFloat = document.querySelector('[data-hero="icon-float"]');
      if (iconFloat) {
        gsap.to(iconFloat, {
          y: -15,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      // Rotating rings
      const ring1 = document.querySelector('[data-hero="ring-1"]');
      const ring2 = document.querySelector('[data-hero="ring-2"]');

      if (ring1) {
        gsap.to(ring1, {
          rotation: 360,
          duration: 10,
          ease: 'none',
          repeat: -1,
        });
      }

      if (ring2) {
        gsap.to(ring2, {
          rotation: -360,
          duration: 15,
          ease: 'none',
          repeat: -1,
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
};
