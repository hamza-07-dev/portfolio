import { lazy, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaMapMarkerAlt } from "react-icons/fa";
import { api } from "../../lib/api";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";
import ViewportCanvas from "../3d/ViewportCanvas";
import { useViewportMode } from "../../hooks/useViewportMode";

const ContactObject = lazy(() => import("../3d/ContactObject"));

const PROJECT_TYPES = ["Web Application", "Full Stack Project", "Internship / Junior Role", "Collaboration"];

function ContactStaticFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 rounded-2xl bg-brand-gradient p-[1px] shadow-glow">
        <div className="w-full h-full rounded-2xl bg-bg-elevated flex items-center justify-center">
          <FaEnvelope className="w-9 h-9 text-cyan-400" />
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const { reducedMotion } = useViewportMode();
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: PROJECT_TYPES[0],
    message: "",
  });
  const [status, setStatus] = useState("idle");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.sendContact(form);
      setStatus("sent");
      setForm({ name: "", email: "", projectType: PROJECT_TYPES[0], message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative max-w-[1160px] mx-auto px-4 sm:px-6 py-20 lg:py-24"
    >
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: false }}
        transition={{ duration: 0.55 }}
        className="mb-10"
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 dark:text-indigo-400">
          Get In Touch
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-text">
          Let's Connect
        </h2>
        <p className="text-sm text-text-muted mt-2 max-w-xl">
          Open to internships, junior Full Stack Developer opportunities, and web development collaborations.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Minimal 3D Floating Envelope + Confirmed Info */}
        <motion.div
          className="lg:col-span-5 space-y-5"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: false }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-[230px] sm:h-[260px] rounded-card border border-border bg-surface backdrop-blur-xl shadow-card overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-transparent to-indigo-500/10 pointer-events-none" />
            <ViewportCanvas
              camera={{ position: [0, 0, 4.4], fov: 44 }}
              fallback={<ContactStaticFallback />}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[3, 3, 4]} intensity={24} color="#22D3EE" />
              <pointLight position={[-3, -2, 3]} intensity={16} color="#6366F1" />
              <ContactObject reduced={reducedMotion} />
            </ViewportCanvas>
          </div>

          <GlassCard className="p-5 md:p-6 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-9 h-9 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-cyan-500 dark:text-cyan-400">
                <FaMapMarkerAlt className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-text-dim">Location</p>
                <p className="font-medium text-text">Tahla — Taza, Morocco</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="w-9 h-9 rounded-xl bg-bg-elevated border border-border flex items-center justify-center text-cyan-500 dark:text-cyan-400">
                <FaGithub className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-text-dim">GitHub</p>
                <a
                  href="https://github.com/hamza-devx"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-text hover:text-cyan-400 transition-colors"
                >
                  github.com/hamza-devx
                </a>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div
          className="lg:col-span-7"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: false }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <GlassCard>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-text-muted" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-bg-elevated border border-border text-text outline-none focus:border-cyan-400 text-sm transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-text-muted" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-bg-elevated border border-border text-text outline-none focus:border-cyan-400 text-sm transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted">Inquiry Type</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {PROJECT_TYPES.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => update("projectType", type)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        form.projectType === type
                          ? "bg-brand-gradient text-white shadow-sm"
                          : "bg-bg-elevated border border-border text-text-muted hover:text-text hover:border-cyan-400/40"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-bg-elevated border border-border text-text outline-none focus:border-cyan-400 text-sm resize-none transition-colors"
                  placeholder="Tell me about your project or opportunity…"
                />
              </div>

              <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto self-start">
                {status === "sending" ? "Sending…" : "Send Message"}
              </Button>

              {status === "sent" && (
                <p className="text-sm text-cyan-500 dark:text-cyan-400">
                  Message sent — thank you! I will get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400">
                  Could not reach the backend server right now. Please try again later or connect via GitHub.
                </p>
              )}
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
