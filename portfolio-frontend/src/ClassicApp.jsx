import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import AIAutomation from "./components/sections/AIAutomation";
import Contact from "./components/sections/Contact";
import { api } from "./lib/api";

// Fallback for mobile, reduced-motion, or no-WebGL visitors —
// same content as the immersive experience, as classic stacked sections.
export default function ClassicApp() {
  useEffect(() => {
    api.track("page_view", window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <AIAutomation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
