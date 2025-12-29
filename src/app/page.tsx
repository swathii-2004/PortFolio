import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="text-white min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Each section has an ID for smooth scroll */}
      <section id="home" className="pt-1">
        <Hero />
      </section>

      <section id="projects" className="pt-1">
        <Projects />
      </section>

      <section id="skills" className="pt-1">
        <Skills />
      </section>

      <section id="contact" className="pt-1 pb-3">
        <Contact />
      </section>
    </main>
  );
}