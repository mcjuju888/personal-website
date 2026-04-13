import { NavBar } from "@/components/ui/NavBar";
import { Intro } from "@/components/ui/Intro";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      <Intro />
      <ParticleBackground />
      <NavBar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
