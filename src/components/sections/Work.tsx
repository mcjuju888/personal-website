"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const jobs = [
  {
    id: 0,
    role: "Co-Founder & Founding Engineer",
    company: "Belvoro",
    period: "December 2025 – Present",
    location: "Toronto",
    description:
      "Founded and scaled Belvoro to $10K MRR, a production voice AI SaaS deploying autonomous front desk agents for service businesses across North America, handling thousands of calls, bookings, and lead conversions.",
    tags: ["React", "TypeScript", "Node.js","PostgreSQL", "Docker"],
  },
  {
    id: 1,
    role: "Founding Engineer",
    company: "Atelier",
    period: "May 2025 – Sept 2025",
    location: "Miami",
    description:
      "Developed an AI-driven product analytics start-up backed with $60K in funding. Built an end-to-end ingestion pipeline and a LangChain-powered engine that turns analytics into deployable UI/UX changes.",
    tags: ["Python", "AWS", "PostgreSQL", "LangChain"],
  },
  {
    id: 2,
    role: "Software Engineering Intern",
    company: "ConnexU",
    period: "May 2024 – August 2024",
    location: "Toronto",
    description:
      "Grew the user base by 500+ on a SaaS AI platform deployed to AWS ECS. Implemented Supabase RPC semantic search across 10K+ events and a Redis-backed map view that cut payload by 95%.",
    tags: ["AWS", "GCP", "React.js", "TypeScript", "FastAPI", "Redis"],
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="flex-shrink-0 text-[var(--color-text-muted)]"
    >
      <path
        d="M3 5l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function TimelineEntry({ job, index }: { job: typeof jobs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={0.08 + index * 0.06}>
      <div className="relative flex gap-6">
        {/* Timeline spine */}
        <div className="flex flex-col items-center flex-shrink-0 w-4">
          <div
            className="mt-[22px] w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 transition-colors duration-200"
            style={{
              borderColor: open ? "var(--color-accent)" : "var(--color-border)",
              background: open ? "var(--color-accent)" : "var(--color-bg)",
            }}
          />
          {index < jobs.length - 1 && (
            <div className="flex-1 w-px mt-2 bg-[var(--color-border)]" style={{ minHeight: "2rem" }} />
          )}
        </div>

        {/* Card */}
        <div className="flex-1 pb-6">
          <div
            className="w-full flex items-center justify-between p-4 rounded-xl border transition-colors text-left cursor-default"
            style={{
              borderColor: open ? "var(--color-accent)" : "var(--color-border)",
              background: open ? "var(--color-surface-2)" : "var(--color-surface)",
            }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <div>
              <p
                className="font-semibold text-[var(--color-text-primary)] text-xl leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {job.company}
              </p>
              <p className="font-mono text-xs text-[var(--color-accent)] mt-1 tracking-wide">
                {job.role}
              </p>
            </div>
            <ChevronIcon open={open} />
          </div>

          <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pt-3 pb-1 space-y-3">
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span className="font-mono text-xs text-[var(--color-text-muted)]">
                        {job.period}
                      </span>
                      <span className="font-mono text-xs text-[var(--color-text-muted)]">
                        {job.location}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs px-2 py-0.5 rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function Work() {
  return (
    <section id="work" className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-sm text-[var(--color-accent)] mb-4 tracking-widest uppercase">
            02 — Work
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Experience.
          </h2>
        </ScrollReveal>

        <div>
          {jobs.map((job, i) => (
            <TimelineEntry key={job.id} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
