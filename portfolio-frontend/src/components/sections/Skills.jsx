import { lazy, useState } from "react";
import { motion } from "framer-motion";
import {
  SiBootstrap,
  SiCss,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiWordpress,
} from "react-icons/si";
import { FaCloud, FaCode } from "react-icons/fa";
import GlassCard from "../ui/GlassCard";
import ViewportCanvas from "../3d/ViewportCanvas";
import { TECH_ORBIT_ITEMS } from "../../data/technologies";
import { useViewportMode } from "../../hooks/useViewportMode";

const TechnologyOrbit = lazy(() => import("../3d/TechnologyOrbit"));

const SKILL_GROUPS = [
  {
    title: "Frontend",
    accent: "text-cyan-500 dark:text-cyan-400",
    items: [
      { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", Icon: SiCss, color: "#1572B6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "React", Icon: SiReact, color: "#22D3EE" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },
    ],
  },
  {
    title: "Backend & APIs",
    accent: "text-blue-500 dark:text-blue-400",
    items: [
      { name: "PHP", Icon: SiPhp, color: "#777BB4" },
      { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", Icon: SiExpress, color: "#94A3B8" },
      { name: "REST API", Icon: FaCode, color: "#22D3EE" },
    ],
  },
  {
    title: "Databases & Programming",
    accent: "text-indigo-500 dark:text-indigo-400",
    items: [
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "Algorithms", Icon: FaCode, color: "#818CF8" },
    ],
  },
  {
    title: "Tools, Cloud & Workflow",
    accent: "text-cyan-500 dark:text-cyan-400",
    items: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#94A3B8" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "Cloud Native", Icon: FaCloud, color: "#3B82F6" },
      { name: "WordPress", Icon: SiWordpress, color: "#21759B" },
    ],
  },
];

function OrbitStaticFallback({ selectedTech, onSelect }) {
  return (
    <div className="p-5 flex flex-wrap items-center justify-center gap-2.5 h-full content-center">
      {TECH_ORBIT_ITEMS.map((item) => {
        const { Icon } = item;
        const active = selectedTech?.id === item.id;
        return (
          <button
            type="button"
            key={item.id}
            onClick={() => onSelect(item)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
              active
                ? "bg-brand-gradient text-white border-transparent shadow-glow"
                : "bg-bg-elevated border-border text-text hover:border-cyan-400/50"
            }`}
          >
            <Icon style={{ color: active ? "#FFFFFF" : item.color }} className="w-4 h-4" />
            <span>{item.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Skills() {
  const { isMobile, reducedMotion } = useViewportMode();
  const [selectedTech, setSelectedTech] = useState(TECH_ORBIT_ITEMS[5]); // React default

  const SelectedIcon = selectedTech.Icon;

  return (
    <section
      id="skills"
      className="relative max-w-[1160px] mx-auto px-4 sm:px-6 py-20 lg:py-24"
    >
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: false }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 dark:text-indigo-400">
          Technical Stack
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-text">
          Skills & Interactive 3D Orbit
        </h2>
        <p className="text-sm text-text-muted mt-2 max-w-2xl">
          Click or tap any orbiting technology to inspect how I use it across frontend, backend, and development workflows.
        </p>
      </motion.div>

      {/* Interactive 3D Orbit + Selected Tech Inspector */}
      <div className="grid lg:grid-cols-12 gap-6 items-stretch mb-12">
        <div className="lg:col-span-8 relative h-[360px] sm:h-[420px] rounded-card border border-border bg-surface backdrop-blur-xl shadow-card overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/6 via-transparent to-indigo-500/8 pointer-events-none" />
          <ViewportCanvas
            camera={{ position: [0, 0.8, isMobile ? 6.8 : 6.2], fov: 46 }}
            fallback={
              <OrbitStaticFallback
                selectedTech={selectedTech}
                onSelect={setSelectedTech}
              />
            }
          >
            <ambientLight intensity={0.6} />
            <pointLight position={[4, 4, 4]} intensity={24} color="#22D3EE" />
            <pointLight position={[-4, -3, -3]} intensity={16} color="#6366F1" />
            <TechnologyOrbit
              selectedTech={selectedTech}
              onSelectTech={setSelectedTech}
              reduced={reducedMotion}
              isMobile={isMobile}
            />
          </ViewportCanvas>
        </div>

        {/* Selected Technology Info + Quick Selector */}
        <GlassCard className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-500 dark:text-cyan-400">
              Selected Technology
            </span>

            <div className="mt-4 flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-bg-elevated border border-border flex items-center justify-center shrink-0 shadow-sm">
                <SelectedIcon
                  style={{ color: selectedTech.color }}
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text">{selectedTech.name}</h3>
                <span className="text-xs text-text-dim">{selectedTech.category}</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-text-muted leading-relaxed">
              {selectedTech.description}
            </p>
          </div>

          {/* Touch-friendly technology pills (ensures 100% usability on mobile & desktop) */}
          <div className="mt-6 pt-5 border-t border-border">
            <p className="text-[11px] text-text-dim mb-2.5">
              Quick select ({TECH_ORBIT_ITEMS.length} technologies)
            </p>
            <div className="flex flex-wrap gap-1.5">
              {TECH_ORBIT_ITEMS.map((item) => {
                const active = selectedTech.id === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setSelectedTech(item)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                      active
                        ? "bg-brand-gradient text-white border-transparent"
                        : "bg-bg-elevated border-border text-text-muted hover:text-text hover:border-cyan-400/50"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Categorized Honest Skill Breakdown (no fabricated percentage bars) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SKILL_GROUPS.map((group, idx) => (
          <motion.div
            key={group.title}
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: false }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <GlassCard className="h-full p-5 md:p-6 hover:border-cyan-400/40 transition-colors">
              <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${group.accent}`}>
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.items.map(({ name, Icon, color }) => (
                  <li key={name} className="flex items-center gap-2.5 text-sm text-text">
                    <Icon style={{ color }} className="w-4 h-4 shrink-0" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
