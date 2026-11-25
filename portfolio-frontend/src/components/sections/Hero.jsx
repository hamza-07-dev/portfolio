import { lazy } from "react";
import { motion } from "framer-motion";
import { FaCode, FaMapMarkerAlt } from "react-icons/fa";
import Button from "../ui/Button";
import ViewportCanvas from "../3d/ViewportCanvas";
import { useViewportMode } from "../../hooks/useViewportMode";

const HeroLaptop = lazy(() => import("../3d/HeroLaptop"));

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

function HeroStaticFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-bg-elevated/90 p-5 shadow-card">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 text-[11px] font-mono text-text-dim">Portfolio.jsx</span>
        </div>
        <pre className="text-xs font-mono leading-relaxed text-text-muted overflow-x-auto">
{`const developer = {
  name: "Ahallal Hamza",
  role: "Full Stack Developer",
  stack: ["React", "Laravel", "Node.js"],
};`}
        </pre>
      </div>
    </div>
  );
}

export default function Hero() {
  const { isMobile, reducedMotion } = useViewportMode();

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center pt-20 lg:pt-12 pb-16 px-4 sm:px-6"
    >
      {/* Subtle ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-[110px]" />
        <div className="absolute bottom-0 right-1/5 w-[420px] h-[420px] bg-indigo-500/10 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-[1160px] mx-auto w-full grid lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
        {/* Left: Text Content */}
        <motion.div
          className="lg:col-span-6"
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ amount: 0.2, once: false }}
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border backdrop-blur-md text-xs text-text-muted mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Ahallal Hamza</span>
            <span className="text-text-dim">•</span>
            <span className="inline-flex items-center gap-1 text-text-dim">
              <FaMapMarkerAlt className="w-3 h-3 text-cyan-400" />
              Tahla — Taza, Morocco
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-3xl sm:text-5xl xl:text-[54px] font-bold tracking-tight mb-5 leading-[1.12] text-text"
          >
            I build modern websites that look{" "}
            <span className="gradient-text">premium</span> and feel{" "}
            <span className="gradient-text">fast.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-cyan-500 dark:text-cyan-400 mb-4"
          >
            <FaCode className="w-4 h-4 shrink-0" />
            <span>Full Stack Developer • React • Laravel • Node.js</span>
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            className="text-sm sm:text-base text-text-muted mb-8 max-w-xl leading-relaxed"
          >
            Junior Full Stack Web Developer crafting responsive frontends with
            React and structured backend APIs with PHP/Laravel — focused on
            clean code, real-world usability, and smooth digital experiences.
          </motion.p>

          <motion.div custom={4} variants={fadeUp} className="flex flex-wrap gap-3.5">
            <Button as="a" href="#projects" variant="primary">
              View Projects
            </Button>
            <Button as="a" href="#contact" variant="secondary">
              Contact Me
            </Button>
          </motion.div>

          {/* Honest, grounded profile highlights (no invented counts) */}
          <motion.div
            custom={5}
            variants={fadeUp}
            className="mt-8 pt-6 border-t border-border grid grid-cols-3 gap-4 max-w-md"
          >
            <div>
              <p className="text-xs text-text-dim">Focus</p>
              <p className="text-sm font-semibold text-text mt-0.5">Full Stack</p>
            </div>
            <div>
              <p className="text-xs text-text-dim">Training</p>
              <p className="text-sm font-semibold text-text mt-0.5">ISTA / OFPPT</p>
            </div>
            <div>
              <p className="text-xs text-text-dim">Design</p>
              <p className="text-sm font-semibold text-text mt-0.5">Responsive 3D</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Interactive 3D Developer Workstation */}
        <motion.div
          className="lg:col-span-6"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.2, once: false }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative h-[300px] sm:h-[380px] lg:h-[460px] rounded-card border border-border bg-surface backdrop-blur-xl shadow-card overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-transparent to-indigo-500/10 pointer-events-none" />

            <ViewportCanvas
              alwaysActive
              camera={{ position: [0, 0.45, 4.7], fov: 42 }}
              fallback={<HeroStaticFallback />}
            >
              <ambientLight intensity={0.45} />
              <pointLight position={[4, 3, 4]} intensity={28} color="#22D3EE" />
              <pointLight position={[-4, -2, 3]} intensity={18} color="#6366F1" />
              <directionalLight position={[0, 5, 3]} intensity={0.7} />
              <HeroLaptop reduced={reducedMotion} isMobile={isMobile} />
            </ViewportCanvas>

            <div className="absolute bottom-3 right-4 pointer-events-none text-[11px] text-text-dim bg-bg-elevated/75 px-2.5 py-1 rounded-full border border-border">
              Move cursor to interact
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
