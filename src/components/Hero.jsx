import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useHeroAnimation } from '../hooks/useHeroAnimation';
import { useHeroNameAnimation } from '../hooks/useTextAnimations';
import { applyButtonAnimations } from '../hooks/useButtonAnimations';

const { FiDownload, FiMail, FiGithub, FiLinkedin, FiCode, FiTerminal } = FiIcons;

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
      }, 50); // Typing speed
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [text, delay]);

  return <span>{displayText}</span>;
};

const Hero = () => {
  const containerRef = useRef(null);
  const [ParticlesComponent, setParticlesComponent] = useState(null);
  const enableParticles = false; // disable by default to keep initial load snappy
  
  useHeroAnimation(containerRef);
  useHeroNameAnimation(containerRef);

  useEffect(() => {
    const run = () => applyButtonAnimations();
    const idleId = window.requestIdleCallback
      ? requestIdleCallback(run, { timeout: 300 })
      : setTimeout(run, 150);
    return () => {
      if (window.cancelIdleCallback && idleId) {
        cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
    };
  }, []);

  useEffect(() => {
    if (!enableParticles) return;
    // Lazy-load particles on idle and skip for mobile or reduced-motion users
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (prefersReducedMotion || isMobile) return;

    let isCancelled = false;

    const loadParticles = async () => {
      try {
        const [{ default: Particles }, { loadSlim }] = await Promise.all([
          import('@tsparticles/react'),
          import('@tsparticles/slim')
        ]);

        const particlesInit = async (engine) => {
          await loadSlim(engine);
        };

        if (!isCancelled) {
          setParticlesComponent(() => (props) => (
            <Particles init={particlesInit} {...props} />
          ));
        }
      } catch (error) {
        console.error('Failed to load particles', error);
      }
    };

    const idleId = window.requestIdleCallback
      ? requestIdleCallback(loadParticles, { timeout: 800 })
      : setTimeout(loadParticles, 400);

    return () => {
      isCancelled = true;
      if (window.cancelIdleCallback && idleId) {
        cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
    };
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 30,
    particles: {
      color: {
        value: ['#3b82f6', '#8b5cf6', '#ec4899'],
      },
      links: {
        color: '#3b82f6',
        distance: 110,
        enable: true,
        opacity: 0.08,
        width: 0.8,
      },
      move: {
        enable: true,
        speed: 0.6,
        direction: 'none',
        random: false,
        straight: false,
        outModes: {
          default: 'out',
        },
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 18,
      },
      opacity: {
        value: 0.22,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 2.5 },
      },
    },
    detectRetina: false,
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    const headerEl = document.getElementById('site-header');
    if (!element) return;

    const headerOffset = (headerEl?.offsetHeight || 72) + 6;
    const rect = element.getBoundingClientRect();
    const targetTop = Math.max(rect.top + window.scrollY - headerOffset, 0);
    try {
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    } catch (_) {
      window.scrollTo(0, targetTop);
      if (element?.scrollIntoView) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section ref={containerRef} id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden" data-scroll="section">
      {/* Background Particles/Grid - Optional decorative element */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Particles Background */}
      {/* Background particles disabled for performance */}

      <div className="container mx-auto px-0 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Avatar / Icon */}
          <div data-hero="icon" className="relative mb-12 inline-block perspective">
            <div data-hero="icon-float" className="relative z-10 card-3d">
              <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-700 flex items-center justify-center shadow-[0_0_40px_rgba(0,217,255,0.15),0_0_40px_rgba(160,0,255,0.08)]">
                <SafeIcon icon={FiTerminal} className="w-20 h-20 text-cyan-400" />
              </div>
              {/* Spinning rings removed for performance */}
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span data-hero="greeting" className="block">Hi, I'm</span>
            <span className="text-gradient block">
              Anandhan
            </span>
          </h1>

          {/* Role Typewriter */}
          <div
            data-hero="role"
            className="text-xl md:text-2xl text-blue-200/80 mb-8 font-mono bg-blue-900/10 inline-block px-4 py-2 rounded-lg border border-blue-500/10"
          >
            <span className="mr-2 text-blue-500">{'>'}</span>
            <TypewriterText text="Full-Stack Developer | AI & Data Science Student" delay={800} />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2.5 h-5 bg-blue-500 ml-1 align-middle"
            />
          </div>

          {/* Description */}
          <p
            data-hero="description"
            className="text-lg text-slate-200 max-w-2xl mx-auto mb-12 leading-relaxed font-semibold"
          >
            I love building intelligent and user-friendly applications. I learn new 
            technologies quickly and use them to craft smart, real-world solutions. I 
            code with logic and creativity — always curious, always improving.
          </p>

          {/* CTA Buttons */}
          <div
            data-hero="buttons"
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <a href="/assets/resume.pdf" download className="relative">
              <button data-anim="primary-btn" className="relative flex items-center gap-3 bg-transparent border border-blue-500 text-blue-500 px-8 py-4 rounded-full font-bold tracking-wide hover:bg-blue-500/30 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                <SafeIcon icon={FiDownload} data-anim="btn-icon" className="w-5 h-5" />
                <span>Download CV</span>
              </button>
            </a>
            
            <a
              href="#contact"
              data-anim="primary-btn"
              className="btn-3d group flex items-center gap-3 px-8 py-4 rounded-full font-bold tracking-wide text-white border border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/30 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              <SafeIcon icon={FiMail} data-anim="btn-icon" className="w-5 h-5" />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-16">
            {[
              { icon: FiGithub, href: 'https://github.com/Anandhan88', label: 'GitHub' },
              { icon: FiLinkedin, href: 'https://www.linkedin.com/in/anandhan18', label: 'LinkedIn' },
              { icon: FiCode, href: 'https://leetcode.com/u/Anandhan88/', label: 'LeetCode' }
            ].map((social, index) => (
              <a
                data-hero="social"
                data-anim="social-icon"
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-slate-900/40 rounded-xl text-white hover:text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30 border border-transparent transition-all duration-300"
                title={social.label}
              >
                <SafeIcon icon={social.icon} className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;