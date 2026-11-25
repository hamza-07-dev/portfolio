const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#automation", label: "AI & Automation" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border">
      <nav className="max-w-[1200px] mx-auto px-6 h-[68px] flex items-center justify-between">
        <a href="#" className="font-display font-bold text-lg tracking-tight">
          Hamza
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm text-text-muted">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-text transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="px-5 py-2 rounded-lg bg-brand-gradient text-white text-sm font-medium hover:shadow-glow transition-shadow"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
