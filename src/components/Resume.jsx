import React from 'react';
import { useScrollRevealGSAP } from '../hooks/useScrollRevealGSAP';
import { motion } from 'framer-motion';
import { FiDownload, FiFileText, FiAward, FiBookOpen, FiCheck } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const Resume = () => {
  const headingRef = useScrollRevealGSAP({ enableBlur: true, baseOpacity: 0.15, baseRotation: 2 });

  return (
    <section id="resume" className="py-28 relative bg-black dark:bg-black theme-light:bg-neutral-50 text-white theme-light:text-black border-t border-neutral-900 theme-light:border-neutral-200" data-scroll="section">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-1 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest bg-cyan-950/20">
            06 // RESUME & QUALIFICATIONS ARCHIVE
          </div>
          <h2 ref={headingRef} className="text-5xl sm:text-6xl md:text-7xl font-serif font-extrabold mb-6 uppercase tracking-tight">
            CURRICULUM <span className="italic font-normal text-cyan-400">VITAE</span>
          </h2>
          <p className="text-neutral-400 theme-light:text-neutral-600 max-w-3xl mx-auto text-xl md:text-2xl font-serif leading-relaxed">
            Download the complete PDF portfolio detailing technical proficiencies, project records, and academic standings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div
            data-scroll="card"
            className="border border-neutral-800 theme-light:border-neutral-300 bg-neutral-900/60 theme-light:bg-neutral-100/60 p-10 flex flex-col justify-center items-center text-center relative"
          >
            <div className="relative z-10">
              <div className="w-20 h-20 border border-cyan-400 text-cyan-400 flex items-center justify-center mx-auto mb-6">
                <SafeIcon icon={FiFileText} className="w-10 h-10" />
              </div>
              
              <h3 className="text-3xl font-serif font-bold text-white theme-light:text-black mb-4">Official Curriculum Vitae</h3>
              <p className="text-neutral-300 theme-light:text-neutral-700 mb-8 leading-relaxed font-serif text-lg">
                Complete overview of engineering architecture, ML research implementations, 
                and verified technical achievements.
              </p>
              
              <a
                href="/assets/resume.pdf"
                download="Anandhan_Resume.pdf"
                className="inline-flex items-center gap-3 bg-cyan-400 text-black px-8 py-3.5 font-serif font-bold text-base tracking-wider hover:bg-cyan-300 transition-colors"
              >
                <SafeIcon icon={FiDownload} className="w-5 h-5" />
                DOWNLOAD PDF (CV)
              </a>
            </div>
          </div>

          <div className="space-y-6">
            {/* Education Card */}
            <div className="border border-neutral-800 theme-light:border-neutral-300 bg-neutral-900/40 theme-light:bg-neutral-100/40 p-6 border-l-2 border-l-white theme-light:border-l-black">
              <div className="flex items-center gap-4 mb-3">
                <SafeIcon icon={FiBookOpen} className="w-5 h-5 text-white theme-light:text-black" />
                <h4 className="text-xl font-serif font-bold text-white theme-light:text-black">Academic Track</h4>
              </div>
              <p className="text-neutral-200 theme-light:text-neutral-800 font-serif font-semibold text-lg">AI & Data Science Scholar</p>
              <p className="text-neutral-400 theme-light:text-neutral-600 font-serif text-sm">Kongu Engineering College</p>
              <ul className="mt-3 space-y-2 font-serif text-neutral-300 theme-light:text-neutral-700">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white theme-light:bg-black" />
                  HSC — Thanappa Gounder Matric Hr Sec School
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white theme-light:bg-black" />
                  SSLC — Thanappa Gounder Matric Hr Sec School
                </li>
              </ul>
            </div>

            {/* Achievements Card */}
            <div className="border border-neutral-800 theme-light:border-neutral-300 bg-neutral-900/40 theme-light:bg-neutral-100/40 p-6 border-l-2 border-l-white theme-light:border-l-black">
              <div className="flex items-center gap-4 mb-3">
                <SafeIcon icon={FiAward} className="w-5 h-5 text-white theme-light:text-black" />
                <h4 className="text-xl font-serif font-bold text-white theme-light:text-black">Honors & Awards</h4>
              </div>
              <ul className="space-y-2 font-serif text-neutral-300 theme-light:text-neutral-700">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white theme-light:bg-black" />
                  BYTS INDIA Hackathon 2025 — Best Implementation Award
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white theme-light:bg-black" />
                  MADATHON — 8-hour Intra College Coding Competition
                </li>
              </ul>
            </div>

            {/* Summary Card */}
            <div className="border border-neutral-800 theme-light:border-neutral-300 bg-neutral-900/40 p-6">
              <h4 className="text-lg font-serif font-bold text-white theme-light:text-black mb-4 uppercase tracking-wider">Document Summary</h4>
              <div className="grid grid-cols-2 gap-3 font-serif">
                {['Project Portfolio', 'Machine Learning', 'Education', 'System Architecture', 'Certifications'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-neutral-300 theme-light:text-neutral-700">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-white theme-light:text-black" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;