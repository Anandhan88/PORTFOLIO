import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiGithub, FiLinkedin, FiMail, FiCode } = FiIcons;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Anandhan88', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/anandhan18', label: 'LinkedIn' },
    { icon: FiCode, href: 'https://leetcode.com/u/Anandhan88/', label: 'LeetCode' },
    { icon: FiMail, href: 'mailto:anand.settu2006@gmail.com', label: 'Email' }
  ];

  return (
    <footer className="bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border-t border-slate-800 dark:border-slate-800 light:border-slate-300 relative z-10 pt-16 pb-8">
      <div className="container mx-auto px-0">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white dark:text-white light:text-slate-900 tracking-tight">
              Anandhan<span className="text-blue-500">.</span>
            </h3>
            <p className="text-slate-200 dark:text-slate-200 light:text-slate-700 leading-relaxed max-w-xs font-semibold">
              Full-Stack Developer passionate about AI, Data Science, and building 
              innovative solutions that make a difference.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    y: -5,
                    z: 15,
                    rotateZ: 5,
                    scale: 1.1,
                    boxShadow: '0 10px 25px rgba(6, 182, 212, 0.3), 0 0 30px rgba(56, 189, 248, 0.2)',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.9, z: 5 }}
                  className="p-3 bg-slate-900 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-cyan-600/40 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 border border-slate-800 hover:border-cyan-500"
                  aria-label={social.label}
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(6, 182, 212, 0.1)'
                  }}
                >
                  <SafeIcon icon={social.icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['About', 'Projects', 'Skills', 'Resume', 'Contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => document.getElementById(link.toLowerCase()).scrollIntoView({ behavior: 'smooth' })}
                    className="text-slate-300 hover:text-blue-400 hover:translate-x-2 transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Values */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Core Values</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <span className="font-bold">1</span>
                </div>
                <span>Passion for learning</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <span className="font-bold">2</span>
                </div>
                <span>User-focused approach</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <span className="font-bold">3</span>
                </div>
                <span>Curiosity & Innovation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-slate-300 text-sm">
            © {currentYear} Anandhan. Built with <SafeIcon icon={FiHeart} className="inline w-3 h-3 text-red-500 mx-1" /> passion.
          </p>
          <p className="text-slate-300 text-sm font-medium">
            Let's build the future together <span className="text-emerald-400">🌱💻</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;