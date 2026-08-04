import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiCode,
  FiCpu,
  FiDownload,
  FiArrowRight,
  FiCheckCircle,
  FiDatabase,
  FiLayout,
  FiTerminal,
  FiAward,
  FiBookOpen,
  FiTrendingUp,
  FiZap,
  FiGlobe,
  FiLayers
} from 'react-icons/fi';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPython,
  SiTensorflow,
  SiScikitlearn,
  SiFigma
} from 'react-icons/si';
import { LuBrain, LuSparkles } from 'react-icons/lu';

import SafeIcon from '../common/SafeIcon';
import CountUp from './CountUp';
import { useScrollRevealGSAP } from '../hooks/useScrollRevealGSAP';

// Spotlight Card component for Apple/Linear style hover spotlight
const SpotlightCard = ({ children, className = '', glowColor = 'rgba(56, 189, 248, 0.18)', ...props }) => {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

const About = () => {
  const headingRef = useScrollRevealGSAP({ enableBlur: true, baseOpacity: 0.15, baseRotation: 2 });
  const [activeCategory, setActiveCategory] = useState('All');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  // Section 2 - Journey Timeline Data
  const timelineData = [
    {
      year: '2023',
      title: 'Started Web Development',
      subtitle: 'Foundation & Core Web Fundamentals',
      description: 'Discovered the art of coding, mastering HTML5, CSS3, JavaScript (ES6+), and component architecture basics.',
      icon: FiCode,
      color: 'from-blue-500 to-cyan-400',
      badgeBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400'
    },
    {
      year: '2024',
      title: 'Built Full Stack Applications',
      subtitle: 'MERN Stack & Scalable Backends',
      description: 'Engineered complete web systems using React, Node.js, Express, and MongoDB. Integrated authentication, APIs, and state management.',
      icon: FiLayers,
      color: 'from-cyan-400 to-emerald-400',
      badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
    },
    {
      year: '2025',
      title: 'Entered AI & Machine Learning',
      subtitle: 'Deep Learning & Computer Vision',
      description: 'Expanded expertise into Machine Learning, PyTorch, TensorFlow, OpenCV, and predictive modeling for real-world intelligence.',
      icon: LuBrain,
      color: 'from-purple-500 to-pink-500',
      badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-300'
    },
    {
      year: '2026',
      title: 'Building Production Ready Projects',
      subtitle: 'AI-Powered Solutions & Deployment',
      description: 'Developing high-impact platforms including SMART COIR, GeoGuard AI, and Brain Tumor Detection with cloud deployments.',
      icon: FiZap,
      color: 'from-pink-500 to-amber-400',
      badgeBg: 'bg-pink-500/10 border-pink-500/30 text-pink-400'
    }
  ];

  // Section 3 - What I Do Data
  const whatIDoCards = [
    {
      title: 'Full Stack Development',
      icon: FiCode,
      glowColor: 'rgba(56, 189, 248, 0.25)',
      borderColor: 'group-hover:border-cyan-500/40',
      gradient: 'from-cyan-500/20 to-blue-600/20',
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10 border-cyan-500/20',
      description: 'Designing responsive web applications, scalable RESTful APIs, microservices, and databases with modern frontend & backend frameworks.',
      techStack: [
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' }
      ]
    },
    {
      title: 'AI & Machine Learning',
      icon: LuBrain,
      glowColor: 'rgba(168, 85, 247, 0.25)',
      borderColor: 'group-hover:border-purple-500/40',
      gradient: 'from-purple-500/20 to-pink-600/20',
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/10 border-purple-500/20',
      description: 'Building deep learning neural networks, computer vision pipelines, natural language processing, and data analytics models.',
      techStack: [
        { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
        { name: 'Scikit-Learn', icon: SiScikitlearn, color: '#F7931E' },
        { name: 'Deep Learning', icon: FiCpu, color: '#A855F7' },
        { name: 'Data Analysis', icon: FiTrendingUp, color: '#38BDF8' }
      ]
    },
    {
      title: 'UI/UX & Frontend Architecture',
      icon: FiLayout,
      glowColor: 'rgba(236, 72, 153, 0.25)',
      borderColor: 'group-hover:border-pink-500/40',
      gradient: 'from-pink-500/20 to-rose-600/20',
      iconColor: 'text-pink-400',
      iconBg: 'bg-pink-500/10 border-pink-500/20',
      description: 'Crafting dark-mode interface designs, fluid micro-interactions, glassmorphic layouts, design systems, and responsive web performance.',
      techStack: [
        { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
        { name: 'Framer Motion', icon: LuSparkles, color: '#0055FF' },
        { name: 'GSAP', icon: FiZap, color: '#88CE02' },
        { name: 'Responsive Design', icon: FiGlobe, color: '#38BDF8' }
      ]
    }
  ];

  // Section 4 - Numbers That Matter
  const statsData = [
    { label: 'Projects Built', value: 10, suffix: '+', icon: FiTerminal, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    { label: 'Current CGPA', value: 7.67, suffix: '', decimals: 2, icon: FiAward, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    { label: 'Years Learning', value: 3, suffix: '+', icon: FiBookOpen, color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20' },
    { label: 'Technologies', value: 15, suffix: '+', icon: FiCpu, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' }
  ];

  // Section 6 - Tech Stack Visualization Categories
  const techCategories = ['All', 'Frontend', 'Backend', 'Database', 'AI & ML'];

  const techNodes = [
    { name: 'React', category: 'Frontend', icon: SiReact, color: '#61DAFB', level: 'Advanced', description: 'Component Architecture & Hooks' },
    { name: 'Next.js', category: 'Frontend', icon: SiNextdotjs, color: '#FFFFFF', level: 'Intermediate', description: 'SSR, App Router & Optimization' },
    { name: 'Tailwind CSS', category: 'Frontend', icon: SiTailwindcss, color: '#06B6D4', level: 'Advanced', description: 'Utility-first Glassmorphism & UI' },
    { name: 'Node.js', category: 'Backend', icon: SiNodedotjs, color: '#339933', level: 'Advanced', description: 'Asynchronous Event-driven Services' },
    { name: 'Express', category: 'Backend', icon: SiExpress, color: '#FFFFFF', level: 'Advanced', description: 'RESTful API Routes & Middleware' },
    { name: 'MongoDB', category: 'Database', icon: SiMongodb, color: '#47A248', level: 'Intermediate', description: 'NoSQL Schemas & Aggregations' },
    { name: 'MySQL', category: 'Database', icon: SiMysql, color: '#4479A1', level: 'Intermediate', description: 'Relational Queries & Indexing' },
    { name: 'Python', category: 'AI & ML', icon: SiPython, color: '#3776AB', level: 'Advanced', description: 'Data Science & Algorithm Scripting' },
    { name: 'TensorFlow', category: 'AI & ML', icon: SiTensorflow, color: '#FF6F00', level: 'Intermediate', description: 'Neural Networks & Deep Learning' },
    { name: 'Scikit-Learn', category: 'AI & ML', icon: SiScikitlearn, color: '#F7931E', level: 'Intermediate', description: 'Classification, Regression & Clustering' }
  ];

  const filteredNodes = activeCategory === 'All'
    ? techNodes
    : techNodes.filter(node => node.category === activeCategory);

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950/80 text-white" data-scroll="section">
      {/* Background Decorative Ambient Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[130px]" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">

        {/* MAIN SECTION HEADING */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <SafeIcon icon={FiUser} className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 ref={headingRef} className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400">Intelligent Solutions</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Bridging full-stack software architecture with modern AI capability to deliver high-performance applications.
          </p>
        </motion.div>

        {/* SECTION 1 – INTRODUCTION (SPLIT LAYOUT) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid lg:grid-cols-12 gap-12 items-center mb-28"
        >
          {/* Left Side: Avatar / Portrait with Animated Gradient Ring */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Animated Outer Gradient Glow Ring */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-75 blur-lg group-hover:opacity-100 transition duration-700 group-hover:duration-200 animate-pulse" />

              {/* Portrait Container */}
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl flex flex-col items-center justify-between p-6 text-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                {/* Avatar Frame */}
                <div className="relative mt-4">
                  <div className="w-36 h-36 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 shadow-xl">
                    <img
                      src="https://github.com/Anandhan88.png"
                      alt="Anandhan S"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                      }}
                      className="w-full h-full rounded-full object-cover border-2 border-slate-900"
                    />
                  </div>
                  {/* Floating Indicator */}
                  <span className="absolute bottom-1 right-2 w-5 h-5 bg-emerald-500 border-4 border-slate-900 rounded-full shadow-lg" title="Active & Ready" />
                </div>

                {/* Developer Info Card Overlay */}
                <div className="relative z-10 mt-4 w-full bg-slate-950/80 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <h3 className="text-xl font-bold text-white tracking-wide">Anandhan S</h3>
                  <p className="text-xs text-cyan-400 font-mono mt-0.5">B.Tech AI & Data Science</p>
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-300 font-medium">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Available for Roles & Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Headline, Description & CTAs */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs md:text-sm font-semibold tracking-wide">
              <SafeIcon icon={LuSparkles} className="w-4 h-4 text-cyan-400" />
              <span>AI & Full Stack Developer</span>
            </div>

            {/* Large Headline */}
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Building Intelligent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Digital Experiences
              </span>
            </h3>

            {/* Description */}
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
              I am Anandhan, a B.Tech Artificial Intelligence & Data Science student passionate about building scalable web applications and AI-powered solutions. I combine modern development practices with machine learning to create products that solve real-world problems.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-200 text-sm">
                <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Full Stack Systems</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-200 text-sm">
                <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Deep Learning Models</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <SafeIcon icon={FiDownload} className="w-4 h-4" />
                <span>Download Resume</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-900 border border-white/15 text-slate-200 hover:text-white font-semibold text-sm hover:border-cyan-500/50 hover:bg-slate-800/80 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>View Projects</span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4 text-cyan-400" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* SECTION 2 – JOURNEY TIMELINE */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="mb-28"
        >
          <div className="text-center mb-14">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">Journey Timeline</h3>
            <p className="text-slate-400 text-sm md:text-base">Evolution of technical skills and milestones over time</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Animated Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-400 to-purple-600 md:-translate-x-1/2" />

            <div className="space-y-10">
              {timelineData.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Content Card */}
                    <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                      <SpotlightCard className="p-6 md:p-8">
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border font-mono ${item.badgeBg}`}>
                            {item.year}
                          </span>
                          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-cyan-400">
                            <SafeIcon icon={item.icon} className="w-5 h-5" />
                          </div>
                        </div>

                        <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-xs text-cyan-400 font-mono mb-3">{item.subtitle}</p>
                        <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                      </SpotlightCard>
                    </div>

                    {/* Glowing Timeline Center Node */}
                    <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50 z-20">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* SECTION 3 – WHAT I DO */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="mb-28"
        >
          <div className="text-center mb-14">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">What I Do</h3>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Specialized domain expertise spanning software development, AI model engineering, and frontend design systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whatIDoCards.map((card, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <SpotlightCard glowColor={card.glowColor} className="h-full p-8 flex flex-col justify-between">
                  <div>
                    {/* Header Icon */}
                    <div className={`w-14 h-14 rounded-2xl ${card.iconBg} border flex items-center justify-center mb-6`}>
                      <SafeIcon icon={card.icon} className={`w-7 h-7 ${card.iconColor}`} />
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-bold text-white mb-3">{card.title}</h4>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {card.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div>
                    <div className="h-px bg-white/10 my-4" />
                    <div className="flex flex-wrap gap-2">
                      {card.techStack.map((tech, tIdx) => (
                        <div
                          key={tIdx}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-medium hover:border-cyan-500/30 transition-colors"
                        >
                          <SafeIcon icon={tech.icon} className="w-3.5 h-3.5" style={{ color: tech.color }} />
                          <span>{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SECTION 4 – NUMBERS THAT MATTER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="mb-28"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">Numbers That Matter</h3>
            <p className="text-slate-400 text-sm md:text-base">Quantifiable achievements & academic benchmarks</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsData.map((stat, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <SpotlightCard className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto rounded-2xl ${stat.bg} border flex items-center justify-center mb-4`}>
                    <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <h4 className={`text-3xl md:text-5xl font-black ${stat.color} font-mono tracking-tight mb-2`}>
                    <CountUp from={0} to={stat.value} duration={2.5} separator="," />
                    <span>{stat.suffix}</span>
                  </h4>
                  <p className="text-slate-300 text-xs md:text-sm font-medium">{stat.label}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SECTION 5 – MY DEVELOPMENT PHILOSOPHY */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="mb-28"
        >
          <motion.div variants={itemVariants}>
            <SpotlightCard glowColor="rgba(168, 85, 247, 0.2)" className="p-8 md:p-12 text-center relative">
              {/* Quote Icon Background */}
              <div className="text-6xl text-white/5 font-serif absolute top-4 left-6 select-none">“</div>
              
              <div className="max-w-3xl mx-auto relative z-10 space-y-6">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">Development Philosophy</span>
                <blockquote className="text-xl md:text-3xl font-medium text-slate-100 leading-snug italic">
                  "Technology should not only work efficiently—it should create meaningful experiences and solve real problems."
                </blockquote>
                <p className="text-slate-400 text-sm font-mono">— Anandhan S, AI & Data Science Engineer</p>

                {/* 4 Key Pillars */}
                <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                  {[
                    { label: 'Problem Solver', color: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10' },
                    { label: 'Continuous Learner', color: 'border-purple-500/30 text-purple-300 bg-purple-500/10' },
                    { label: 'Team Collaborator', color: 'border-blue-500/30 text-blue-300 bg-blue-500/10' },
                    { label: 'Innovation Driven', color: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10' }
                  ].map((pillar, pIdx) => (
                    <div
                      key={pIdx}
                      className={`flex items-center gap-2.5 p-3.5 rounded-2xl border ${pillar.color} font-medium text-xs md:text-sm`}
                    >
                      <SafeIcon icon={FiCheckCircle} className="w-4 h-4 shrink-0" />
                      <span>{pillar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>

        {/* SECTION 6 – TECH STACK VISUALIZATION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">Tech Stack & Ecosystem</h3>
            <p className="text-slate-400 text-sm md:text-base">Interactive breakdown of technologies and tools</p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {techCategories.map((cat, cIdx) => (
              <button
                key={cIdx}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 scale-105'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filtered Skill Nodes Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <AnimatePresence>
              {filteredNodes.map((node, nIdx) => (
                <motion.div
                  key={node.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <SpotlightCard className="p-5 h-full flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                          <SafeIcon icon={node.icon} className="w-6 h-6" style={{ color: node.color }} />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400">
                          {node.category}
                        </span>
                      </div>

                      <h5 className="text-base font-bold text-white mb-1">{node.name}</h5>
                      <p className="text-xs text-slate-400 leading-snug">{node.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-cyan-400 font-mono">
                      <span>{node.level}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;