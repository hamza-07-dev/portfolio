import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import Badge from "../ui/Badge";
import HolographicPortrait from "../ui/HolographicPortrait";
import { useViewportMode } from "../../hooks/useViewportMode";

const TIMELINE = [
  {
    year: "2024",
    title: "Baccalauréat — Sciences de la Vie et de la Terre (SVT)",
    place: "Lycée Al Moustaqbal, Tahla",
  },
  {
    year: "2026",
    title: "Diplôme de Technicien Spécialisé — Développement Digital (Option Web Full Stack)",
    place: "ISTA / OFPPT, Taza",
  },
];

const CORE_TECH = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Tailwind CSS",
  "Bootstrap",
  "PHP",
  "Laravel",
  "Node.js",
  "Express.js",
  "REST API",
  "MySQL",
  "MongoDB",
  "Python",
  "Git",
  "GitHub",
  "Docker",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" },
  }),
};

export default function About() {
  const { reducedMotion } = useViewportMode();

  return (
    <section
      id="about"
      className="relative max-w-[1160px] mx-auto px-4 sm:px-6 py-20 lg:py-24"
    >
      <motion.div
        initial={reducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ amount: 0.2, once: false }}
        className="mb-12"
      >
        <motion.span
          custom={0}
          variants={fadeUp}
          className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-500 dark:text-cyan-400"
        >
          About Me
        </motion.span>
        <motion.h2
          custom={1}
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold mt-2 text-text"
        >
          Who I am
        </motion.h2>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left: 3D Holographic Floating Portrait */}
        <div className="lg:col-span-5 py-4 px-2 sm:px-4">
          <HolographicPortrait
            candidates={["/me.png", "/me-face.png"]}
            alt="Ahallal Hamza — Full Stack Web Developer"
          />
        </div>

        {/* Right: Bio, Real Education Timeline & Tech */}
        <motion.div
          className="lg:col-span-7"
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ amount: 0.2, once: false }}
        >
          <motion.p
            custom={1}
            variants={fadeUp}
            className="text-base text-text leading-relaxed mb-4"
          >
            I am <strong className="font-semibold">Ahallal Hamza</strong>, a
            Junior Full Stack Web Developer based in{" "}
            <span className="text-cyan-500 dark:text-cyan-400 font-medium">
              Tahla — Taza, Morocco
            </span>
            . I build modern, responsive web applications across both frontend
            interfaces using React and backend architectures / REST APIs using
            PHP and Laravel.
          </motion.p>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-sm text-text-muted leading-relaxed mb-8"
          >
            Trained in Développement Digital (Option Web Full Stack) at ISTA /
            OFPPT Taza, I focus on writing clean, structured code, thoughtful UX,
            and growing continuously through practical projects and real-world
            problem solving.
          </motion.p>

          {/* Education Timeline */}
          <motion.div custom={3} variants={fadeUp} className="mb-8">
            <h3 className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-cyan-500 dark:text-cyan-400 mb-4">
              <FaGraduationCap className="w-4 h-4" />
              <span>Education & Training</span>
            </h3>

            <div className="space-y-4">
              {TIMELINE.map((item) => (
                <div
                  key={item.year}
                  className="relative pl-6 border-l-2 border-border hover:border-cyan-400/60 transition-colors"
                >
                  <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-brand-gradient ring-4 ring-bg" />
                  <span className="inline-block text-xs font-semibold text-cyan-500 dark:text-cyan-400">
                    {item.year}
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-text mt-0.5">
                    {item.title}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">{item.place}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div custom={4} variants={fadeUp}>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-indigo-500 dark:text-indigo-400 mb-3">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap gap-2">
              {CORE_TECH.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </motion.div>

          <motion.div custom={5} variants={fadeUp} className="mt-7">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-500 dark:text-cyan-400 hover:underline group"
            >
              <span>Get in touch for internships or junior opportunities</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
