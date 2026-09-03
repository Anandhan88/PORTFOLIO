import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiGithub, FiLinkedin, FiMail, FiCode } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Anandhan88', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/anandhan18', label: 'LinkedIn' },
    { icon: FiCode, href: 'https://leetcode.com/u/Anandhan88/', label: 'LeetCode' },
    { icon: FiMail, href: 'mailto:anand.settu2006@gmail.com', label: 'Email' }
  ];

  return (
    <footer className="bg-black dark:bg-black theme-light:bg-neutral-100 border-t border-neutral-900 theme-light:border-neutral-200 relative z-10 pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6 font-serif">
            <h3 className="text-3xl font-serif font-bold text-white theme-light:text-black uppercase tracking-wider">
              ANANDHAN<span className="text-cyan-400">.</span>
            </h3>
            <p className="text-neutral-400 theme-light:text-neutral-600 leading-relaxed max-w-xs text-base">
              Full-Stack Developer & AI Data Science Scholar dedicated to building high-performance computational systems.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-neutral-800 theme-light:border-neutral-300 text-neutral-400 hover:text-cyan-400 hover:border-cyan-400 transition-colors"
                  aria-label={social.label}
                >
                  <SafeIcon icon={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-serif font-bold text-cyan-400 mb-6 uppercase tracking-wider">INDEX</h4>
            <ul className="space-y-3 font-serif">
              {['About', 'Projects', 'Skills', 'Resume', 'Contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => document.getElementById(link.toLowerCase()).scrollIntoView({ behavior: 'smooth' })}
                    className="text-neutral-300 theme-light:text-neutral-700 hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-neutral-700" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Values */}
          <div>
            <h4 className="text-lg font-serif font-bold text-cyan-400 mb-6 uppercase tracking-wider">PRINCIPLES</h4>
            <ul className="space-y-4 font-serif">
              <li className="flex items-center gap-3 text-neutral-300 theme-light:text-neutral-700">
                <span className="font-mono text-cyan-400 text-xs">01 /</span>
                <span>Algorithmic Rigor & Precision</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-300 theme-light:text-neutral-700">
                <span className="font-mono text-cyan-400 text-xs">02 /</span>
                <span>High-Performance System Architecture</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-300 theme-light:text-neutral-700">
                <span className="font-mono text-cyan-400 text-xs">03 /</span>
                <span>Continuous Technological Advancement</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-900 theme-light:border-neutral-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left font-serif text-sm text-neutral-500">
          <p>
            © {currentYear} ANANDHAN S. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-xs tracking-widest text-cyan-400 uppercase">
            EDITORIAL SERIF EDITION
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;