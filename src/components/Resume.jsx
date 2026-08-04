import React from 'react';
import { useScrollRevealGSAP } from '../hooks/useScrollRevealGSAP';
import { motion } from 'framer-motion';
import { FiDownload, FiFileText, FiAward, FiBookOpen, FiCheck } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const Resume = () => {
  const headingRef = useScrollRevealGSAP({ enableBlur: true, baseOpacity: 0.15, baseRotation: 2 });

  return (
    <section id="resume" className="py-24 relative" data-scroll="section">
      <div className="container mx-auto px-0">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4">
              <span className="scroll-word inline-block">My</span> <span className="scroll-word inline-block text-gradient">Resume</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full opacity-80" />
            <p className="text-slate-300 mt-6">
              Download my comprehensive CV to explore my complete journey and achievements
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              data-scroll="card"
              className="glass-panel rounded-3xl p-10 flex flex-col justify-center items-center text-center border border-blue-500/20 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform duration-300">
                  <SafeIcon icon={FiFileText} className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Professional Resume</h3>
                <p className="text-slate-200 mb-8 leading-relaxed font-semibold">
                  Get detailed insights into my technical skills, project experiences, 
                  education, and professional journey in AI and Data Science.
                </p>
                
                <a
                  href="/assets/resume.pdf"
                  download="Anandhan_Resume.pdf"
                  className="btn-3d inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-blue-100 hover:shadow-xl hover:shadow-blue-400/30 transition-all duration-300"
                >
                  <SafeIcon icon={FiDownload} className="w-5 h-5" />
                  Download My CV
                </a>
              </div>
            </div>

            <div className="space-y-6">
              {/* Education Card */}
              <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-emerald-500">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <SafeIcon icon={FiBookOpen} className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Education</h4>
                </div>
                <p className="text-slate-300 font-medium">AI & Data Science Student</p>
                <p className="text-slate-300 text-sm">Kongu Engineering College</p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center gap-3 text-slate-300">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    HSC — Thanappa Gounder Matric Hr Sec School
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    SSLC — Thanappa Gounder Matric Hr Sec School
                  </li>
                </ul>
              </div>

              {/* Achievements Card */}
              <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-pink-500">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-2 bg-pink-500/10 rounded-lg">
                    <SafeIcon icon={FiAward} className="w-5 h-5 text-pink-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Achievements</h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3 text-slate-300">
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                    BYTS INDIA Hackathon 2025 — Best Implementation Award
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                    MADATHON — 8-hour Intra College Hackathon
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                    Full-Stack & Machine Learning Projects
                  </li>
                </ul>
              </div>

              {/* Summary Card */}
              <div className="glass-panel rounded-2xl p-6 border border-white/5 bg-gradient-to-r from-white/5 to-transparent">
                <h4 className="text-lg font-semibold text-white mb-4">What's Inside</h4>
                <div className="grid grid-cols-2 gap-3">
                  {['Project Portfolio', 'Skill Assessments', 'Education', 'Experience', 'Certifications'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <SafeIcon icon={FiCheck} className="w-4 h-4 text-blue-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;