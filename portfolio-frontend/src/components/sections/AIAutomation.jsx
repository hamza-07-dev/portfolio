import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import { useViewportMode } from "../../hooks/useViewportMode";

const NODES = [
  { step: "01", title: "Webhook Intake", desc: "Contact form submission received by the backend API" },
  { step: "02", title: "n8n Validation", desc: "Payload checked and classified by project type" },
  { step: "03", title: "Notification", desc: "Instant alert triggered for incoming inquiries" },
  { step: "04", title: "Record Logging", desc: "Structured backup logged automatically" },
];

export default function AIAutomation() {
  const { reducedMotion } = useViewportMode();

  return (
    <section
      id="automation"
      className="relative max-w-[1160px] mx-auto px-4 sm:px-6 py-20 lg:py-24"
    >
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: false }}
        transition={{ duration: 0.55 }}
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-500 dark:text-cyan-400">
          Backend & Automation
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-3 text-text">
          Workflow Pipeline Architecture
        </h2>
        <p className="text-sm text-text-muted max-w-xl mb-10">
          This portfolio's contact endpoint connects to an automated webhook pipeline for reliable inquiry processing.
        </p>
      </motion.div>

      <GlassCard>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NODES.map((node, i) => (
            <motion.div
              key={node.step}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2, once: false }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="p-4 rounded-xl bg-bg-elevated border border-border hover:border-cyan-400/40 transition-colors"
            >
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-brand-gradient text-white font-display font-bold text-xs mb-3">
                {node.step}
              </span>
              <p className="font-semibold text-sm text-text">{node.title}</p>
              <p className="text-text-muted text-xs mt-1 leading-relaxed">{node.desc}</p>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
