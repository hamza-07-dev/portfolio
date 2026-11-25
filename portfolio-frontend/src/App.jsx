import { lazy, Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import AIAutomation from "./components/sections/AIAutomation";
import Contact from "./components/sections/Contact";
import { api } from "./lib/api";

const FloatingParticles = lazy(() => import("./components/3d/FloatingParticles"));

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    api.track("page_view", window.location.pathname);
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen flex flex-col overflow-x-hidden">
        {/* Global subtle 3D atmospheric particle background */}
        <Suspense fallback={null}>
          <FloatingParticles />
        </Suspense>

        {/* Responsive vertical sidebar (desktop) + hamburger drawer (mobile/tablet) */}
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        {/* Main Content Wrapper */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            sidebarCollapsed ? "lg:pl-[76px]" : "lg:pl-[228px]"
          }`}
        >
          <main className="flex-1">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <AIAutomation />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
