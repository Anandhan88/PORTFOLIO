import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiCheckCircle, FiEye, FiMaximize2, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SafeIcon from "../common/SafeIcon";
import { useScrollRevealGSAP } from "../hooks/useScrollRevealGSAP";
import { certificatesData } from "../data/certificatesData";

function Certificates({ className = "", certificates = certificatesData }) {
  const sectionRef = useRef(null);
  const [selectedCertIndex, setSelectedCertIndex] = useState(null);

  const headingRef = useScrollRevealGSAP({ enableBlur: true, baseOpacity: 0.15, baseRotation: 2 });
  const gridRef = useScrollRevealGSAP({ enableBlur: true, baseOpacity: 0.05, baseRotation: 0, staggerDelay: 0.06 });

  const activeCert = selectedCertIndex !== null ? certificates[selectedCertIndex] : null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedCertIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedCertIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="certificates" className={`py-28 relative bg-black dark:bg-black theme-light:bg-neutral-50 text-white theme-light:text-black border-t border-neutral-900 theme-light:border-neutral-200 ${className}`} ref={sectionRef}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-1 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest bg-cyan-950/20">
            05 // CERTIFICATIONS & VERIFIED CREDENTIALS
          </div>
          <h2 ref={headingRef} className="text-5xl sm:text-6xl md:text-7xl font-serif font-extrabold mb-6 uppercase tracking-tight">
            VERIFIED <span className="italic font-normal text-cyan-400">CERTIFICATIONS</span>
          </h2>
          <p className="text-neutral-400 theme-light:text-neutral-600 max-w-3xl mx-auto text-xl md:text-2xl font-serif leading-relaxed">
            Click on any credential card to inspect official validated certificate documents.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedCertIndex(index)}
              className="group cursor-pointer border border-neutral-800 theme-light:border-neutral-300 bg-neutral-900/60 theme-light:bg-neutral-100/60 p-6 md:p-8 flex flex-col justify-between h-full hover:border-cyan-400 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-center mb-4 border-b border-neutral-800 theme-light:border-neutral-200 pb-3">
                    <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase">
                      <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-emerald-400" />
                      <span>VERIFIED CREDENTIAL</span>
                    </div>
                    <span className="font-mono text-xs text-neutral-400 theme-light:text-neutral-600">{cert.year}</span>
                  </div>

                  {/* Certificate Title - Fixed Line Height Container for Uniformity */}
                  <div className="min-h-[3.8rem] flex flex-col justify-center mb-2">
                    <h3 className="text-2xl font-serif font-bold text-white theme-light:text-black tracking-tight leading-snug line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {cert.title}
                    </h3>
                  </div>

                  <p className="text-lg font-serif italic text-neutral-400 theme-light:text-neutral-600 mb-6">
                    {cert.company}
                  </p>
                </div>

                {/* Thumbnail Preview Banner - Uniform Aspect Ratio */}
                <div className="relative w-full h-44 bg-neutral-950 border border-neutral-800 theme-light:border-neutral-200 overflow-hidden mb-6 group-hover:border-cyan-400/50 transition-colors">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain p-2 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="inline-flex items-center gap-2 bg-black/80 text-cyan-400 border border-cyan-400/40 px-4 py-2 text-xs font-mono tracking-wider transition-all">
                      <SafeIcon icon={FiMaximize2} className="w-4 h-4" />
                      INSPECT FULL CERTIFICATE
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 theme-light:border-neutral-200 flex items-center justify-between text-xs font-mono text-neutral-400 mt-auto">
                <span className="group-hover:text-cyan-400 transition-colors">CREDENTIAL DOCUMENT #{index + 1}</span>
                <SafeIcon icon={FiEye} className="w-5 h-5 text-neutral-400 group-hover:text-cyan-400 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL POPUP - UNIFORM FIXED SIZE */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full h-[620px] md:h-[680px] bg-neutral-950 border border-neutral-700 p-6 md:p-8 shadow-2xl flex flex-col justify-between"
            >
              {/* Modal Header - Fixed Height Header to prevent layout Jitter */}
              <div className="flex justify-between items-start border-b border-neutral-800 pb-4 h-[100px] shrink-0">
                <div className="pr-6">
                  <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-1">
                    <SafeIcon icon={FiAward} className="w-4 h-4" />
                    <span>VERIFIED CREDENTIAL ({selectedCertIndex + 1}/{certificates.length})</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight line-clamp-1">
                    {activeCert.title}
                  </h3>
                  <p className="text-sm font-serif italic text-neutral-400">
                    {activeCert.company} • Issued: {activeCert.year}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCertIndex(null)}
                  className="p-2.5 text-neutral-400 hover:text-white hover:border-white border border-neutral-800 transition-colors shrink-0"
                  aria-label="Close modal"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image Viewer - Fixed Container Dimensions (440px) */}
              <div className="relative flex-1 w-full bg-black/80 border border-neutral-800 my-4 flex items-center justify-center overflow-hidden p-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedCertIndex}
                    src={activeCert.image}
                    alt={activeCert.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="w-full h-full object-contain rounded-sm select-none"
                  />
                </AnimatePresence>

                {/* Left/Right Carousel Controls */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3.5 bg-black/85 border border-neutral-700 text-white hover:text-cyan-400 hover:border-cyan-400 transition-all duration-200 z-10 shadow-lg"
                  aria-label="Previous certificate"
                >
                  <SafeIcon icon={FiChevronLeft} className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 bg-black/85 border border-neutral-700 text-white hover:text-cyan-400 hover:border-cyan-400 transition-all duration-200 z-10 shadow-lg"
                  aria-label="Next certificate"
                >
                  <SafeIcon icon={FiChevronRight} className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-neutral-800 flex justify-between items-center text-xs font-mono text-neutral-400 shrink-0">
                <span className="hidden sm:inline">USE ARROWS OR CLICK BUTTONS TO NAVIGATE</span>
                <span className="sm:hidden">CREDENTIAL {selectedCertIndex + 1} OF {certificates.length}</span>
                <a
                  href={activeCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1.5 font-bold"
                >
                  <SafeIcon icon={FiMaximize2} className="w-3.5 h-3.5" />
                  FULL RESOLUTION
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Certificates;
