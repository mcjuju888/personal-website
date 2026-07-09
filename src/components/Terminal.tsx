"use client";

import { track } from "@vercel/analytics";
import { useEffect, useRef, useState } from "react";

/* ---------- content ---------- */

const EMAIL = "jai.a.patel@torontomu.ca";
const RESUME_URL =
  "https://drive.google.com/file/d/1KHiqIUCb5earLVYsS0aJXyp2Wp4uO_QF/view?usp=sharing";
const GITHUB_URL = "https://github.com/mcjuju888";
const LINKEDIN_URL = "https://linkedin.com/in/jai-patel0325";

const jobs = [
  {
    role: "Co-Founder & Founding Engineer",
    company: "Belvoro",
    period: "Dec 2025 – Present · Toronto",
    description:
      "Founded and scaled Belvoro to $10K MRR — a production voice AI SaaS deploying autonomous front desk agents for service businesses across North America.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    role: "Founding Engineer",
    company: "Atelier",
    period: "May 2025 – Sept 2025 · Miami",
    description:
      "AI-driven product analytics startup backed by Telora ($60K). Built an end-to-end ingestion pipeline and a LangChain-powered engine that turns analytics into deployable UI/UX changes.",
    tags: ["Python", "AWS", "PostgreSQL", "LangChain"],
  },
  {
    role: "Software Engineering Intern",
    company: "ConnexU",
    period: "May 2024 – Aug 2024 · Toronto",
    description:
      "Grew the user base by 500+ on a SaaS AI platform on AWS ECS. Supabase RPC semantic search across 10K+ events; Redis-backed map view that cut payload by 95%.",
    tags: ["AWS", "React", "TypeScript", "FastAPI", "Redis"],
  },
];

const projects = [
  {
    name: "TMU Webring",
    status: "in progress",
    description:
      "Open-source portfolio network for TMU students. Submit your site, get listed, join a ring of student developers — making student work discoverable beyond LinkedIn.",
    tags: ["Remix", "TypeScript", "SQLite", "Fly.io"],
  },
  {
    name: "Gos Training System",
    status: "live",
    description:
      "Custom coaching platform for a real trainer client. Coaches design progressive programs; athletes log sessions on iOS/Android.",
    tags: ["React Native", "Next.js", "Supabase", "Expo"],
  },
  {
    name: "Cortex",
    status: "live",
    description:
      "Upload lecture slides → searchable knowledge base via a RAG pipeline. Ask questions in natural language, get answers grounded in your own course material.",
    tags: ["Python", "LangChain", "OpenAI", "Pinecone", "FastAPI"],
  },
  {
    name: "VoltBoard",
    status: "in progress",
    description:
      "STM32 streams temperature, humidity, and voltage over MQTT to a live React dashboard. Sub-100ms sensor-to-screen latency.",
    tags: ["C++", "FreeRTOS", "MQTT", "Node.js", "WebSockets"],
  },
];

const skillGroups: [string, string][] = [
  ["languages", "TypeScript · JavaScript · Python · C/C++ · SQL · Java · Bash"],
  ["frontend", "React · Next.js · React Native · Tailwind · Expo · Zustand"],
  ["backend", "Node.js · Express · FastAPI · GraphQL · PostgreSQL · Supabase · Redis"],
  ["ai/ml", "LangChain · OpenAI API · RAG · Pinecone · Hugging Face · Pandas"],
  ["infra", "AWS · Docker · GitHub Actions · Vercel · CI/CD · Linux"],
  ["embedded", "STM32 · FreeRTOS · I²C/SPI/UART · MQTT · KiCad"],
];

/* ---------- palette ---------- */

const ACCENT = "#818cf8";
const GREEN = "#4ade80";
const YELLOW = "#fbbf24";
const DIM = "#52525b";

/* ---------- small pieces ---------- */

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 hover:brightness-125"
      style={{ color: ACCENT }}
    >
      {children}
    </a>
  );
}

function Cmd({ name, run }: { name: string; run: (c: string) => void }) {
  return (
    <button
      onClick={() => run(name)}
      className="underline underline-offset-2 hover:brightness-125 cursor-pointer"
      style={{ color: GREEN }}
    >
      {name}
    </button>
  );
}

