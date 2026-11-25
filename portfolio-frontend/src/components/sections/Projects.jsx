import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaExternalLinkAlt, FaGithub, FaLayerGroup } from "react-icons/fa";
import Badge from "../ui/Badge";
import { useViewportMode } from "../../hooks/useViewportMode";

// Strictly grounded in hamza_portfolio_profile.md — no invented repos, live URLs, or unbuilt projects.
const REAL_PROJECTS = [
  {
    id: "commune-tahla",
    title: "Commune de Tahla — Website",
    category: "Stage / Internship Web Project",
    status: "Completed (Internship)",
    description:
      "Web platform built for Commune de Tahla during an internship (Stage), connecting a responsive React frontend with a structured Laravel REST API.",
    stack: ["React", "Laravel", "REST API"],
    previewTheme: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
    previewLabel: "commune-tahla.local",
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: "coprogest-syndic",
    title: "Syndic / Copropriété Management App",
    category: "Full Stack Web Application",
    status: "Completed",
    description:
      "Full stack management application for building syndicates and co-ownership administration, built with a React interface backed by a Laravel REST API.",
    stack: ["React", "Laravel", "REST API"],
    previewTheme: "from-indigo-500/20 via-blue-500/15 to-cyan-500/15",
    previewLabel: "syndic-copropriete.app",
    githubUrl: null,
    liveUrl: null,
  },
];

function TiltProjectCard({ project, index, reducedMotion }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function handleMouseMove(e) {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: -y * 8,
      ry: x * 10,
    });
  }

  function handleMouseLeave() {
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2, once: false }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 180ms ease-out",
      }}
      className="group glass-card p-5 sm:p-6 flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-glow"
    >
      <div>
        {/* Floating Browser Mockup Preview */}
        <div className="rounded-xl overflow-hidden border border-border bg-bg-elevated mb-5 shadow-md">
          {/* Browser Chrome Bar */}
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-border bg-bg-secondary/70">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-[10px] font-mono text-text-dim truncate max-w-[180px]">
              {project.previewLabel}
            </span>
            <FaLayerGroup className="w-3 h-3 text-cyan-400/70" />
          </div>

          {/* Stylized Architectural Mockup Area */}
          <div
            className={`relative h-40 p-4 bg-gradient-to-br ${project.previewTheme} flex flex-col justify-between overflow-hidden`}
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-bg-elevated/90 border border-border text-cyan-500 dark:text-cyan-400">
                {project.status}
              </span>
              <FaCode className="w-4 h-4 text-text-dim" />
            </div>

            {/* Minimal UI Wireframe Bars */}
            <div className="space-y-2 opacity-80 group-hover:opacity-100 transition-opacity">
              <div className="h-3 w-2/3 rounded bg-bg-elevated/80 border border-border" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-10 rounded-lg bg-bg-elevated/70 border border-border" />
                <div className="h-10 rounded-lg bg-bg-elevated/70 border border-border" />
                <div className="h-10 rounded-lg bg-bg-elevated/70 border border-border" />
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <span className="text-xs font-medium text-cyan-500 dark:text-cyan-400">
          {project.category}
        </span>
        <h3 className="text-xl font-bold text-text mt-1 mb-2.5">
          {project.title}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed mb-5">
          {project.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-text hover:text-cyan-400 transition-colors"
            >
              <FaGithub className="w-4 h-4" />
              <span>Source Code</span>
            </a>
          ) : (
            <span className="text-text-dim">Repository link pending confirmation</span>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-cyan-500 dark:text-cyan-400 hover:underline"
            >
              <span>Live Demo</span>
              <FaExternalLinkAlt className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { reducedMotion } = useViewportMode();

  return (
    <section
      id="projects"
      className="relative max-w-[1160px] mx-auto px-4 sm:px-6 py-20 lg:py-24"
    >
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: false }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-500 dark:text-cyan-400">
          Selected Work
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-text">
          Projects Showcase
        </h2>
        <p className="text-sm text-text-muted mt-2 max-w-2xl">
          Completed real-world web applications built with React, Laravel, and REST APIs. Additional portfolio projects are in progress and will be added once finished.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {REAL_PROJECTS.map((project, idx) => (
          <TiltProjectCard
            key={project.id}
            project={project}
            index={idx}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      {/* Honest placeholder state for upcoming portfolio projects */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: false }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-6 glass-card p-6 border-dashed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
            In Development
          </span>
          <p className="text-sm text-text-muted mt-1">
            More full stack projects, screenshots, and live repository links are currently being documented and built.
          </p>
        </div>
        <a
          href="https://github.com/hamza-devx"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-elevated border border-border text-xs font-medium text-text hover:border-cyan-400/50 transition-colors shrink-0"
        >
          <FaGithub className="w-4 h-4" />
          <span>Follow on GitHub</span>
        </a>
      </motion.div>
    </section>
  );
}
