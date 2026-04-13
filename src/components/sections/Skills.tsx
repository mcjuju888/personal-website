"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const skillGroups = [
  {
    category: "Languages",
    icon: "{}",
    skills: ["TypeScript", "JavaScript", "Python", "C / C++", "SQL", "HTML / CSS", "Bash", "Java"],
  },
  {
    category: "Frontend",
    icon: "◱",
    skills: ["React", "Next.js", "React Native", "Tailwind CSS", "Expo", "Redux", "Zustand", "shadcn/ui", "Recharts"],
  },
  {
    category: "Backend",
    icon: "⬡",
    skills: ["Node.js", "Express", "FastAPI", "REST APIs", "GraphQL", "WebSockets","MongoDB", "PostgreSQL", "Supabase", "Redis", "Prisma"],
  },
  {
    category: "AI / ML",
    icon: "◎",
    skills: ["LangChain", "OpenAI API","Hugging Face", "Pinecone", "RAG", "NumPy", "Pandas", "scikit-learn"],
  },
  {
    category: "Infrastructure",
    icon: "▲",
    skills: ["AWS (EC2, S3, Lambda)", "Docker", "GitHub Actions", "Vercel", "CI/CD", "Nginx", "Linux", "Git", "Postman"],
  },
  {
    category: "Embedded",
    icon: "⊞",
    skills: ["STM32", "FreeRTOS", "I²C / SPI / UART", "Arduino", "MQTT", "KiCad", "Oscilloscope/Logic Analyzer", "PWM / ADC / DMA"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-sm text-[var(--color-accent)] mb-4 tracking-widest uppercase">
            03 — Skills
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What I work with.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-[var(--color-text-secondary)] mb-12 max-w-lg">
            A toolkit built from real projects, not tutorials.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, gi) => (
            <ScrollReveal key={group.category} delay={gi * 0.06}>
              <motion.div
                whileHover={{ y: -3, borderColor: "rgba(129,140,248,0.4)" }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 h-full cursor-default"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
                  >
                    {group.icon}
                  </span>
                  <p className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest">
                    {group.category}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      className="tag-pill"
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: gi * 0.04 + si * 0.04,
                        duration: 0.35,
                        ease: EASE,
                      }}
                      whileHover={{
                        color: "var(--color-accent)",
                        borderColor: "rgba(129,140,248,0.4)",
                        backgroundColor: "rgba(129,140,248,0.08)",
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
