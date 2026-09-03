import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiBookOpen, FiAward, FiZap } from 'react-icons/fi';
import { LuBrain } from 'react-icons/lu';

import SafeIcon from '../common/SafeIcon';
import { useScrollRevealGSAP } from '../hooks/useScrollRevealGSAP';

// Spotlight Card component for editorial hover elevation
const SpotlightCard = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`group relative overflow-hidden border border-neutral-800 theme-light:border-neutral-200 bg-neutral-900/50 theme-light:bg-neutral-100/60 p-8 md:p-10 transition-all duration-300 hover:border-amber-400/60 ${className}`}
      {...props}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

const About = () => {
  const headingRef = useScrollRevealGSAP({ enableBlur: true, baseOpacity: 0.15, baseRotation: 2 });

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

  // Timeline Data incorporating Education & Achievements in chronological order: Schools -> College -> Activities
  const timelineData = [
    {
      badgeText: '01 / SCHOOLING (SSLC)',
      title: 'Secondary School Leaving Certificate',
      subtitle: 'Thanappa Gounder Matric Hr Sec School',
      description: 'Completed Secondary School Leaving Certificate (SSLC) education with strong academic foundations.',
      icon: FiBookOpen,
    },
    {
      badgeText: '02 / SCHOOLING (HSC)',
      title: 'Higher Secondary Certificate',
      subtitle: 'Thanappa Gounder Matric Hr Sec School',
      description: 'Completed Higher Secondary Certificate education (HSC) with focus on Science and Mathematics.',
      icon: FiBookOpen,
    },
    {
      badgeText: '03 / COLLEGE & HIGHER EDUCATION',
      title: 'AI & Data Science Student',
      subtitle: 'Kongu Engineering College',
      description: 'Pursuing B.Tech in Artificial Intelligence & Data Science, focusing on Machine Learning, Full-Stack Architecture, and Data Analytics.',
      icon: FiBookOpen,
    },
    {
      badgeText: '04 / HACKATHON AWARD',
      title: 'BYTS INDIA Hackathon 2025',
      subtitle: 'Best Implementation Award',
      description: 'Recognized with the Best Implementation Award for building an innovative, scalable real-world application.',
      icon: FiAward,
    },
    {
      badgeText: '05 / COMPETITIVE CODING',
      title: 'MADATHON',
      subtitle: '8-Hour Intra College Hackathon',
      description: 'Engineered and deployed rapid prototype solutions in an intensive 8-hour competitive coding hackathon.',
      icon: FiZap,
    },
    {
      badgeText: '06 / DEPLOYED SYSTEMS',
      title: 'Full-Stack & Machine Learning',
      subtitle: 'AI Applications & Deployed Systems',
      description: 'Built high-impact intelligent platforms including SMART COIR, GeoGuard AI, and Brain Tumor Detection.',
      icon: LuBrain,
    }
  ];

  return (
    <section id="about" className="py-28 relative bg-black dark:bg-black theme-light:bg-neutral-50 text-white theme-light:text-black border-t border-neutral-900 theme-light:border-neutral-200" data-scroll="section">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">

        {/* MAIN SECTION HEADING */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="inline-block mb-4 px-4 py-1 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest bg-cyan-950/20">
            02 // CURRICULUM VITAE & MILESTONES
          </div>
          <h2 ref={headingRef} className="text-5xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-tight text-white theme-light:text-black mb-6 uppercase">
            ARCHITECTURAL <span className="italic font-normal text-cyan-400">TIMELINE</span>
          </h2>
          <p className="text-neutral-400 theme-light:text-neutral-600 max-w-3xl mx-auto text-xl md:text-2xl font-serif leading-relaxed">
            Schooling foundations, higher engineering education, competition achievements, and software milestones.
          </p>
        </motion.div>

        {/* JOURNEY TIMELINE */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          <div className="relative max-w-5xl mx-auto">
            {/* Center Hairline Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neutral-800 theme-light:bg-neutral-300 md:-translate-x-1/2" />

            <div className="space-y-16">
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
                    <div className="ml-12 md:ml-0 md:w-1/2 md:px-10">
                      <SpotlightCard>
                        <div className="flex items-center justify-between gap-4 mb-4 border-b border-neutral-800 theme-light:border-neutral-200 pb-3">
                          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                            {item.badgeText}
                          </span>
                          <div className="p-2 border border-neutral-800 theme-light:border-neutral-300 text-neutral-300 theme-light:text-neutral-700">
                            <SafeIcon icon={item.icon} className="w-5 h-5 text-cyan-400" />
                          </div>
                        </div>

                        <h4 className="text-2xl md:text-3xl font-serif font-bold text-white theme-light:text-black mb-2 tracking-tight">{item.title}</h4>
                        <p className="text-lg text-cyan-400 font-serif italic mb-4">{item.subtitle}</p>
                        <p className="text-neutral-300 theme-light:text-neutral-700 text-lg md:text-xl font-serif leading-relaxed">{item.description}</p>
                      </SpotlightCard>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-4 md:left-1/2 top-10 -translate-x-1/2 w-7 h-7 bg-black theme-light:bg-white border border-cyan-400 flex items-center justify-center z-20">
                      <div className="w-2 h-2 bg-cyan-400" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;