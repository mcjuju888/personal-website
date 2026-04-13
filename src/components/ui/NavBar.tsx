"use client";

import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return active;
}

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 });
  const active = useActiveSection(navLinks.map((l) => l.id));

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 50);
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-4"
    >
      <div
        className="relative flex items-center justify-between gap-8 rounded-xl px-4 py-2.5 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(9,9,11,0.85)" : "transparent",
          border: scrolled ? "1px solid rgba(39,39,42,0.8)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          maxWidth: "640px",
          width: "100%",
        }}
      >
        <a
          href="#hero"
          className="font-mono text-sm text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
        >
          jp<span className="text-[var(--color-accent)]">.</span>
        </a>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className="relative px-3 py-1.5 text-sm rounded-lg transition-colors"
                style={{
                  color: isActive
                    ? "var(--color-accent)"
                    : "var(--color-text-secondary)",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(129,140,248,0.08)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX, transformOrigin: "left" }}
          className="absolute bottom-0 left-3 right-3 h-px rounded-full"
          aria-hidden="true"
        >
          <div
            className="h-full w-full rounded-full"
            style={{ background: "linear-gradient(90deg, #818cf8, #c084fc)" }}
          />
        </motion.div>
      </div>
    </motion.header>
  );
}