/* Staggered line reveal for "streaming" output */
function Lines({ lines, step = 0 }: { lines: React.ReactNode[]; step?: number }) {
  return (
    <div>
      {lines.map((l, i) => (
        <div key={i} className="term-line" style={{ animationDelay: `${i * step}ms` }}>
          {l}
        </div>
      ))}
    </div>
  );
}

/* Shared content blocks — used inline (mobile) and in popup windows (desktop) */

function ProjectBlock({ p }: { p: (typeof projects)[0] }) {
  return (
    <div>
      <p>
        <span style={{ color: GREEN }}>▸ {p.name}</span>{" "}
        <span className="text-xs" style={{ color: p.status === "live" ? GREEN : ACCENT }}>
          [{p.status}]
        </span>
      </p>
      <p style={{ color: "#a1a1aa" }} className="mt-1">
        {p.description}
      </p>
      <p style={{ color: DIM }} className="text-xs mt-2">
        [{p.tags.join(", ")}]
      </p>
    </div>
  );
}

function JobBlock({ j }: { j: (typeof jobs)[0] }) {
  return (
    <div>
      <p>
        <span style={{ color: GREEN }}>▸ {j.company}</span>{" "}
        <span style={{ color: DIM }}>· {j.period}</span>
      </p>
      <p style={{ color: ACCENT }} className="text-xs">
        {j.role}
      </p>
      <p style={{ color: "#a1a1aa" }} className="mt-1">
        {j.description}
      </p>
      <p style={{ color: DIM }} className="text-xs mt-2">
        [{j.tags.join(", ")}]
      </p>
    </div>
  );
}

function SkillsBlock() {
  return (
    <div className="space-y-1">
      {skillGroups.map(([cat, list]) => (
        <p key={cat}>
          <span className="inline-block w-24 align-top" style={{ color: ACCENT }}>
            {cat}
          </span>
          <span style={{ color: "#a1a1aa" }}>{list}</span>
        </p>
      ))}
    </div>
  );
}

function ContactBlock() {
  return (
    <div className="space-y-1">
      <p>
        <span className="inline-block w-20" style={{ color: DIM }}>email</span>
        <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>
      </p>
      <p>
        <span className="inline-block w-20" style={{ color: DIM }}>github</span>
        <Link href={GITHUB_URL}>github.com/mcjuju888</Link>
      </p>
      <p>
        <span className="inline-block w-20" style={{ color: DIM }}>linkedin</span>
        <Link href={LINKEDIN_URL}>/in/jai-patel0325</Link>
      </p>
      <p>
        <span className="inline-block w-20" style={{ color: DIM }}>resume</span>
        <Link href={RESUME_URL}>Jai_Patel_Resume.pdf</Link>
      </p>
      <p style={{ color: GREEN }} className="pt-1">
        actively looking for SWE internships — inbox is open.
      </p>
    </div>
  );
}

function RecruiterBlock() {
  const highlights: [string, string][] = [
    ["$10K MRR", "founded Belvoro — production voice-AI SaaS, thousands of calls handled"],
    ["$60K backed", "founding engineer @ Atelier (Telora-backed AI analytics startup)"],
    ["+500 users", "shipped as SWE intern @ ConnexU (AWS ECS, cut payloads 95%)"],
    ["4+ live products", "full-stack, AI/RAG, and embedded — shipped, not tutorials"],
  ];
  return (
    <div className="space-y-3">
      <p style={{ color: YELLOW }}>TL;DR — why hire jai:</p>
      <div className="space-y-2">
        {highlights.map(([num, text]) => (
          <p key={num}>
            <span style={{ color: GREEN }} className="font-bold">{num}</span>{" "}
            <span style={{ color: "#a1a1aa" }}>— {text}</span>
          </p>
        ))}
      </div>
      <p style={{ color: "#a1a1aa" }}>
        <span style={{ color: ACCENT }}>Computer Engineering @ TMU</span> ·
        Toronto · available{" "}
        <span style={{ color: YELLOW }}>Summer/Fall 2026</span>
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("cta", { target: "resume", from: "recruiter-window" })}
          className="px-3 py-1.5 rounded-md text-xs font-bold hover:brightness-110"
          style={{ background: ACCENT, color: "#09090b" }}
        >
          view resume ↗
        </a>
        <a
          href={`mailto:${EMAIL}`}
          onClick={() => track("cta", { target: "email", from: "recruiter-window" })}
          className="px-3 py-1.5 rounded-md text-xs font-bold border hover:brightness-125"
          style={{ borderColor: GREEN, color: GREEN }}
        >
          email me
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("cta", { target: "linkedin", from: "recruiter-window" })}
          className="px-3 py-1.5 rounded-md text-xs border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:brightness-125"
        >
          linkedin
        </a>
      </div>
    </div>
  );
}

