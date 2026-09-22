import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <About />
        <div className="relative">
          <Skills />
          <Projects />
        </div>
        <LearningJourney />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
