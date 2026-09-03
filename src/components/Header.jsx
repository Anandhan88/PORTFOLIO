import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AnandLogo from './AnandLogo.jsx';
import { AnimatedThemeToggler } from '@/registry/magicui/animated-theme-toggler';

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
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 dark:bg-black/80 theme-light:bg-white/80 backdrop-blur-md border-b border-neutral-800 theme-light:border-neutral-200"
    >
      <div className="w-full px-6 md:px-12 py-3.5">
        <div className="flex items-center justify-between gap-4 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="cursor-pointer relative flex items-center"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <AnandLogo className="h-10 w-auto dark-logo-filter" />
          </motion.div>

          {/* Desktop Navigation */}
          <div
            style={{
              opacity: navVisible ? 1 : 0,
              transform: navVisible ? 'translateY(0)' : 'translateY(-14px)',
              pointerEvents: navVisible ? 'auto' : 'none',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
            }}
            className="hidden md:flex items-center space-x-2 relative ml-auto pr-2"
          >
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => { scrollToSection(item.id); }}
                whileHover={{ y: -2 }}
                className={`nav-button relative px-4 py-2 text-base font-serif tracking-wide transition-all duration-300 ${
                  activeSection === item.id && item.id !== 'home'
                    ? 'text-cyan-400 font-bold'
                    : 'text-neutral-400 hover:text-white theme-light:text-neutral-600 theme-light:hover:text-black'
                }`}
              >
                {activeSection === item.id && item.id !== 'home' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 border-b-2 border-cyan-400 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.label}
              </motion.a>
            ))}
            <AnimatedThemeToggler
              variant="diamond"
              theme={theme}
              onToggle={onToggleTheme}
              className="ml-4"
            />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden ml-auto p-2 border border-neutral-800 rounded text-neutral-200"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-neutral-800 mt-3 pt-3"
            >
              <div className="py-2 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => { scrollToSection(item.id); }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className={`block w-full text-left px-4 py-2 text-lg font-serif tracking-wide transition-all ${
                      activeSection === item.id
                        ? 'text-cyan-400 font-bold border-l-2 border-cyan-400 pl-3'
                        : 'text-neutral-400 hover:text-white'
                    }`}
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