/* ---------- floating popup windows ---------- */

interface Win {
  id: string;
  group: string;
  title: string;
  x: number;
  y: number;
  z: number;
  w: number;
  node: React.ReactNode;
  delay: number;
}

function FloatWindow({
  win,
  onClose,
  onFocus,
  onMove,
}: {
  win: Win;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
}) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  return (
    <div
      className="fixed rounded-lg border border-[var(--color-border)] shadow-2xl overflow-hidden term-pop"
      style={{
        left: win.x,
        top: win.y,
        zIndex: win.z,
        width: win.w,
        background: "rgba(17,17,19,0.96)",
        backdropFilter: "blur(10px)",
        animationDelay: `${win.delay}ms`,
      }}
      onPointerDown={() => onFocus(win.id)}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface-2)] cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: "none" }}
        onPointerDown={(e) => {
          drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (drag.current)
            onMove(win.id, e.clientX - drag.current.dx, e.clientY - drag.current.dy);
        }}
        onPointerUp={() => (drag.current = null)}
      >
        <button
          className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 shrink-0 group relative cursor-pointer"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onClose(win.id)}
          aria-label={`close ${win.title}`}
        >
          <span className="absolute inset-0 hidden group-hover:flex items-center justify-center text-[8px] text-black/70 font-bold">
            ×
          </span>
        </button>
        <span className="w-3 h-3 rounded-full bg-[#3a3a3e] shrink-0" />
        <span className="w-3 h-3 rounded-full bg-[#3a3a3e] shrink-0" />
        <p className="flex-1 text-center font-mono text-[11px] text-[var(--color-text-muted)] truncate pr-9">
          {win.title}
        </p>
      </div>
      <div className="p-4 font-mono text-[13px] leading-relaxed max-h-[50vh] overflow-y-auto">
        {win.node}
      </div>
    </div>
  );
}

/* Scatter positions around the centered terminal, clamped to the viewport. */
function scatterPos(i: number, w: number) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const slots: [number, number][] = [
    [0.03 * W, 0.14 * H],
    [W - w - 0.03 * W, 0.16 * H],
    [0.04 * W, 0.56 * H],
    [W - w - 0.04 * W, 0.54 * H],
    [W / 2 - w / 2, 0.06 * H],
    [0.1 * W, 0.34 * H],
  ];
  const [x, y] = slots[i % slots.length];
  const nudge = Math.floor(i / slots.length) * 28;
  return {
    x: Math.max(8, Math.min(x + nudge, W - w - 8)),
    y: Math.max(44, Math.min(y + nudge, H - 160)),
  };
}

/* ---------- command outputs (inline / mobile fallback) ---------- */

