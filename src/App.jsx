import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Antigravity from './components/Antigravity';
import { useScrollReveal } from './hooks/useScrollReveal';
import './App.css';

const { FiArrowUp } = FiIcons;

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState('dark');

  const isLightTheme = theme === 'light';
  const particleConfig = isLightTheme
    ? {
        count: 200,
        particleSize: 0.5,
        color: '#0EA5E9'
      }
    : {
        count: 140,
        particleSize: 0.35,
        color: '#06B6D4'
      };

  // Initialize scroll reveal animations
  useScrollReveal();

  useEffect(() => {
    console.log('[App] Mounted');
    document.documentElement.classList.remove('theme-dark', 'theme-light');
    document.documentElement.classList.add(`theme-${theme}`);
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
    let ticking = false;

    const updateActive = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'certificates', 'resume', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [theme]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen w-screen relative overflow-x-hidden selection:bg-cyan-500/30 theme-${theme}`} style={{ margin: 0, padding: 0, background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      {/* Antigravity Background */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0
      }}>
        <Antigravity
          count={particleConfig.count}
          magnetRadius={50}
          ringRadius={15}
          waveSpeed={0.35}
          waveAmplitude={0.85}
          particleSize={particleConfig.particleSize}
          lerpSpeed={0.12}
          color={particleConfig.color}
          autoAnimate={false}
          particleVariance={1}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          <Header activeSection={activeSection} theme={theme} onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} />
        </div>
        
        <main className="relative z-10" style={{ pointerEvents: 'auto' }}>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Certificates />
          <Resume />
          <Contact />
        </main>
        
        <div style={{ pointerEvents: 'auto' }}>
          <Footer />
        </div>
      </div>
      
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 p-4 bg-slate-800/80 backdrop-blur-md border border-slate-700 text-blue-400 rounded-full shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/60 hover:text-white hover:bg-blue-600/50 hover:shadow-2xl transition-all z-50 group"
          >
            <SafeIcon icon={FiArrowUp} className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;