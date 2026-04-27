import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const enableReveal = false; // disable to improve scroll performance; set true to re-enable
    if (!enableReveal) {
      console.log('[ScrollReveal] Skipped (disabled)');
      return undefined;
    }

    let ctx;
    let destroyed = false;

    const init = async () => {
      try {
        if (typeof window === 'undefined' || typeof document === 'undefined') return;

        // Respect reduced motion and skip on very small screens
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isSmallScreen = window.matchMedia('(max-width: 640px)').matches;
        if (prefersReducedMotion) {
          console.log('[ScrollReveal] Skipped (reduced motion)');
          return;
        }

        // Lazy-load GSAP + plugin to avoid blocking initial render
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger')
        ]);

        gsap.registerPlugin(ScrollTrigger);

        if (destroyed) return;

        // Run after next frame to ensure DOM is ready
        requestAnimationFrame(() => {
          ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('[data-scroll="section"]');
            const cards = gsap.utils.toArray('[data-scroll="card"]');

            if (!sections.length && !cards.length) {
              console.log('[ScrollReveal] No elements found');
              return;
            }

            sections.forEach((section) => {
              if (!section) return;
              gsap.from(section, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 85%',
                  end: 'top 60%',
                  toggleActions: 'play none none reverse',
                },
              });
            });

            // Light-weight card entrance
            cards.forEach((card) => {
              if (!card) return;
              gsap.from(card, {
                opacity: 0,
                y: 24,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 88%',
                  toggleActions: 'play none none reverse',
                },
              });
            });

            // Optional parallax; skip on small screens
            if (!isSmallScreen) {
              gsap.utils.toArray('[data-parallax]').forEach((element) => {
                if (!element) return;
                const speed = element.getAttribute('data-parallax') || 0.5;
                gsap.to(element, {
                  y: () => window.innerHeight * parseFloat(speed),
                  ease: 'none',
                  scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                  },
                });
              });
            }
          });
          console.log('[ScrollReveal] Initialized');
        });
      } catch (e) {
        console.warn('[ScrollReveal] Disabled due to error', e);
      }
    };

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
      init();
    }

    return () => {
      destroyed = true;
      try {
        if (ctx) ctx.revert();
      } catch (_) {
        // noop: GSAP context may already be cleaned up
      }
    };
  }, []);
};
