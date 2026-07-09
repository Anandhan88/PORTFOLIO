import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AnandLogo from './AnandLogo.jsx';

const { FiMenu, FiX, FiSun, FiMoon } = FiIcons;

const Header = ({ activeSection, theme = 'dark', onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const headerRef = useRef(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const threshold = 15; // scroll delta threshold in pixels to prevent flickering

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Pin visible at the very top of the page
          if (currentScrollY < 10) {
            setIsHeaderVisible(true);
            setNavVisible(true);
            lastScrollY = currentScrollY; // Reset last scroll tracker
          }
          // Bypass hide scroll logic if the mobile menu is open
          else if (isMenuOpen) {
            setIsHeaderVisible(true);
            setNavVisible(true);
            lastScrollY = currentScrollY; // Reset last scroll tracker
          }
          // Threshold check to filter noise and accumulate distance
          else if (Math.abs(currentScrollY - lastScrollY) > threshold) {
            if (currentScrollY > lastScrollY && currentScrollY > 60) {
              // Scrolling DOWN
              setIsHeaderVisible(false);
              setNavVisible(false);
            } else {
              // Scrolling UP
              setIsHeaderVisible(true);
              setNavVisible(true);
            }
            lastScrollY = currentScrollY; // Update scroll position ONLY when threshold is exceeded
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const headerEl = document.getElementById('site-header');

    if (!element) {
      console.error(`Element with id "${sectionId}" not found`);
      return;
    }

    const headerHeight = headerEl?.getBoundingClientRect().height || 72;
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const targetTop = Math.max(elementTop - headerHeight - 8, 0);

    try {
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    } catch (_) {
      window.scrollTo(0, targetTop);
    }

    setIsMenuOpen(false);
  };

  return (
    <motion.header
      ref={headerRef}
      id="site-header"
      initial={{ y: 0 }}
      animate={{ y: isHeaderVisible ? 0 : -80 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
      style={{
        position: 'fixed',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className="w-full px-4 md:px-10 py-2.5">
        <div className="flex items-center justify-end gap-2 md:gap-4 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              z: 20,
              transition: { duration: 0.3 }
            }}
            className="text-2xl font-bold tracking-tighter cursor-pointer relative hidden md:block mr-6"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              transformStyle: 'preserve-3d',
              textShadow: '0 4px 12px rgba(6, 182, 212, 0.4), 0 0 20px rgba(56, 189, 248, 0.3)'
            }}
          >
            <AnandLogo
              className="h-10 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div
            style={{
              opacity: navVisible ? 1 : 0,
              transform: navVisible ? 'translateY(0)' : 'translateY(-14px)',
              pointerEvents: navVisible ? 'auto' : 'none',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
            }}
            className="hidden md:flex items-center space-x-1 relative ml-auto pr-2 md:pr-4"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => { scrollToSection(item.id); }}
                whileHover={{ 
                  scale: 1.08,
                  y: -4,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className={`nav-button relative px-4 py-2 rounded-full text-sm font-medium z-10 transition-all duration-300 ${
                  activeSection === item.id && item.id !== 'home'
                    ? 'text-white nav-button-active'
                    : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {activeSection === item.id && item.id !== 'home' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{
                      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(56, 189, 248, 0.15))',
                      border: '1px solid rgba(6, 182, 212, 0.5)',
                      boxShadow: '0 8px 16px rgba(6, 182, 212, 0.25), 0 0 30px rgba(56, 189, 248, 0.2), inset 0 1px 1px rgba(6, 182, 212, 0.3)'
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.label}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleTheme}
              className="ml-2 px-3 py-2 rounded-full border border-slate-700/60 bg-slate-800/60 text-slate-300 hover:text-cyan-400 hover:border-slate-500 transition-colors"
              aria-label="Toggle theme"
            >
              <SafeIcon icon={theme === 'dark' ? FiSun : FiMoon} className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9, rotateZ: -5 }}
            whileHover={{ 
              scale: 1.1,
              rotateY: 10,
              z: 20,
              boxShadow: '0 8px 20px rgba(6, 182, 212, 0.3), 0 0 30px rgba(56, 189, 248, 0.2)'
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden ml-auto text-white p-2 rounded-lg hover:bg-slate-800/50 transition-colors relative"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(6, 182, 212, 0.2)'
            }}
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
            <div 
              className="absolute inset-0 rounded-lg border border-cyan-500/30 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), transparent)'
              }}
            />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0, marginTop: 0, rotateX: -15, z: -50 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16, rotateX: 0, z: 0 }}
              exit={{ opacity: 0, height: 0, marginTop: 0, rotateX: -15, z: -50 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-slate-800"
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: '0 10px 30px rgba(6, 182, 212, 0.15), inset 0 1px 1px rgba(6, 182, 212, 0.1)'
              }}
            >
              <div className="py-2 space-y-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => { scrollToSection(item.id); }}
                    initial={{ opacity: 0, x: -20, z: -30 }}
                    animate={{ opacity: 1, x: 0, z: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ 
                      x: 5,
                      z: 10,
                      rotateY: 2,
                      boxShadow: '0 6px 15px rgba(6, 182, 212, 0.25), 0 0 20px rgba(56, 189, 248, 0.2)'
                    }}
                    whileTap={{ scale: 0.98, z: -5 }}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all relative ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-cyan-600/20 to-teal-600/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      boxShadow: activeSection === item.id 
                        ? '0 4px 12px rgba(6, 182, 212, 0.2), inset 0 1px 1px rgba(6, 182, 212, 0.2)'
                        : '0 2px 6px rgba(0, 0, 0, 0.1)',
                      textShadow: activeSection === item.id 
                        ? '0 2px 8px rgba(6, 182, 212, 0.4)'
                        : 'none'
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;