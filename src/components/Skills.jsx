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
        { name: "Python", icon: SiPython, color: "#3776AB" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "Java", icon: FaJava, color: "#ED8B00" },
        { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
        { name: "CSS3", icon: SiCss3, color: "#1572B6" },
        { name: "R Language", icon: SiR, color: "#276DC3" }
      ]
    },
    {
      title: "Libraries & Frameworks",
      skills: [
        { name: "React.js", icon: SiReact, color: "#61DAFB" },
        { name: "Next.js", icon: SiNextdotjs, color: "#00E5FF" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
        { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
        { name: "Vite", icon: SiVite, color: "#646CFF" }
      ]
    },
    {
      title: "Backend & Cloud Engines",
      skills: [
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Express.js", icon: SiExpress, color: "#00E5FF" },
        { name: "Flask", icon: SiFlask, color: "#00E5FF" },
        { name: "Docker", icon: SiDocker, color: "#2496ED" }
      ]
    },
    {
      title: "Databases & Analytics",
      skills: [
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "Power BI", imgSrc: "/assets/powerbi.svg" }
      ]
    },
    {
      title: "Developer Tools",
      skills: [
        { name: "Git", icon: SiGit, color: "#F05032" },
        { name: "Postman", icon: SiPostman, color: "#FF6C37" },
        { name: "VS Code", imgSrc: "/assets/vscode.svg" },
        { name: "Canva", icon: SiCanva, color: "#00C4CC" }
      ]
    }
  ];


  return (
    <section
      id="skills"
      className="py-28 relative bg-black dark:bg-black theme-light:bg-neutral-50 text-white theme-light:text-black border-t border-neutral-900 theme-light:border-neutral-200"
      data-scroll="section"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-1 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest bg-cyan-950/20">
            04 // TECHNICAL COMPETENCIES & TOOLING
          </div>
          <h2 ref={headingRef} className="text-5xl sm:text-6xl md:text-7xl font-serif font-extrabold mb-6 uppercase tracking-tight">
            CAPABILITIES & <span className="italic font-normal text-cyan-400">STACK</span>
          </h2>
          <p className="text-neutral-400 theme-light:text-neutral-600 max-w-3xl mx-auto text-xl md:text-2xl font-serif leading-relaxed">
            A comprehensive architectural toolkit spanning languages, machine learning frameworks, and database engines.
          </p>
        </div>

        {/* Categorized Skills */}
        <div ref={gridRef} className="mt-16 max-w-6xl mx-auto">
          {skillCategories.map((category) => (
            <div key={category.title} className="mb-14 last:mb-0">
              <h3 className="text-2xl font-serif font-bold mb-6 text-cyan-400 tracking-wide uppercase border-b border-neutral-800 theme-light:border-neutral-200 pb-2">
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
                      className="reveal-item border border-neutral-800 theme-light:border-neutral-300 bg-neutral-900/60 theme-light:bg-neutral-100/60 px-5 py-4 flex items-center gap-4 hover:border-white/60 transition-all duration-300 group"
                    >
                      {skill.imgSrc ? (
                        <img
                          src={skill.imgSrc}
                          alt={skill.name}
                          className="h-7 w-7 object-contain shrink-0 group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        Icon && (
                          <Icon
                            className="text-3xl shrink-0 group-hover:scale-110 transition-transform duration-300"
                            style={{ color: skill.color || "#00e5ff" }}
                            aria-label={skill.name}
                            title={skill.name}
                            role="img"
                          />
                        )
                      )}
                      <span className="text-neutral-200 theme-light:text-neutral-800 text-lg font-serif font-semibold tracking-wide group-hover:text-white transition-colors">
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