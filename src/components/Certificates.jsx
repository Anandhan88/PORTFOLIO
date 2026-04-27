import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useScrollRevealGSAP } from "../hooks/useScrollRevealGSAP";
import { certificatesData } from "../data/certificatesData";
import "./Certificates.css";

function CertificatesFlip({ className = "", certificates = certificatesData }) {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const headingRef = useScrollRevealGSAP({ enableBlur: true, baseOpacity: 0.15, baseRotation: 2 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const card = sliderRef.current?.querySelector('.cert-card');
      if (!card) return;

      // Animate card in on load
      gsap.from(card, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [currentIndex]);

  const handleAdvance = () => {
    const card = sliderRef.current?.querySelector('.cert-card');
    if (!card) return;

    // Animate out
    gsap.to(card, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        // Update index
        setCurrentIndex((prev) => (prev + 1) % certificates.length);
        // Animate in
        gsap.from(card, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  };

  const cert = certificates[currentIndex];

  return (
    <section id="certificates" className={`certificates-section ${className}`} ref={sectionRef}>
      <div className="cert-header">
        <h2 ref={headingRef} className="cert-title">
          <span className="scroll-word inline-block">My</span> <span className="scroll-word inline-block text-gradient">Certifications</span>
        </h2>
        <p className="cert-subtitle">Click to flip through my top certificates</p>
      </div>
      <div className="slider" ref={sliderRef} aria-label="Certificates slider" onClick={handleAdvance}>
        <div className="cert-card" key={currentIndex}>
          <img
            className="item"
            src={cert.image}
            alt={cert.title}
            title={`${cert.title} — ${cert.company}`}
          />
          <div className="cert-info">
            <h3>{cert.title}</h3>
            <p className="cert-company">{cert.company}</p>
            <p className="cert-date">📋 Issued: {cert.year}</p>
          </div>
        </div>
      </div>
      <p className="cert-hint">Click / tap to see next certificate ({currentIndex + 1}/{certificates.length})</p>
    </section>
  );
}

export default CertificatesFlip;
