import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

function getClipPath({ variant, x, y, endRadius }) {
  const r = endRadius * 1.5;
  switch (variant) {
    case "circle":
      return {
        start: `circle(0px at ${x}px ${y}px)`,
        end: `circle(${endRadius * 1.2}px at ${x}px ${y}px)`,
      };
    case "square":
      return {
        start: `polygon(${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px)`,
        end: `polygon(${x - r}px ${y - r}px, ${x + r}px ${y - r}px, ${x + r}px ${y + r}px, ${x - r}px ${y + r}px)`,
      };
    case "triangle":
      return {
        start: `polygon(${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px)`,
        end: `polygon(${x}px ${y - r * 1.5}px, ${x + r * 1.5}px ${y + r * 1.5}px, ${x - r * 1.5}px ${y + r * 1.5}px)`,
      };
    case "diamond":
      return {
        start: `polygon(${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px)`,
        end: `polygon(${x}px ${y - r}px, ${x + r}px ${y}px, ${x}px ${y + r}px, ${x - r}px ${y}px)`,
      };
    case "rectangle":
      return {
        start: `inset(${y}px ${window.innerWidth - x}px ${window.innerHeight - y}px ${x}px)`,
        end: `inset(0px 0px 0px 0px)`,
      };
    case "hexagon": {
      const pointsStart = Array.from({ length: 6 }, () => `${x}px ${y}px`).join(", ");
      const pointsEnd = Array.from({ length: 6 }, (_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const px = Math.round(x + r * Math.cos(angle));
        const py = Math.round(y + r * Math.sin(angle));
        return `${px}px ${py}px`;
      }).join(", ");
      return {
        start: `polygon(${pointsStart})`,
        end: `polygon(${pointsEnd})`,
      };
    }
    case "star": {
      const pointsStart = Array.from({ length: 10 }, () => `${x}px ${y}px`).join(", ");
      const pointsEnd = Array.from({ length: 10 }, (_, i) => {
        const angle = (i * 36 * Math.PI) / 180 - Math.PI / 2;
        const radius = i % 2 === 0 ? r : r * 0.4;
        const px = Math.round(x + radius * Math.cos(angle));
        const py = Math.round(y + radius * Math.sin(angle));
        return `${px}px ${py}px`;
      }).join(", ");
      return {
        start: `polygon(${pointsStart})`,
        end: `polygon(${pointsEnd})`,
      };
    }
    default:
      return {
        start: `circle(0px at ${x}px ${y}px)`,
        end: `circle(${endRadius * 1.2}px at ${x}px ${y}px)`,
      };
  }
}

export function AnimatedThemeToggler({
  variant = "circle",
  duration = 600,
  fromCenter = false,
  className = "",
  theme,
  onToggle,
  ...props
}) {
  const [internalDark, setInternalDark] = useState(() => {
    if (typeof document !== "undefined") {
      return (
        document.documentElement.classList.contains("dark") ||
        document.documentElement.classList.contains("theme-dark")
      );
    }
    return true;
  });

  const isDark = theme !== undefined ? theme === "dark" : internalDark;

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const darkActive =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.classList.contains("theme-dark");
      setInternalDark(darkActive);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleToggle = (e) => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (!fromCenter && e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const applyThemeChange = () => {
      if (onToggle) {
        onToggle();
      } else {
        const nextDark = !isDark;
        if (nextDark) {
          document.documentElement.classList.add("dark", "theme-dark");
          document.documentElement.classList.remove("light", "theme-light");
          document.body.classList.add("dark", "theme-dark");
          document.body.classList.remove("light", "theme-light");
        } else {
          document.documentElement.classList.add("light", "theme-light");
          document.documentElement.classList.remove("dark", "theme-dark");
          document.body.classList.add("light", "theme-light");
          document.body.classList.remove("dark", "theme-dark");
        }
        setInternalDark(nextDark);
      }
    };

    if (!document.startViewTransition) {
      applyThemeChange();
      return;
    }

    const { start, end } = getClipPath({ variant, x, y, endRadius });

    const transition = document.startViewTransition(() => {
      applyThemeChange();
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [start, end],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className={`relative inline-flex items-center justify-center p-2.5 rounded-full border border-slate-700/60 bg-slate-800/60 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 shadow-md ${className}`}
      aria-label="Toggle theme"
      {...props}
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <FiSun className="w-5 h-5 text-amber-400" />
        ) : (
          <FiMoon className="w-5 h-5 text-cyan-400" />
        )}
      </motion.div>
    </motion.button>
  );
}

export default AnimatedThemeToggler;
