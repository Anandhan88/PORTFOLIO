import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiGithub, FiLinkedin, FiCode, FiArrowRight } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useHeroAnimation } from '../hooks/useHeroAnimation';
import { useHeroNameAnimation } from '../hooks/useTextAnimations';
import { applyButtonAnimations } from '../hooks/useButtonAnimations';

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;
    let intervalId;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          currentText += text[currentIndex];
          setDisplayText(currentText);
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, 40);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay]);

  return <span>{displayText}</span>;
};

const Hero = () => {
  const containerRef = useRef(null);
  useHeroAnimation(containerRef);
  useHeroNameAnimation(containerRef);

  useEffect(() => {
    const run = () => applyButtonAnimations();
    const idleId = window.requestIdleCallback
      ? requestIdleCallback(run, { timeout: 300 })
      : setTimeout(run, 150);
    return () => {
      if (window.cancelIdleCallback && idleId) cancelIdleCallback(idleId);
      else clearTimeout(idleId);
    };
  }, []);

  const quickStack = ['React.js', 'Python', 'Next.js', 'Node.js', 'TensorFlow', 'Tailwind CSS', 'MongoDB'];

  return (
    <section ref={containerRef} id="home" className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden" data-scroll="section">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 py-12">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Section Index Badge */}
          <div className="inline-block mb-8 px-4 py-1 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest bg-cyan-950/20">
            01 // PORTFOLIO ARCHIVE & BIOGRAPHY
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold mb-6 tracking-tight uppercase leading-tight">
            <span data-hero="greeting" className="block text-sm sm:text-base md:text-lg font-mono tracking-[0.25em] text-neutral-400 mb-2 font-normal">PORTFOLIO OF</span>
            <span className="block text-white theme-light:text-black font-display font-extrabold tracking-tight">
              ANANDHAN S.
            </span>
          </h1>

          {/* Role Typewriter */}
          <div
            data-hero="role"
            className="text-lg md:text-2xl text-cyan-400 mb-10 font-display font-semibold tracking-wide border-y border-neutral-800 theme-light:border-neutral-300 py-3 inline-block px-8"
          >
            <TypewriterText text="Full-Stack Developer & AI Data Science Scholar" delay={600} />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-5 bg-cyan-400 ml-2 align-middle"
            />
          </div>

          {/* Description */}
          <p
            data-hero="description"
            className="text-lg md:text-xl text-neutral-300 theme-light:text-neutral-700 max-w-3xl mx-auto mb-14 leading-relaxed font-sans"
          >
            Architecting intelligent digital platforms with algorithmic clarity and aesthetic rigor. 
            Merging deep machine learning logic with full-stack craftsmanship to build impactful real-world software.
          </p>

          {/* CTA Buttons */}
          <div
            data-hero="buttons"
            className="flex flex-col sm:flex-row gap-6 justify-center items-center font-display"
          >
            <a href="/assets/resume.pdf" download className="relative">
              <button data-anim="primary-btn" className="flex items-center gap-3 bg-cyan-400 text-black px-10 py-4 text-base tracking-wider hover:bg-cyan-300 transition-all duration-300 font-bold shadow-lg shadow-cyan-400/20">
                <SafeIcon icon={FiDownload} data-anim="btn-icon" className="w-5 h-5" />
                <span>DOWNLOAD CURRICULUM VITAE</span>
              </button>
            </a>
            
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              data-anim="primary-btn"
              className="flex items-center gap-3 px-10 py-4 text-base tracking-wider text-white theme-light:text-black border border-neutral-700 theme-light:border-neutral-300 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 font-bold"
            >
              <SafeIcon icon={FiMail} data-anim="btn-icon" className="w-5 h-5" />
              <span>INITIATE CONTACT</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-8 mt-16 border-t border-neutral-800 theme-light:border-neutral-200 pt-10 max-w-md mx-auto">
            {[
              { icon: FiGithub, href: 'https://github.com/Anandhan88', label: 'GITHUB' },
              { icon: FiLinkedin, href: 'https://www.linkedin.com/in/anandhan18', label: 'LINKEDIN' },
              { icon: FiCode, href: 'https://leetcode.com/u/Anandhan88/', label: 'LEETCODE' }
            ].map((social) => (
              <a
                data-hero="social"
                data-anim="social-icon"
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 theme-light:text-neutral-600 hover:text-cyan-400 transition-colors font-mono text-xs tracking-widest flex items-center gap-2"
                title={social.label}
              >
                <SafeIcon icon={social.icon} className="w-4 h-4" />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;