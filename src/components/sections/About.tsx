"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const currently = [
  {
    type: "studying",
    items: [
      "Data Structures & Algorithms",
      "Digital Systems Design",
      "Operating Systems",
    ],
  },
  {
    type: "building",
    items: [
      "Belvoro - AI receptionist for any business",
      "TMU Webring - Webring for TMU students",
      "SHHH 🤫 - Secret project",
    ],
  },
];

function useCounter(target: number, inView: boolean, duration = 1.2) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return value;
}

function AnimatedStat({
  value,
  label,
  suffix = "",
  isText,
  textValue,
}: {
  value?: number;
  label: string;
  suffix?: string;
  isText?: boolean;
  textValue?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCounter(value ?? 0, inView);

  return (
    <div ref={ref} className="flex flex-col">
      <motion.span
        className="text-2xl font-bold text-[var(--color-text-primary)]"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {isText ? textValue : `${count}${suffix}`}
      </motion.span>
      <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mt-0.5">
        {label}
      </span>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-sm text-[var(--color-accent)] mb-4 tracking-widest uppercase">
            01 — About
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Engineer by instinct,
            <br />
            <span className="text-gradient-accent">builder by choice.</span>
          </h2>
        </ScrollReveal>

        {/* Bio */}
        <ScrollReveal delay={0.1}>
          <div className="space-y-4 text-[var(--color-text-secondary)] text-base leading-relaxed mb-12">
            <p>
              I&apos;m a second-year Computer Engineering student at Toronto
              Metropolitan University, focused on building software people
              actually use. My work spans the full stack, including React Native
              mobile apps, Next.js web platforms, Python AI pipelines, and
              microcontroller firmware.
            </p>
            <p>
              I&apos;ve shipped production software in both startup and
              freelance contexts. I care about the craft: clean architecture,
              readable code, fast iteration. Currently seeking software
              engineering internships for Summer/Fall 2026.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay={0.18}>
          <div className="flex flex-wrap gap-8 mb-12 py-6 border-y border-[var(--color-border)]">
            <AnimatedStat isText textValue="2nd" label="Year" />
            <AnimatedStat isText textValue="CompE" label="Program" />
            <AnimatedStat isText textValue="TMU" label="School" />
            <AnimatedStat value={4} suffix="+" label="Live products" />
            <AnimatedStat value={3} suffix="+" label="Years coding" />
          </div>
        </ScrollReveal>

        {/* Currently */}
        <ScrollReveal delay={0.22}>
          <div className="grid sm:grid-cols-2 gap-4">
            {currently.map((block) => (
              <div
                key={block.type}
                className="rounded-xl p-5 border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <p className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest mb-3">
                  Currently {block.type}
                </p>
                <ul className="space-y-1.5">
                  {block.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.4, ease: EASE }}
                      className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