function buildCommands(run: (c: string) => void): Record<string, React.ReactNode> {
  const help = (
    <div className="space-y-1">
      <p style={{ color: DIM }}>available commands:</p>
      {(
        [
          ["recruiter", "⭐ the 30-second pitch"],
          ["about", "who is jai?"],
          ["work", "work experience"],
          ["projects", "things i've built"],
          ["skills", "the toolkit"],
          ["contact", "get in touch"],
          ["resume", "open my resume"],
          ["neofetch", "system info"],
          ["clear", "wipe screen + close windows"],
        ] as const
      ).map(([name, desc]) => (
        <p key={name}>
          <span className="inline-block w-24">
            <Cmd name={name} run={run} />
          </span>
          <span style={{ color: DIM }}>— {desc}</span>
        </p>
      ))}
      <p style={{ color: DIM }} className="pt-1">
        hint: some commands open windows around the terminal — drag them, red
        dot closes, <span style={{ color: YELLOW }}>esc</span> closes all. try{" "}
        <span style={{ color: YELLOW }}>sudo hire jai</span>.
      </p>
    </div>
  );

  const about = (
    <div className="space-y-2 max-w-xl">
      <p>
        <span style={{ color: ACCENT }}>jai patel</span> — 2nd-year Computer
        Engineering @ Toronto Metropolitan University.
      </p>
      <p style={{ color: "#a1a1aa" }}>
        I build software people actually use: React Native apps, Next.js
        platforms, Python AI pipelines, and microcontroller firmware. Shipped
        production software in startup and freelance contexts.
      </p>
      <p style={{ color: "#a1a1aa" }}>
        Currently studying <span style={{ color: GREEN }}>DSA, digital systems
        design, and operating systems</span> — and building{" "}
        <span style={{ color: GREEN }}>Belvoro</span> (AI receptionist),{" "}
        <span style={{ color: GREEN }}>TMU Webring</span>, and a secret project 🤫
      </p>
      <p style={{ color: YELLOW }}>
        status: seeking Summer/Fall 2026 SWE internships →{" "}
        <Cmd name="contact" run={run} />
      </p>
    </div>
  );

  const neofetch = (
    <div className="flex gap-6 flex-wrap">
      <pre className="leading-tight" style={{ color: ACCENT }}>
{`     ██╗ █████╗ ██╗
     ██║██╔══██╗██║
     ██║███████║██║
██   ██║██╔══██║██║
╚█████╔╝██║  ██║██║
 ╚════╝ ╚═╝  ╚═╝╚═╝`}
      </pre>
      <div>
        <p>
          <span style={{ color: GREEN }}>jai</span>@<span style={{ color: GREEN }}>portfolio</span>
        </p>
        <p style={{ color: DIM }}>─────────────────</p>
        {(
          [
            ["OS", "JaiOS (Toronto build)"],
            ["Host", "TMU · Computer Engineering '29"],
            ["Shell", "next.js + tailwind"],
            ["Uptime", "3+ years coding"],
            ["Packages", "4+ live products"],
            ["CPU", "caffeine-overclocked"],
            ["Status", "open to internships"],
          ] as const
        ).map(([k, v]) => (
          <p key={k}>
            <span style={{ color: ACCENT }} className="inline-block w-20">
              {k}
            </span>
            <span style={{ color: "#a1a1aa" }}>{v}</span>
          </p>
        ))}
      </div>
    </div>
  );

  const sudoHire = (
    <Lines
      step={350}
      lines={[
        <span key="0" style={{ color: DIM }}>[sudo] password for recruiter: ********</span>,
        <span key="1">verifying credentials... <span style={{ color: GREEN }}>OK</span></span>,
        <span key="2">checking references... <span style={{ color: GREEN }}>OK</span></span>,
        <span key="3">evaluating vibe... <span style={{ color: GREEN }}>IMMACULATE</span></span>,
        <span key="4" style={{ color: GREEN }}>✔ offer_letter.pdf generated successfully.</span>,
        <span key="5">
          next step: <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>
        </span>,
      ]}
    />
  );

  return {
    help,
    about,
    work: (
      <div className="space-y-4">
        {jobs.map((j) => (
          <JobBlock key={j.company} j={j} />
        ))}
      </div>
    ),
    projects: (
      <div className="space-y-4">
        {projects.map((p) => (
          <ProjectBlock key={p.name} p={p} />
        ))}
        <p style={{ color: DIM }}>
          more on <Link href={GITHUB_URL}>github</Link>
        </p>
      </div>
    ),
    skills: <SkillsBlock />,
    contact: <ContactBlock />,
    recruiter: <RecruiterBlock />,
    neofetch,
    whoami: (
      <p>
        jai — engineer by instinct, builder by choice.{" "}
        <span style={{ color: DIM }}>(try <Cmd name="about" run={run} />)</span>
      </p>
    ),
    ls: (
      <p className="space-x-6">
        <span style={{ color: YELLOW }}>READ_ME_recruiters.md</span>
        <span style={{ color: ACCENT }}>about.txt</span>
        <span style={{ color: ACCENT }}>work.log</span>
        <span style={{ color: ACCENT }}>projects/</span>
        <span style={{ color: ACCENT }}>skills.json</span>
        <span style={{ color: ACCENT }}>contact.md</span>
        <span style={{ color: GREEN }}>resume.pdf</span>
      </p>
    ),
    "sudo hire jai": sudoHire,
    sudo: (
      <p style={{ color: YELLOW }}>
        permission denied. unless... you meant{" "}
        <Cmd name="sudo hire jai" run={run} />?
      </p>
    ),
    exit: (
      <p style={{ color: YELLOW }}>
        there is no escape. (ok fine — <Cmd name="contact" run={run} /> and
        we&apos;ll call it even)
      </p>
    ),
    hack: (
      <Lines
        step={300}
        lines={[
          <span key="0">initializing exploit framework... <span style={{ color: GREEN }}>done</span></span>,
          <span key="1">bypassing mainframe firewall... <span style={{ color: GREEN }}>done</span></span>,
          <span key="2">downloading the entire internet... <span style={{ color: GREEN }}>done</span></span>,
          <span key="3" style={{ color: YELLOW }}>jk. the only thing compromised here is my sleep schedule.</span>,
        ]}
      />
    ),
  };
}

