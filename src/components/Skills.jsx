import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
import { 
  SiPython, SiJavascript, SiR, SiHtml5, SiCss3, SiReact, 
  SiNodedotjs, SiMongodb, SiTensorflow, SiGit, SiCanva, 
  SiTypescript, SiNextdotjs, SiReactrouter, SiTailwindcss,
  SiFramer, SiVite, SiExpress, SiSocketdotio, SiFlask, SiDocker, SiPostman
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { FiCode, FiGlobe, FiCpu, FiBarChart2 } from 'react-icons/fi';
import { useScrollRevealGSAP } from '../hooks/useScrollRevealGSAP';

const iconMap = {
  SiPython, SiJavascript, SiJava: FaJava, SiR, SiHtml5, SiCss3, SiReact, 
  SiNodedotjs, SiMongodb, SiTensorflow, SiGit, SiPowerbi: FiBarChart2, SiCanva, 
  SiVisualstudiocode: FiCode, SiTypescript, SiNextdotjs, SiReactrouter, SiTailwindcss,
  SiFramer, SiVite, SiExpress, SiSocketdotio, SiFlask, SiDocker, SiPostman,
  FaJava, FiCode, FiGlobe, FiCpu, FiBarChart2
};

/* ================== LogoLoop Component ================== */

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
};

const cx = (...parts) => parts.filter(Boolean).join(" ");

const useAnimationLoop = (
  trackRef,
  targetVelocity,
  seqWidth,
  isHovered,
  hoverSpeed
) => {
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = timestamp => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime =
        Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined
        ? hoverSpeed
        : targetVelocity;

      velocityRef.current +=
        (target - velocityRef.current) *
        (1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU));

      if (seqWidth > 0) {
        offsetRef.current =
          (offsetRef.current + velocityRef.current * deltaTime) % seqWidth;
        track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, hoverSpeed]);
};

const LogoLoop = memo(({ logos, speed = 80 }) => {
  const trackRef = useRef(null);
  const seqRef = useRef(null);
  const [seqWidth, setSeqWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const width = seqRef.current?.getBoundingClientRect().width ?? 0;
    setSeqWidth(width);
  }, [logos]);

  useAnimationLoop(trackRef, speed, seqWidth, isHovered, 0);

  return (
    <div
      className="overflow-hidden w-full py-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={trackRef}
        className="flex w-max gap-6"
      >
        {[...Array(3)].map((_, i) => (
          <ul
            key={i}
            ref={i === 0 ? seqRef : null}
            className="flex gap-6"
          >
            {logos.map((item, idx) => (
              <li
                key={`${i}-${idx}`}
                className="px-4 py-2 rounded-full border border-purple-500/30 bg-white/5 text-sm whitespace-nowrap flex items-center gap-2"
              >
                {item.icon && <item.icon className="w-4 h-4" style={{ color: item.color }} />}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
});

LogoLoop.displayName = "LogoLoop";

/* ================== Skills Section ================== */

const Skills = () => {
  const headingRef = useScrollRevealGSAP({ enableBlur: true, baseOpacity: 0.15, baseRotation: 2 });
  const gridRef = useScrollRevealGSAP({ enableBlur: true, baseOpacity: 0.05, baseRotation: 0, staggerDelay: 0.06 });
  
  const skills = [
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "R", icon: SiR, color: "#276DC3" },
    { name: "HTML", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS", icon: SiCss3, color: "#1572B6" },
    { name: "React.js", icon: SiReact, color: "#61DAFB" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Machine Learning", icon: FiCpu, color: "#FF6F00" },
    { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "Power BI", icon: FiBarChart2, color: "#F2C811" },
    { name: "Canva", icon: SiCanva, color: "#00C4CC" },
    { name: "VS Code", icon: FiCode, color: "#007ACC" }
  ];

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "HTML", icon: SiHtml5, color: "#E34F26" },
        { name: "CSS", icon: SiCss3, color: "#1572B6" },
        { name: "Javascript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "Java", imgSrc: "/assets/java.svg" },
        { name: "Python", icon: SiPython, color: "#3776AB" }
      ]
    },
    {
      title: "Libraries and Frameworks",
      skills: [
        { name: "Reactjs", icon: SiReact, color: "#61DAFB" },
        { name: "Tailwindcss", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Framer motion", icon: SiFramer || SiReact, color: "#0055FF" },
        { name: "Vite", icon: SiVite, color: "#646CFF" }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Nodejs", icon: SiNodedotjs, color: "#339933" },
        { name: "Express", icon: SiExpress || SiNodedotjs, color: "#FFFFFF" }
      ]
    },
    {
      title: "Database",
      skills: [
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" }
      ]
    },
    {
      title: "Tools and Technologies",
      skills: [
        { name: "Git", icon: SiGit, color: "#F05032" },
        { name: "Power BI", imgSrc: "/assets/powerbi.svg" },
        { name: "VS Code", imgSrc: "/assets/vscode.svg" }
      ]
    }
  ];


  return (
    <section
      id="skills"
      className="py-24 relative"
      data-scroll="section"
      style={{
        position: 'relative',
        zIndex: 10,
        background: 'var(--section-bg)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.45)',
        borderTop: '1px solid var(--section-border)',
        borderBottom: '1px solid var(--section-border)'
      }}
    >
      <div className="container mx-auto px-0">
        <div className="text-center mb-20">
          <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4">
            <span className="scroll-word inline-block">My</span> <span className="scroll-word inline-block text-gradient">Skills</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full opacity-80" />
          <p className="text-slate-200 mt-6 max-w-2xl mx-auto text-lg font-semibold">
            A comprehensive toolkit for building innovative and impactful solutions
          </p>
        </div>

        {/* Categorized Skills */}
        <div ref={gridRef} className="mt-16 max-w-6xl mx-auto">
          {skillCategories.map((category) => (
            <div key={category.title} className="mb-12 last:mb-0">
              <h3 className="text-2xl font-bold mb-6 text-gradient">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.skills.map((skill) => {
                  const iconCandidate = skill.icon;
                  const Icon = typeof iconCandidate === 'string'
                    ? (iconMap[iconCandidate] || FiCode)
                    : iconCandidate;
                  return (
                    <div
                      key={skill.name}
                      className="reveal-item glass-panel bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 md:px-5 md:py-3 flex items-center gap-3 hover:-translate-y-0.5 transition-transform duration-200"
                      style={{ pointerEvents: 'auto' }}
                    >
                      {skill.imgSrc ? (
                        <img
                          src={skill.imgSrc}
                          alt={skill.name}
                          className="h-6 w-6 object-contain shrink-0"
                        />
                      ) : (
                        Icon && (
                          <Icon
                            className="text-2xl shrink-0"
                            style={{ color: skill.color }}
                          />
                        )
                      )}
                      <span className="text-slate-300 text-sm md:text-base font-semibold">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;