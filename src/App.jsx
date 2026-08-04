import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';
import Header from './components/Header';
import Hero from './components/Hero';
import ClickSpark from './components/ClickSpark';
import { useScrollReveal } from './hooks/useScrollReveal';
import './App.css';

// Lazy load below-the-fold components for ultra-fast initial paint & load
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Certificates = lazy(() => import('./components/Certificates'));
const Resume = lazy(() => import('./components/Resume'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState('dark');

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
    <ClickSpark
      sparkColor='#06b6d4'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className={`min-h-screen w-screen relative overflow-x-hidden selection:bg-cyan-500/30 theme-${theme}`} style={{ margin: 0, padding: 0, background: 'var(--bg-main)', color: 'var(--text-main)' }}>

        <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto' }}>
            <Header activeSection={activeSection} theme={theme} onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} />
          </div>

          <main className="relative z-10" style={{ pointerEvents: 'auto' }}>
            <Hero />
            <Suspense fallback={<div className="min-h-[300px] flex items-center justify-center opacity-50"><div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" /></div>}>
              <About />
              <Projects />
              <Skills />
              <Certificates />
              <Resume />
              <Contact />
            </Suspense>
          </main>

          <div style={{ pointerEvents: 'auto' }}>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
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
    </ClickSpark>
  );
}

export default App;