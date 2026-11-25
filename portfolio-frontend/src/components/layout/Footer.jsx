import { FaGithub } from "react-icons/fa";

const QUICK_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6 bg-bg-secondary/40 backdrop-blur-sm">
      <div className="max-w-[1160px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white font-display font-bold text-xs">
            HA
          </div>
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} <span className="text-text font-medium">Ahallal Hamza</span>. Built with React, Tailwind & Three.js.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-text-muted">
          {QUICK_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-cyan-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/hamza-devx"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="inline-flex items-center gap-1.5 text-text hover:text-cyan-400 transition-colors"
          >
            <FaGithub className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
