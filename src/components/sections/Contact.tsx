"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const EMAIL = "jai.a.patel@torontomu.ca";
const RESUME_HREF = "/resume.pdf";

const externalLinks = [
  {
    label: "LinkedIn",
    value: "/in/jai-patel0325",
    href: "https://linkedin.com/in/jai-patel0325",
  },
  {
    label: "GitHub",
    value: "github.com/mcjuju888",
    href: "https://github.com/mcjuju888",
  },
];

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
      <path
        d="M2.917 7h8.166M7.583 4l3.5 3-3.5 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
      <path
        d="M7 2v7M4 6.5l3 3 3-3M2.5 11h9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
      <path
        d="M2.5 7.5l3 3 6-6"
        stroke="#4ade80"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
      <rect x="5" y="5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M9 5V3.5A1.5 1.5 0 0 0 7.5 2h-4A1.5 1.5 0 0 0 2 3.5v4A1.5 1.5 0 0 0 3.5 9H5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EmailRow() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <ScrollReveal delay={0.12}>
      <button
        onClick={handleCopy}
        className="group w-full flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-2)] transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider w-16">
            Email
          </span>
          <span className="font-mono text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
            {EMAIL}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              style={{ color: "#4ade80" }}
            >
              <CheckIcon />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors"
            >
              <CopyIcon />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Copied toast */}
      <AnimatePresence>
        {copied && (
          <motion.p
            key="toast"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-xs mt-1.5 ml-1"
            style={{ color: "#4ade80" }}
          >
            Copied to clipboard
          </motion.p>
        )}
      </AnimatePresence>
    </ScrollReveal>
  );
}

function ResumeRow() {
  return (
    <ScrollReveal delay={0.3}>
      <a
        href="https://drive.google.com/file/d/1KHiqIUCb5earLVYsS0aJXyp2Wp4uO_QF/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-2)] transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider w-16">
            Resume
          </span>
          <span className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
            Jai_Patel_Resume.pdf
          </span>
        </div>
        <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
          <DownloadIcon />
        </span>
      </a>
    </ScrollReveal>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-sm text-[var(--color-accent)] mb-4 tracking-widest uppercase">
            05 — Contact
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let&apos;s work together.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-[var(--color-text-secondary)] mb-12 max-w-md leading-relaxed">
            I&apos;m actively looking for software engineering internship
            opportunities. If you&apos;re hiring or just want to chat about
            what I&apos;m building, reach out.
          </p>
        </ScrollReveal>

        <div className="space-y-3">
          <EmailRow />

          {externalLinks.map((link, i) => (
            <ScrollReveal key={link.label} delay={0.18 + i * 0.06}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-2)] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider w-16">
                    {link.label}
                  </span>
                  <span className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {link.value}
                  </span>
                </div>
                <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                  <ArrowRight />
                </span>
              </a>
            </ScrollReveal>
          ))}

          <ResumeRow />
        </div>

        {/* Footer */}
        <ScrollReveal delay={0.4}>
          <div className="mt-24 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="font-mono text-xs text-[var(--color-text-muted)]">
              Built with Next.js · Tailwind CSS
            </p>
            <p className="font-mono text-xs text-[var(--color-text-muted)]">
              © {new Date().getFullYear()} Jai Patel
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
