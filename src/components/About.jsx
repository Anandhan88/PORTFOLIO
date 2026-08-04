import React from 'react';
import { useScrollRevealGSAP } from '../hooks/useScrollRevealGSAP';
import { motion } from 'framer-motion';
import { FiUser, FiHeart, FiTarget, FiTrendingUp } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import CountUp from './CountUp';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
  };

  const headingRef = useScrollRevealGSAP({ enableBlur: true, baseOpacity: 0.15, baseRotation: 2 });

  return (
    <section id="about" className="py-24 relative" data-scroll="section">
      <div className="container mx-auto px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Heading */}
          <motion.div variants={cardVariants} className="text-center mb-20">
            <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4">
              <span className="scroll-word inline-block">About</span> <span className="scroll-word inline-block text-gradient">Me</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full opacity-80" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Left Column */}
            <motion.div variants={cardVariants} className="space-y-8" style={{ transformStyle: 'preserve-3d' }}>
              <motion.div
                whileHover={{
                  y: -8,
                  z: 20,
                  rotateY: 2,
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3), 0 0 50px rgba(56, 189, 248, 0.2)',
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                data-scroll="card"
                className="glass-panel card-3d rounded-3xl p-8 border-l-4 border-l-cyan-500 perspective"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 10px 30px rgba(6, 182, 212, 0.15), inset 0 1px 1px rgba(6, 182, 212, 0.2)'
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
                    className="p-3 bg-cyan-500/20 rounded-xl"
                  >
                    <SafeIcon icon={FiUser} className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-white">Who I Am</h3>
                </div>
                <p className="text-slate-200 leading-relaxed text-lg font-semibold">
                  A passionate student developer merging AI with modern web
                  technologies. Building intelligent applications using React, Next.js, and
                  Machine Learning to create innovative solutions.
                </p>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -8,
                  z: 20,
                  rotateY: -2,
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3), 0 0 50px rgba(192, 132, 252, 0.2)',
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                className="glass-panel rounded-3xl p-8 border-l-4 border-l-purple-500"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 10px 30px rgba(168, 85, 247, 0.15), inset 0 1px 1px rgba(168, 85, 247, 0.2)'
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
                    className="p-3 bg-purple-500/10 rounded-xl"
                  >
                    <SafeIcon icon={FiHeart} className="w-6 h-6 text-purple-400" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-white">My Passion</h3>
                </div>
                <p className="text-slate-200 leading-relaxed text-lg font-semibold">
                  Coding isn't just a skill for me — it's my passion and future.
                  I believe in creating solutions that make a real difference in people's lives.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div variants={cardVariants} className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: FiTarget, label: "Projects", value: 10, suffix: "+", color: "text-blue-400", bg: "bg-blue-500/10" },
                  { icon: FiTrendingUp, label: "Technologies", value: 15, suffix: "+", color: "text-pink-400", bg: "bg-pink-500/10" }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.15 }}
                    className="glass-panel rounded-3xl p-6 text-center"
                  >
                    <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 ${stat.bg}`}>
                      <SafeIcon icon={stat.icon} className={`w-7 h-7 ${stat.color}`} />
                    </div>
                    <h4 className="text-slate-300 font-medium mb-1">{stat.label}</h4>
                    <p className={`text-4xl font-bold ${stat.color}`}>
                      <CountUp from={0} to={stat.value} duration={2} separator="," />{stat.suffix}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ y: -5 }}
                className="glass-panel rounded-3xl p-8 border border-white/5 bg-gradient-to-br from-white/5 to-transparent"
              >
                <h3 className="text-2xl font-semibold text-white mb-6">My Approach</h3>
                <div className="space-y-4">
                  {[
                    { text: "Quick learner with adaptability", color: "bg-blue-400" },
                    { text: "Logic-driven creative solutions", color: "bg-purple-400" },
                    { text: "User-focused development", color: "bg-pink-400" },
                    { text: "Continuous improvement mindset", color: "bg-emerald-400" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className={`w-2 h-2 ${item.color} rounded-full shadow-[0_0_10px_currentColor]`} />
                      <span className="text-slate-300 text-lg">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;