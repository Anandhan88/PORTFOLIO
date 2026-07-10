import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useProjectAnimations, applyProjectHoverEffects } from '../hooks/useProjectAnimations';
import { useTiltEffect } from '../hooks/useTiltEffect';
import { useScrollRevealGSAP } from '../hooks/useScrollRevealGSAP';

const { FiBrain, FiActivity, FiUsers, FiExternalLink, FiGithub, FiLayers, FiChevronLeft, FiChevronRight, FiLink, FiCpu, FiShield } = FiIcons;

const Projects = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const headingRef = useScrollRevealGSAP({ enableBlur: true, baseOpacity: 0.15, baseRotation: 2 });
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useProjectAnimations(containerRef);
  useTiltEffect('[data-project="card"]', { max: 8, speed: 400, glare: true, 'max-glare': 0.15 });

  useEffect(() => {
    applyProjectHoverEffects();
  }, []);

  // Handle scroll tracking to fade controls in/out
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth; // Scroll by one full screen page width
      const targetScroll = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
        
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const projects = [
    {
      id: 1,
      title: 'Mental Health Analysis',
      subtitle: 'ML Web App',
      description: 'Built ML models like Logistic Regression, Random Forest & SVM for survey-based mental health prediction. Created an end-to-end full-stack application using Flask + React with feature engineering & hyperparameter tuning.',
      tech: ['Python', 'Scikit-learn', 'Flask', 'React', 'Pandas', 'Seaborn'],
      icon: FiActivity,
      color: 'emerald',
      liveUrl: 'https://github.com/Anandhan88/Mental-Health-Analysis',
      codeUrl: 'https://github.com/Anandhan88/Mental-Health-Analysis'
    },
    {
      id: 2,
      title: 'Brain Tumor Detection',
      subtitle: 'Full Stack Deep Learning App',
      description: 'Built a medical application capable of analyzing brain MRI scans using TensorFlow and Keras. Implemented deep learning for classification with real-time model API processing integrated with React frontend.',
      tech: ['TensorFlow', 'Keras', 'React', 'Flask', 'Deep Learning'],
      icon: FiBrain,
      color: 'pink',
      liveUrl: 'https://github.com/Anandhan88/Brain-Tumor-Detection',
      codeUrl: 'https://github.com/Anandhan88/Brain-Tumor-Detection'
    },
    {
      id: 3,
      title: 'FarmConnect',
      subtitle: 'Farmer-to-Market Platform',
      description: 'Connected farmers directly with buyers for product trading. Provided secure order tracking and transactions with basic AI-driven support to enhance supply chain decisions.',
      tech: ['React', 'Node.js', 'MongoDB', 'Flutter', 'AI Integration'],
      icon: FiUsers,
      color: 'blue',
      liveUrl: 'https://github.com/Anandhan88/FarmConnect',
      codeUrl: 'https://github.com/Anandhan88/FarmConnect'
    },
    {
      id: 4,
      title: 'AARAA-INFRA',
      subtitle: 'FULL STACK CONSTRUCTION MANAGEMENT PLATFORM',
      description: 'Built a full-stack construction and consultancy management system to streamline client interactions, project tracking, inventory management, and document handling. Integrated real-time chat with Socket.IO, secure authentication, AI-powered chatbot assistance, Docker containerization, and MongoDB for scalable deployment.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Docker', 'Nginx', 'JWT'],
      icon: FiLayers,
      color: 'purple',
      liveUrl: 'https://github.com/Anandhan88/AARAA-INFRA',
      codeUrl: 'https://github.com/Anandhan88/AARAA-INFRA'
    },
    {
      id: 5,
      title: 'URL Shortener',
      subtitle: 'FULL STACK WEB APPLICATION',
      description: 'Built a URL shortening web application using Golang that converts long URLs into compact, shareable links with fast redirection. Implemented efficient backend routing, unique short-code generation, persistent URL storage, and a responsive frontend for seamless user experience.',
      tech: ['Golang', 'Gin', 'HTML', 'CSS', 'JavaScript', 'SQLite'],
      icon: FiLink,
      color: 'cyan',
      liveUrl: 'https://github.com/Anandhan88/URL-Shortener',
      codeUrl: 'https://github.com/Anandhan88/URL-Shortener'
    },
    {
      id: 6,
      title: 'SMART COIR',
      subtitle: 'AI-POWERED BUSINESS MANAGEMENT PLATFORM',
      description: 'Built a full-stack digital platform for coir manufacturing businesses to streamline inventory management, order processing, client communication, and production monitoring. Integrated an AI chatbot for customer support, real-time admin-client chat, interactive dashboards, and 3D product visualization to enhance operational efficiency.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Three.js'],
      icon: FiCpu,
      color: 'amber',
      liveUrl: 'https://github.com/Anandhan88/SMART-COIR',
      codeUrl: 'https://github.com/Anandhan88/SMART-COIR'
    },
    {
      id: 7,
      title: 'GeoGuard',
      subtitle: 'AI-POWERED LOCATION SECURITY PLATFORM',
      description: 'Developed a real-time geolocation monitoring system with secure authentication, geofencing, live map tracking, AI-based anomaly detection, and instant security alerts.',
      tech: ['React', 'Express', 'MongoDB', 'Leaflet', 'JWT'],
      icon: FiShield,
      color: 'emerald',
      liveUrl: 'https://github.com/Anandhan88/GeoGuard',
      codeUrl: 'https://github.com/Anandhan88/GeoGuard'
    }
  ];

  const getColorClass = (color) => {
    const maps = {
      emerald: 'bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/50',
      pink: 'bg-pink-500/10 border-pink-500/20 hover:border-pink-500/50',
      blue: 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/50',
      purple: 'bg-purple-500/10 border-purple-500/20 hover:border-purple-500/50',
      cyan: 'bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/50',
      amber: 'bg-amber-500/10 border-amber-500/20 hover:border-amber-500/50'
    };
    return maps[color] || maps.blue;
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="py-24 relative"
      data-scroll="section"
      style={{
        position: 'relative',
        zIndex: 10,
        background: 'var(--section-bg)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.45)',
        borderTop: '1px solid var(--section-border)',
        borderBottom: '1px solid var(--section-border)'
      }}
    >
      <div className="container mx-auto px-0">
        <motion.div initial={false}>
          <div className="text-center mb-20">
            <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4">
              <span className="scroll-word inline-block">My</span> <span className="scroll-word inline-block text-gradient">Projects</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full opacity-80" />
            <p className="text-slate-200 mt-6 max-w-2xl mx-auto text-lg font-semibold">
              Showcasing innovative solutions that blend creativity with cutting-edge technology
            </p>
          </div>

          <div className="relative w-full px-4 md:px-12">
            <div 
              ref={scrollContainerRef}
              className="grid grid-flow-col auto-cols-[100%] md:auto-cols-[calc(50%-16px)] lg:auto-cols-[calc(33.333%-21.3px)] overflow-x-auto gap-8 pb-8 scrollbar-hide"
              style={{ 
                perspective: '1500px', 
                transformStyle: 'preserve-3d',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none' // Hide scrollbar for Firefox
              }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  data-project="card"
                  initial={false}
                  whileHover={{
                    y: -12,
                    z: 30,
                    rotateX: 5,
                    rotateY: 3,
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.97, z: 10 }}
                  className={`group relative glass-panel rounded-3xl p-8 border transition-all duration-300 h-full flex flex-col ${getColorClass(project.color)}`}
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 15px 35px rgba(6, 182, 212, 0.15), 0 5px 15px rgba(0, 0, 0, 0.3)',
                    scrollSnapAlign: 'start'
                  }}
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-30 transition duration-500 blur-xl pointer-events-none ${
                    project.color === 'emerald' ? 'from-emerald-600 to-teal-600' : 
                    project.color === 'pink' ? 'from-pink-600 to-purple-600' : 
                    project.color === 'purple' ? 'from-purple-600 to-indigo-600' : 
                    project.color === 'cyan' ? 'from-cyan-600 to-blue-600' : 
                    project.color === 'amber' ? 'from-amber-600 to-orange-600' : 
                    'from-blue-600 to-cyan-600'
                  }`} />

                  <div className="relative z-10 flex flex-col h-full justify-between flex-grow">
                    <div className="flex-grow flex flex-col mb-6">
                      <div className="flex justify-between items-start mb-6">
                        <motion.div 
                          whileHover={{ scale: 1.25, rotate: [0, -10, 10, -10, 0], transition: { duration: 0.6 } }}
                          className={`p-3 rounded-2xl ${
                          project.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' : 
                          project.color === 'pink' ? 'bg-pink-500/20 text-pink-400' : 
                          project.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : 
                          project.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : 
                          project.color === 'amber' ? 'bg-amber-500/20 text-amber-400' : 
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          <SafeIcon icon={project.icon} className="w-8 h-8" />
                        </motion.div>
                        <div className="flex gap-2">
                          <SafeIcon icon={FiLayers} className="w-5 h-5 text-slate-500" />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-300 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                        {project.title}
                      </h3>
                      <p className={`text-sm font-semibold mb-4 tracking-wide uppercase opacity-80 ${
                        project.color === 'emerald' ? 'text-emerald-400' : 
                        project.color === 'pink' ? 'text-pink-400' : 
                        project.color === 'purple' ? 'text-purple-400' : 
                        project.color === 'cyan' ? 'text-cyan-400' : 
                        project.color === 'amber' ? 'text-amber-400' : 
                        'text-blue-400'
                      }`}>
                        {project.subtitle}
                      </p>

                      <p className="text-slate-300 leading-relaxed text-base tracking-wide flex-grow">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-6 min-h-[3.5rem] content-start">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            data-project="tech-badge"
                            className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4 pt-4 border-t border-slate-700/50">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-anim="primary-btn" className="btn-3d flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-blue-600/40 hover:shadow-lg hover:shadow-blue-500/30 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300">
                          <SafeIcon icon={FiExternalLink} data-anim="btn-icon" className="w-4 h-4" />
                          Live Demo
                        </a>
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" data-anim="primary-btn" className="btn-3d flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors">
                          <SafeIcon icon={FiGithub} data-anim="btn-icon" className="w-4 h-4" />
                          Code
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Slider Navigation Controls */}
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => scroll('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all z-30 animate-pulse-glow"
                  aria-label="Scroll left"
                >
                  <SafeIcon icon={FiChevronLeft} className="w-6 h-6" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {canScrollRight && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => scroll('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all z-30 animate-pulse-glow"
                  aria-label="Scroll right"
                >
                  <SafeIcon icon={FiChevronRight} className="w-6 h-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;