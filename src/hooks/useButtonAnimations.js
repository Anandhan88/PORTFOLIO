import gsap from 'gsap';

export const applyButtonAnimations = () => {
  // Primary buttons
  const primaryButtons = document.querySelectorAll('[data-anim="primary-btn"]');
  
  primaryButtons.forEach((btn) => {
    // Dynamically inject the shine sweep element if it doesn't exist
    let shine = btn.querySelector('.btn-shine-sweep');
    if (!shine) {
      shine = document.createElement('div');
      shine.className = 'btn-shine-sweep';
      btn.appendChild(shine);
    }

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
          duration: 0.4,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: 1,
        });
      }

      // Shine sweep animation
      if (shine) {
        gsap.fromTo(shine, 
          { left: '-150%' }, 
          { left: '150%', duration: 0.85, ease: 'power2.out' }
        );
      }
    });

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      // Calculate coordinates relative to center of the button
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Magnetic pull and 3D tilt tracking mouse positions
      gsap.to(btn, {
        x: x * 0.28,
        y: y * 0.28,
        rotateX: -y * 0.12,
        rotateY: x * 0.12,
        duration: 0.35,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      // Elastic bounce back to normal scale, rotation, and offsets
      gsap.to(btn, {
        scale: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.45)',
      });
    });

    btn.addEventListener('mousedown', () => {
      gsap.to(btn, {
        scale: 0.96,
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