/* windows spawned around the terminal per command (desktop) */
const windowGroups: Record<string, () => { title: string; w: number; node: React.ReactNode }[]> = {
  projects: () =>
    projects.map((p) => ({
      title: `projects/${p.name.toLowerCase().replace(/\s+/g, "-")}`,
      w: 330,
      node: <ProjectBlock p={p} />,
    })),
  work: () =>
    jobs.map((j) => ({
      title: `work/${j.company.toLowerCase()}.log`,
      w: 350,
      node: <JobBlock j={j} />,
    })),
  skills: () => [{ title: "skills.json", w: 460, node: <SkillsBlock /> }],
  contact: () => [{ title: "contact.md", w: 340, node: <ContactBlock /> }],
  recruiter: () => [
    { title: "READ_ME_recruiters.md", w: 400, node: <RecruiterBlock /> },
  ],
};

/* ---------- terminal ---------- */

interface Entry {
  cmd: string | null;
  output: React.ReactNode;
}

const PROMPT_CMDS = [
  "help", "recruiter", "about", "work", "projects", "skills", "contact",
  "resume", "neofetch", "whoami", "ls", "clear", "sudo hire jai",
];

const ALIASES: Record<string, string> = {
  hire: "recruiter", "hire me": "recruiter", why: "recruiter",
  experience: "work", socials: "contact", cv: "resume",
};

