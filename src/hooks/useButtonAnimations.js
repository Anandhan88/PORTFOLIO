import gsap from 'gsap';

export const applyButtonAnimations = () => {
  // Primary buttons
  const primaryButtons = document.querySelectorAll('[data-anim="primary-btn"]');
  
  primaryButtons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
      
      // Icon slide animation
      const icon = btn.querySelector('[data-anim="btn-icon"]');
      if (icon) {
        gsap.to(icon, {
          x: 4,
          duration: 0.5,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: 1,
        });
      }
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mousedown', () => {
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseup', () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.1,
        ease: 'power2.out',
      });
    });
  });

  // Social icons
  const socialIcons = document.querySelectorAll('[data-anim="social-icon"]');
  
  socialIcons.forEach((icon) => {
    icon.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        scale: 1.15,
        rotation: 5,
        duration: 0.4,
        ease: 'power2.out',
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
