import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSkillAnimations = (containerRef) => {
  useEffect(() => {
    if (!containerRef.current) return;

    // Small delay to ensure elements are rendered
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Animate progress bars only if they exist
        const progressBars = gsap.utils.toArray('[data-skill="progress-bar"]');
        if (progressBars.length > 0) {
          progressBars.forEach((bar) => {
            const targetWidth = bar.getAttribute('data-target-width');
            
            gsap.from(bar, {
              width: '0%',
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: bar,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            });
          });
        }

        // Animate percentage numbers only if they exist
        const percentages = gsap.utils.toArray('[data-skill="percentage"]');
        if (percentages.length > 0) {
          percentages.forEach((element) => {
            const targetValue = parseInt(element.getAttribute('data-target-value'));
            
            ScrollTrigger.create({
              trigger: element,
              start: 'top 85%',
              onEnter: () => {
                gsap.to(element, {
                  innerHTML: targetValue,
                  duration: 1.5,
                  ease: 'power2.out',
                  snap: { innerHTML: 1 },
                  onUpdate: function() {
                    element.innerHTML = Math.round(element.innerHTML) + '%';
                  }
                });
              },
              once: true,
            });
          });
        }

        // Animate skill categories only if they exist
        const categories = gsap.utils.toArray('[data-skill="category"]');
        if (categories.length > 0) {
          gsap.from(categories, {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.6,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: categories[0],
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      }, containerRef);

      return () => {
        clearTimeout(timer);
        ctx.revert();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [containerRef]);
};

// Icon hover animations with GSAP
export const applySkillIconAnimations = () => {
  const icons = document.querySelectorAll('[data-skill="icon"]');
  
  icons.forEach((icon) => {
    icon.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        scale: 1.2,
        rotation: 10,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    });
    
    icon.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  });
};
