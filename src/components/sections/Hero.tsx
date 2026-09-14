"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const ROLES = [
  "Full-Stack Engineer",
  "AI / ML Engineer",
  "Embedded Dev",
  "React Native Dev",
];

function useTypewriter(words: string[], typingSpeed = 65, deleteSpeed = 35, pauseMs = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (display.length < current.length) {
        timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pause"), pauseMs);
      }
    } else if (phase === "pause") {
      setPhase("deleting");
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), deleteSpeed);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [display, phase, wordIdx, words, typingSpeed, deleteSpeed, pauseMs]);

  return display;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const photoVariant = {
  hidden: { opacity: 0, scale: 0.92, x: 30 },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 1, ease: EASE, delay: 0.2 },
  },
};

function MagneticButton({
  children,
  href,
  className,
  target,
}: {
  children: React.ReactNode;
  href: string;
  className: string;
  target?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}

function FloatingPhoto() {
  return (
    <motion.div
      variants={photoVariant}
      className="relative flex-shrink-0"
    >
      {/* Outer glow ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        className="absolute -inset-3 rounded-full opacity-30"
        style={{
          background:
            "conic-gradient(from 0deg, #818cf8, #c084fc, #818cf8, transparent, #818cf8)",
          filter: "blur(8px)",
        }}
      />

      {/* Static border ring */}
      <div
        className="absolute -inset-[2px] rounded-full"
        style={{
          background: "linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #4f46e5 100%)",
        }}
      />

      {/* Photo container */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden"
      >
        <Image
          src="/profile.jpg"
          alt="Jai Patel"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </motion.div>

      {/* Floating badge — status */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: EASE }}
        className="absolute -bottom-3 -right-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-mono border"
        style={{
          background: "rgba(9,9,11,0.9)",
          border: "1px solid rgba(74,222,128,0.3)",
          color: "#4ade80",
          backdropFilter: "blur(8px)",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
        Open to work
      </motion.div>

      {/* Floating badge — year */}
      <motion.div
        initial={{ opacity: 0, x: 10, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5, ease: EASE }}
        className="absolute -top-3 -left-6 rounded-xl px-3 py-1.5 text-xs font-mono border"
        style={{
          background: "rgba(9,9,11,0.9)",
          border: "1px solid rgba(39,39,42,0.8)",
          color: "#a1a1aa",
          backdropFilter: "blur(8px)",
        }}
      >
        CE &apos;29 · TMU
      </motion.div>
    </motion.div>
  );
}

function TypewriterTitle() {
  const role = useTypewriter(ROLES);
  return (
    <motion.p
      variants={item}
      className="text-lg sm:text-xl text-[var(--color-text-secondary)] mb-3 font-mono h-7"
    >
      <span className="text-[var(--color-accent)]">$</span>{" "}
      <span>{role}</span>
      <span
        className="inline-block w-[2px] h-[1em] ml-0.5 align-middle"
        style={{
          background: "var(--color-accent)",
          animation: "blink 1s step-end infinite",
        }}
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </motion.p>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(39,39,42,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(39,39,42,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 50%, black 10%, transparent 100%)",
        }}
      />

      {/* Accent orbs */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 w-[500px] h-[400px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(ellipse, #818cf8 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(ellipse, #c084fc 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      transition={{ delay: 1.7 }}
        className="relative z-10 max-w-5xl w-full flex flex-col md:flex-row items-center gap-12 md:gap-16"
      >
        {/* Left — text */}
        <div className="flex-1 min-w-0">
          {/* Label */}
          <motion.div variants={item} className="mb-6">
            <span
              className="tag-pill"
              style={{
                color: "var(--color-accent)",
                borderColor: "rgba(129,140,248,0.3)",
              }}
            >
              Available for internships · Summer / Fall 2026
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-none mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Jai
            <span
              className="block text-gradient-accent"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Patel.
            </span>
          </motion.h1>

          {/* Typewriter title row */}
          <TypewriterTitle />

          {/* One-liner */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-lg mb-10 leading-relaxed"
          >
            Building production-grade software, from AI SaaS to
            athlete performance platforms. I ship things that work.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3">
            <MagneticButton
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-accent)] text-[#09090b] font-semibold text-sm cursor-pointer"
            >
              View Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.917 7h8.166M7.583 4l3.5 3-3.5 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>

            <MagneticButton
              href="/resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] text-sm font-medium cursor-pointer hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              Resume
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 2v7M4 6.5l3 3 3-3M2.5 11h9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right — photo */}
        <motion.div variants={item} className="flex-shrink-0">
          <FloatingPhoto />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-[var(--color-text-muted)] font-mono tracking-widest uppercase">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-6 bg-gradient-to-b from-[var(--color-text-muted)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
