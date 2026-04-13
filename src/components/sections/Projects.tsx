"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface Project {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  links?: { label: string; href: string }[];
  status?: string;
  image: string;
}

const projects: Project[] = [
  {
    name: "Belvoro",
    tagline: "Voice AI for car dealerships",
    description:
      "SaaS platform deploying AI voice agents to handle inbound dealership calls — appointment booking, lead qualification, follow-ups — using Retell AI for real-time voice synthesis and Supabase for CRM data.",
    tags: ["Next.js", "Retell AI", "Supabase", "TypeScript", "Stripe"],
    status: "Live",
    image: "/belvoro.avif",
    links: [{ label: "belvoroai.com", href: "https://belvoroai.com" }],
  },
  {
    name: "Gos Training System",
    tagline: "Athlete training platform",
    description:
      "Full-stack training app for strength & conditioning coaches. Coaches build and assign programs; athletes track workouts on mobile. React Native iOS/Android + Next.js web admin, backed by Supabase.",
    tags: ["React Native", "Next.js", "Supabase", "Expo", "TypeScript"],
    status: "In Progress",
    image: "/gts.jpg",
    links: [],
  },
  {
    name: "Cortex",
    tagline: "AI study assistant w/ RAG",
    description:
      "Upload your lecture slides and Cortex builds a searchable knowledge base using a RAG pipeline. Ask questions in natural language and get answers grounded in your own course material — not hallucinations.",
    tags: ["Python", "LangChain", "Next.js", "OpenAI", "Pinecone", "FastAPI"],
    status: "In Progress",
    image: "/cortex.webp",
    links: [],
  },
  {
    name: "VoltBoard",
    tagline: "Real-time IoT sensor dashboard",
    description:
      "STM32 microcontroller streams temperature, humidity, and voltage readings over MQTT. A Node.js broker fans the data out to a React dashboard with live charts — sub-100ms latency from sensor to screen.",
    tags: ["C++", "FreeRTOS", "MQTT", "Node.js", "React", "WebSockets"],
    status: "In Progress",
    image: "/circuit.avif",
    links: [],
  },
];

function StatusBadge({ status }: { status: string }) {
  const isLive = status === "Live";
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded-full"
      style={{
        background: isLive ? "rgba(74, 222, 128, 0.1)" : "rgba(129, 140, 248, 0.1)",
        color: isLive ? "#4ade80" : "#818cf8",
        border: `1px solid ${isLive ? "rgba(74,222,128,0.2)" : "rgba(129,140,248,0.2)"}`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: isLive ? "#4ade80" : "#818cf8" }}
      />
      {status}
    </span>
  );
}

function TiltCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
    stiffness: 200,
    damping: 25,
  });

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <ScrollReveal delay={index * 0.08}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="h-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-colors flex flex-col overflow-hidden"
      >
        {/* Image / screenshot area */}
        <div className="relative h-44 overflow-hidden bg-[var(--color-surface-2)]">
          <>
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
            />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 30%, var(--color-surface) 100%)",
                }}
              />
              {/* Name watermark */}
              <div className="absolute inset-0 flex items-end p-4">
                <p
                  className="text-xs font-mono text-[var(--color-text-muted)] opacity-80"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                >
                  /{project.name.toLowerCase().replace(/\s/g, "-")}
                </p>
              </div>
          </>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-5 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3
                className="text-base font-semibold text-[var(--color-text-primary)] leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.name}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                {project.tagline}
              </p>
            </div>
            {project.status && <StatusBadge status={project.status} />}
          </div>

          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          {project.links && project.links.length > 0 && (
            <div className="flex gap-3 pt-1 border-t border-[var(--color-border)]">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[var(--color-accent)] hover:underline flex items-center gap-1 mt-2"
                >
                  {link.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 8L8 2M8 2H4M8 2V6"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-sm text-[var(--color-accent)] mb-4 tracking-widest uppercase">
            02 — Projects
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Things I&apos;ve built.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-[var(--color-text-secondary)] mb-12 max-w-lg">
            Production software, shipped. Not just side projects.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <TiltCard key={project.name + i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