export function Terminal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [wins, setWins] = useState<Win[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const [clock, setClock] = useState("");
  const [ghost, setGhost] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const zRef = useRef(50);
  const interacted = useRef(false);
  const runRef = useRef<(c: string) => void>(() => {});

  const run = (c: string) => runRef.current(c);
  const commands = buildCommands(run);

  function closeWin(id: string) {
    setWins((ws) => ws.filter((w) => w.id !== id));
  }
  function focusWin(id: string) {
    zRef.current += 1;
    const z = zRef.current;
    setWins((ws) => ws.map((w) => (w.id === id ? { ...w, z } : w)));
  }
  function moveWin(id: string, x: number, y: number) {
    setWins((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }

  function spawnGroup(group: string): number {
    const specs = windowGroups[group]();
    const spawned = specs.map((s, i) => {
      zRef.current += 1;
      const pos = scatterPos(i, s.w);
      return {
        id: `${group}-${i}-${zRef.current}`,
        group,
        title: s.title,
        w: s.w,
        node: s.node,
        z: zRef.current,
        delay: i * 90,
        ...pos,
      };
    });
    // replace any previous windows from the same command
    setWins((ws) => [...ws.filter((w) => w.group !== group), ...spawned]);
    return spawned.length;
  }

  runRef.current = (raw: string) => {
    const cmd = raw.trim();
    let key = cmd.toLowerCase();
    key = ALIASES[key] ?? key;
    if (!cmd) return;

    interacted.current = true;
    track("command", { command: key });

    setCmdHistory((h) => [cmd, ...h]);
    setHistIdx(-1);
    setInput("");

    if (key === "clear") {
      setEntries([]);
      setWins([]);
      return;
    }

    let output: React.ReactNode;
    if (windowGroups[key] && window.innerWidth >= 768) {
      const n = spawnGroup(key);
      output = (
        <p style={{ color: DIM }}>
          <span style={{ color: GREEN }}>✔</span> opened {n}{" "}
          {n === 1 ? "window" : "windows"} — drag to rearrange, red dot or{" "}
          <span style={{ color: YELLOW }}>esc</span> to close
        </p>
      );
    } else if (key === "resume") {
      window.open(RESUME_URL, "_blank");
      output = (
        <p style={{ color: GREEN }}>
          opening resume... <Link href={RESUME_URL}>(click here if blocked)</Link>
        </p>
      );
    } else if (key.startsWith("echo ")) {
      output = <p>{cmd.slice(5)}</p>;
    } else if (key === "date") {
      output = <p>{new Date().toString()}</p>;
    } else if (key === "history") {
      output = (
        <div>
          {[...cmdHistory].reverse().map((c, i) => (
            <p key={i} style={{ color: "#a1a1aa" }}>
              <span style={{ color: DIM }} className="inline-block w-8">{i + 1}</span>
              {c}
            </p>
          ))}
        </div>
      );
    } else if (key.startsWith("cat ")) {
      const file = key.slice(4).replace(/\/$/, "");
      const map: Record<string, string> = {
        "about.txt": "about", "work.log": "work", "projects": "projects",
        "skills.json": "skills", "contact.md": "contact",
        "read_me_recruiters.md": "recruiter",
      };
      if (file === "resume.pdf") {
        runRef.current("resume");
        return;
      }
      output = map[file] ? commands[map[file]] : (
        <p style={{ color: YELLOW }}>cat: {file}: no such file or directory</p>
      );
    } else if (commands[key]) {
      output = commands[key];
    } else {
      output = (
        <p>
          <span style={{ color: YELLOW }}>command not found: {cmd}</span>{" "}
          <span style={{ color: DIM }}>
            — type <Cmd name="help" run={run} /> to see what i can do
          </span>
        </p>
      );
    }

    setEntries((e) => [...e, { cmd, output }]);
  };

  /* boot + clock */
  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 100);
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    tick();
    const iv = setInterval(tick, 15000);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, []);

  /* attract mode: idle ghost-typing — commands type out and delete, never run */
  useEffect(() => {
    if (!booted) return;
    const cmds = ["projects", "sudo hire jai", "neofetch", "work", "recruiter"];
    let t: ReturnType<typeof setTimeout>;
    let ci = 0;

    const step = (i: number, deleting: boolean) => {
      if (interacted.current) {
        setGhost("");
        return;
      }
      const cmd = cmds[ci % cmds.length];
      setGhost(cmd.slice(0, i));
      if (!deleting) {
        if (i < cmd.length) t = setTimeout(() => step(i + 1, false), 100);
        else t = setTimeout(() => step(i, true), 1500);
      } else {
        if (i > 0) t = setTimeout(() => step(i - 1, true), 40);
        else {
          ci++;
          t = setTimeout(() => step(1, false), 800);
        }
      }
    };

    t = setTimeout(() => step(1, false), 6000);
    return () => clearTimeout(t);
  }, [booted]);

  /* auto-pop the recruiter pitch once, shortly after boot (desktop only) */
  const pitched = useRef(false);
  useEffect(() => {
    if (!booted || pitched.current || window.innerWidth < 768) return;
    pitched.current = true;
    const t = setTimeout(() => spawnGroup("recruiter"), 1600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted]);

  /* autoscroll */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [entries, booted]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    interacted.current = true;
    setGhost("");
    if (e.key === "Enter") {
      runRef.current(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      if (cmdHistory[next]) {
        setHistIdx(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(Math.max(next, -1));
      setInput(next < 0 ? "" : cmdHistory[next]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = PROMPT_CMDS.find((c) => c.startsWith(input.toLowerCase()));
      if (input && match) setInput(match);
    } else if (e.key === "Escape") {
      setWins([]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  }

  function focusInput() {
    if (!window.getSelection()?.toString()) inputRef.current?.focus();
  }

  const prompt = (
    <span className="shrink-0">
      <span style={{ color: GREEN }}>jai@portfolio</span>
      <span style={{ color: DIM }}>:</span>
      <span style={{ color: ACCENT }}>~</span>
      <span style={{ color: DIM }}>$</span>
    </span>
  );

  return (
    <div className="h-dvh overflow-hidden relative flex flex-col">
      {/* desktop backdrop: grid + glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(129,140,248,0.08), transparent)," +
            "repeating-linear-gradient(0deg, transparent 0 47px, rgba(255,255,255,0.025) 47px 48px)," +
            "repeating-linear-gradient(90deg, transparent 0 47px, rgba(255,255,255,0.025) 47px 48px)",
        }}
      />

      {/* OS menu bar */}
      <div className="relative z-20 flex items-center justify-between px-4 h-8 border-b border-[var(--color-border)] bg-[rgba(17,17,19,0.85)] font-mono text-[11px] text-[var(--color-text-muted)] select-none shrink-0">
        <span>
          <span style={{ color: ACCENT }}>⌘</span> JaiOS{" "}
          <span className="hidden sm:inline">· portfolio.app</span>
        </span>
        <span className="hidden sm:inline" style={{ color: YELLOW }}>
          ● seeking SWE internships — summer/fall 2026
        </span>
        <span className="flex items-center gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("cta", { target: "resume", from: "menubar" })}
            className="font-bold hover:brightness-110 px-2 py-0.5 rounded"
            style={{ background: ACCENT, color: "#09090b" }}
          >
            resume ↗
          </a>
          <a
            href={`mailto:${EMAIL}`}
            onClick={() => track("cta", { target: "email", from: "menubar" })}
            className="hover:brightness-125"
            style={{ color: GREEN }}
          >
            email
          </a>
          <span className="hidden sm:inline">{booted ? clock : ""}</span>
        </span>
      </div>

      {/* desktop area */}
      <div className="relative flex-1 flex items-center justify-center p-3 sm:p-6 min-h-0">
        <div
          className="w-full max-w-3xl h-full max-h-[82vh] rounded-xl border border-[var(--color-border)] overflow-hidden shadow-2xl relative flex flex-col z-10"
          style={{ background: "rgba(13,13,16,0.92)", backdropFilter: "blur(8px)" }}
          onClick={focusInput}
        >
          {/* title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <p className="flex-1 text-center font-mono text-xs text-[var(--color-text-muted)] select-none">
              jai@portfolio: ~
            </p>
            <span className="w-14" />
          </div>

          {/* scanlines */}
          <div className="term-scanlines pointer-events-none absolute inset-0 z-10" />

          {/* body */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 font-mono text-[13px] sm:text-sm leading-relaxed cursor-text"
          >
            {booted && (
              <Lines
                step={120}
                lines={[
                  <span key="0" style={{ color: DIM }}>last login: {new Date().toDateString()} — Toronto, CA</span>,
                  <span key="1">
                    hey, i&apos;m <span style={{ color: ACCENT }}>jai patel</span> 👋
                    — computer engineering @ TMU, shipping full-stack, AI, and
                    embedded software.
                  </span>,
                  <span key="2" style={{ color: "#a1a1aa" }}>
                    this terminal is my portfolio. type{" "}
                    <Cmd name="help" run={run} /> to explore, or start with{" "}
                    <Cmd name="projects" run={run} /> to open things around the
                    screen.
                  </span>,
                  <span key="2b" style={{ color: "#a1a1aa" }}>
                    in a hurry? <Cmd name="recruiter" run={run} /> gets you the
                    30-second pitch — resume &amp; email are always top-right ↗
                  </span>,
                  <span key="3">&nbsp;</span>,
                ]}
              />
            )}

            {entries.map((entry, i) => (
              <div key={i} className="mb-3">
                {entry.cmd !== null && (
                  <p className="flex gap-2">
                    {prompt}
                    <span>{entry.cmd}</span>
                  </p>
                )}
                <div className="mt-1">{entry.output}</div>
              </div>
            ))}

            {/* input line */}
            <div className="flex gap-2 items-center">
              {prompt}
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="w-full bg-transparent outline-none caret-transparent text-[var(--color-text-primary)]"
                  autoFocus
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-label="terminal input"
                />
                {!input && ghost && (
                  <span
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{ color: DIM }}
                  >
                    {ghost}
                  </span>
                )}
                <span
                  className="term-cursor absolute top-0 pointer-events-none"
                  style={{ left: `${(input || ghost).length}ch` }}
                >
                  ▊
                </span>
              </div>
            </div>
          </div>

          {/* quick commands (mobile-friendly) */}
          <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] shrink-0">
            {["recruiter", "help", "about", "work", "projects", "skills", "contact", "resume"].map((c) => (
              <button
                key={c}
                onClick={(e) => {
                  e.stopPropagation();
                  run(c);
                }}
                className="font-mono text-xs px-2.5 py-1 rounded-md border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
                style={
                  c === "recruiter"
                    ? { borderColor: YELLOW, color: YELLOW }
                    : undefined
                }
              >
                {c === "recruiter" ? "⭐ recruiter" : c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* floating windows */}
      {wins.map((w) => (
        <FloatWindow
          key={w.id}
          win={w}
          onClose={closeWin}
          onFocus={focusWin}
          onMove={moveWin}
        />
      ))}
    </div>
  );
}
