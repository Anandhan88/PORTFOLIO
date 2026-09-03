import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiActivity, FiUsers, FiExternalLink, FiGithub, FiLayers, FiChevronLeft, FiChevronRight, FiLink, FiCpu, FiShield } from 'react-icons/fi';
import { LuBrain } from 'react-icons/lu';
import SafeIcon from '../common/SafeIcon';
import { useProjectAnimations, applyProjectHoverEffects } from '../hooks/useProjectAnimations';
import { useTiltEffect } from '../hooks/useTiltEffect';
import { useScrollRevealGSAP } from '../hooks/useScrollRevealGSAP';

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
      icon: LuBrain,
      color: 'pink',
      liveUrl: 'https://github.com/Anandhan88/NEURODX',
      codeUrl: 'https://github.com/Anandhan88/NEURODX.git'
    },
    {
      id: 3,
      title: 'FarmConnect',
      subtitle: 'Farmer-to-Market Platform',
      description: 'Connected farmers directly with buyers for product trading. Provided secure order tracking and transactions with basic AI-driven support to enhance supply chain decisions.',
      tech: ['React', 'Node.js', 'MongoDB', 'Flutter', 'AI Integration'],
      icon: FiUsers,
      color: 'blue',
      liveUrl: 'https://github.com/Anandhan88/FARM-CONNECT',
      codeUrl: 'https://github.com/Anandhan88/FARM-CONNECT.git'
    },
    {
      id: 4,
      title: 'AARAA-INFRA',
      subtitle: 'FULL STACK CONSTRUCTION MANAGEMENT PLATFORM',
      description: 'Built a full-stack construction and consultancy management system to streamline client interactions, project tracking, inventory management, and document handling. Integrated real-time chat with Socket.IO, secure authentication, AI-powered chatbot assistance, Docker containerization, and MongoDB for scalable deployment.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Docker', 'Nginx', 'JWT'],
      icon: FiLayers,
      color: 'purple',
      liveUrl: 'https://github.com/Anandhan88/AARA-INFRA',
      codeUrl: 'https://github.com/Anandhan88/AARA-INFRA.git'
    },
    {
      id: 5,
      title: 'URL Shortener',
      subtitle: 'FULL STACK WEB APPLICATION',
      description: 'Built a URL shortening web application using Golang that converts long URLs into compact, shareable links with fast redirection. Implemented efficient backend routing, unique short-code generation, persistent URL storage, and a responsive frontend for seamless user experience.',
      tech: ['Golang', 'Gin', 'HTML', 'CSS', 'JavaScript', 'SQLite'],
      icon: FiLink,
      color: 'cyan',
      liveUrl: 'https://github.com/Anandhan88/go-url-shortener',
      codeUrl: 'https://github.com/Anandhan88/go-url-shortener.git'
    },
    {
      id: 6,
      title: 'SMART COIR',
      subtitle: 'AI-POWERED BUSINESS MANAGEMENT PLATFORM',
      description: 'Built a full-stack digital platform for coir manufacturing businesses to streamline inventory management, order processing, client communication, and production monitoring. Integrated an AI chatbot for customer support, real-time admin-client chat, interactive dashboards, and 3D product visualization to enhance operational efficiency.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Three.js'],
      icon: FiCpu,
      color: 'amber',
      liveUrl: 'https://github.com/Anandhan88/SMART_COIR',
      codeUrl: 'https://github.com/Anandhan88/SMART_COIR.git'
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
      codeUrl: 'https://github.com/Anandhan88/GeoGuard.git'
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
      className="py-28 relative bg-neutral-950 dark:bg-neutral-950 theme-light:bg-neutral-100 text-white theme-light:text-black border-t border-neutral-900 theme-light:border-neutral-200"
      data-scroll="section"
    >
      <div className="container mx-auto px-4">
        <motion.div initial={false}>
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-1 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest bg-cyan-950/20">
              03 // SELECTED WORKS & SYSTEM PLATFORMS
            </div>
            <h2 ref={headingRef} className="text-5xl sm:text-6xl md:text-7xl font-serif font-extrabold mb-6 uppercase tracking-tight">
              ENGINEERED <span className="italic font-normal text-cyan-400">PROJECTS</span>
            </h2>
            <p className="text-neutral-400 theme-light:text-neutral-600 max-w-3xl mx-auto text-xl md:text-2xl font-serif leading-relaxed">
              Demonstrating production-grade applications, deep learning engines, and web architectures.
            </p>
          </div>

          <div className="relative w-full px-2 md:px-10">
            <div 
              ref={scrollContainerRef}
              className="grid grid-flow-col auto-cols-[100%] md:auto-cols-[calc(50%-16px)] lg:auto-cols-[calc(33.333%-21.3px)] overflow-x-auto gap-8 pb-8 scrollbar-hide"
              style={{ 
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none'
              }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  data-project="card"
                  initial={false}
                  whileHover={{ y: -8 }}
                  className="group relative border border-neutral-800 theme-light:border-neutral-300 bg-neutral-900/60 theme-light:bg-neutral-50 p-8 transition-all duration-300 h-full flex flex-col hover:border-cyan-400/60"
                  style={{
                    scrollSnapAlign: 'start'
                  }}
                >
                  <div className="relative z-10 flex flex-col h-full justify-between flex-grow">
                    <div className="flex-grow flex flex-col mb-6">
                      <div className="flex justify-between items-center mb-6 border-b border-neutral-800 theme-light:border-neutral-200 pb-4">
                        <span className="text-3xl font-serif font-bold text-cyan-400">
                          0{index + 1}
                        </span>
                        <div className="p-2 border border-neutral-800 theme-light:border-neutral-300 text-neutral-400">
                          <SafeIcon icon={project.icon} className="w-6 h-6 text-cyan-400" />
                        </div>
                      </div>

                      <h3 className="text-2xl font-serif font-bold text-white theme-light:text-black mb-2 tracking-tight group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono tracking-widest text-cyan-400/80 mb-4 uppercase">
                        {project.subtitle}
                      </p>

                      <p className="text-neutral-300 theme-light:text-neutral-700 leading-relaxed text-base font-serif flex-grow">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-6 min-h-[3.5rem] content-start">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            data-project="tech-badge"
                            className="px-3 py-1 text-xs font-mono text-neutral-300 theme-light:text-neutral-700 border border-neutral-800 theme-light:border-neutral-300 bg-neutral-950/40"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4 pt-4 border-t border-neutral-800 theme-light:border-neutral-200">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black text-sm font-serif font-bold tracking-wider transition-all">
                          <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
                          DEMO
                        </a>
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-neutral-800 theme-light:border-neutral-300 text-neutral-300 theme-light:text-neutral-700 hover:border-cyan-400 hover:text-cyan-400 text-sm font-serif font-bold tracking-wider transition-colors">
                          <SafeIcon icon={FiGithub} className="w-4 h-4" />
                          CODE
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
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-black theme-light:bg-white border border-neutral-800 theme-light:border-neutral-300 text-white theme-light:text-black hover:border-white transition-all z-30"
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
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-black theme-light:bg-white border border-neutral-800 theme-light:border-neutral-300 text-white theme-light:text-black hover:border-white transition-all z-30"
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