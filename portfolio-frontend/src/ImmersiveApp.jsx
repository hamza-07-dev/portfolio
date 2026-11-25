import { useEffect, useState } from "react";
import { ScrollProvider } from "./three-world/ScrollContext";
import World from "./three-world/World";
import OverlaySection from "./components/immersive/OverlaySection";
import ImmersiveNav from "./components/immersive/ImmersiveNav";
import Button from "./components/ui/Button";
import Badge from "./components/ui/Badge";
import GlassCard from "./components/ui/GlassCard";
import { STOPS } from "./three-world/path";
import { api } from "./lib/api";

const STACK = ["React", "Laravel", "Node.js", "Python", "MySQL", "PostgreSQL", "n8n", "Git"];

const FALLBACK_PROJECTS = [
  {
    id: "coprogest",
    title: "COPROGEST",
    category: "SaaS · Property Management",
    description: "Condominium & syndicate management — 6 roles, payments, incident tracking.",
    stack: ["React 18", "Laravel 11", "MySQL"],
  },
  {
    id: "pointforge",
    title: "PointForge",
    category: "Gaming · Rewards",
    description: "Gaming rewards platform — React/Vite frontend, Laravel API.",
    stack: ["React (Vite)", "Laravel API"],
  },
];

const FALLBACK_SKILLS = [
  { id: "react", name: "React", level: 90 },
  { id: "node", name: "Node.js / Express", level: 85 },
  { id: "laravel", name: "PHP / Laravel", level: 85 },
  { id: "n8n", name: "n8n (automation)", level: 80 },
];

const AUTOMATION_STEPS = [
  "Webhook intake from the contact form",
  "n8n validates & classifies the request",
  "Instant notification sent (Telegram / email)",
  "Logged to a Google Sheet as backup",
];

export default function ImmersiveApp() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [skills, setSkills] = useState(FALLBACK_SKILLS);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    api.track("page_view", window.location.pathname);
    api.getProjects().then((d) => d?.length && setProjects(d)).catch(() => {});
    api.getSkills().then((d) => d?.length && setSkills(d.slice(0, 4))).catch(() => {});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.sendContact(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <ScrollProvider>
      <World />
      <ImmersiveNav />

      {/* Scroll spacer — its height drives the camera through all 6 stops */}
      <div style={{ height: `${STOPS.length * 100}vh` }} />

      <OverlaySection index={0}>
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            Hamza — <span className="gradient-text">Full Stack Developer</span>
          </h1>
          <p className="text-lg text-text-muted mb-8">
            Building web platforms & AI automation solutions.
          </p>
          <p className="text-text-dim text-xs animate-pulse">Scroll to explore ↓</p>
        </div>
      </OverlaySection>

      <OverlaySection index={1}>
        <GlassCard className="max-w-lg mx-auto">
          <span className="text-xs text-blue tracking-wider">ABOUT ME</span>
          <h2 className="text-2xl font-bold mt-1 mb-3">Who I am</h2>
          <p className="text-text-muted text-sm leading-relaxed mb-4">
            Full stack developer specialized in web platforms and AI-driven
            automation, trained at ISTA Taza. I build complete products and
            connect them to intelligent workflows with n8n.
          </p>
          <div className="flex flex-wrap gap-2">
            {STACK.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </GlassCard>
      </OverlaySection>

      <OverlaySection index={2}>
        <div>
          <span className="text-xs text-blue tracking-wider">FEATURED PROJECTS</span>
          <h2 className="text-2xl font-bold mt-1 mb-4">Selected Work</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {projects.slice(0, 2).map((p) => (
              <GlassCard key={p.id}>
                <span className="text-xs text-text-dim">{p.category}</span>
                <h3 className="font-semibold mt-1 mb-2">{p.title}</h3>
                <p className="text-text-muted text-xs leading-relaxed mb-3">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </OverlaySection>

      <OverlaySection index={3}>
        <GlassCard className="max-w-lg mx-auto">
          <span className="text-xs text-purple tracking-wider">BENCHMARKS</span>
          <h2 className="text-2xl font-bold mt-1 mb-4">Mastery & Standards</h2>
          <div className="space-y-4">
            {skills.map((s) => (
              <div key={s.id || s.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{s.name}</span>
                  <span className="text-blue font-semibold">{s.level}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface overflow-hidden">
                  <div
                    className="h-full bg-brand-gradient rounded-full"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </OverlaySection>

      <OverlaySection index={4}>
        <GlassCard className="max-w-lg mx-auto">
          <span className="text-xs text-blue tracking-wider">AI & AUTOMATION</span>
          <h2 className="text-2xl font-bold mt-1 mb-4">Live n8n Workflow</h2>
          <ol className="space-y-2">
            {AUTOMATION_STEPS.map((step, i) => (
              <li key={step} className="flex items-center gap-3 text-sm text-text-muted">
                <span className="w-5 h-5 rounded-full bg-surface border border-border flex items-center justify-center text-[10px] text-blue">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </GlassCard>
      </OverlaySection>

      <OverlaySection index={5}>
        <GlassCard className="max-w-md mx-auto">
          <span className="text-xs text-purple tracking-wider">GET IN TOUCH</span>
          <h2 className="text-2xl font-bold mt-1 mb-4">Start a Project</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-3 py-2 rounded-lg bg-bg-elevated border border-border text-sm outline-none focus:border-blue/60"
            />
            <input
              required
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="px-3 py-2 rounded-lg bg-bg-elevated border border-border text-sm outline-none focus:border-blue/60"
            />
            <textarea
              required
              rows={3}
              placeholder="Tell me about your project…"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="px-3 py-2 rounded-lg bg-bg-elevated border border-border text-sm outline-none focus:border-blue/60 resize-none"
            />
            <Button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send Message"}
            </Button>
            {status === "sent" && <p className="text-xs text-blue">Message sent — thank you!</p>}
            {status === "error" && <p className="text-xs text-red-400">Something went wrong.</p>}
          </form>
        </GlassCard>
      </OverlaySection>
    </ScrollProvider>
  );
}
