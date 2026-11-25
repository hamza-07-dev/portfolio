import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaBars,
  FaBolt,
  FaChevronLeft,
  FaChevronRight,
  FaCode,
  FaEnvelope,
  FaFolder,
  FaGithub,
  FaHome,
  FaMoon,
  FaSun,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const NAV_ITEMS = [
  { id: "hero", label: "Home", Icon: FaHome },
  { id: "about", label: "About", Icon: FaUser },
  { id: "skills", label: "Skills", Icon: FaCode },
  { id: "projects", label: "Projects", Icon: FaFolder },
  { id: "automation", label: "Automation", Icon: FaBolt },
  { id: "contact", label: "Contact", Icon: FaEnvelope },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  function navigateTo(id) {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      {/* Mobile Header / Hamburger Trigger ONLY */}
      <div className="lg:hidden fixed top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          className="pointer-events-auto p-3 rounded-xl glass-card text-text hover:border-cyan-400/50 transition-colors"
        >
          <FaBars className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="pointer-events-auto p-3 rounded-xl glass-card text-text hover:border-cyan-400/50 transition-colors"
        >
          {isDark ? (
            <FaSun className="w-4 h-4 text-cyan-400" />
          ) : (
            <FaMoon className="w-4 h-4 text-indigo-500" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] bg-bg-elevated border-r border-border p-6 flex flex-col justify-between shadow-2xl"
              aria-label="Mobile Navigation"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <a
                    href="#hero"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo("hero");
                    }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-display font-bold text-sm shadow-glow">
                      HA
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm text-text">Ahallal Hamza</p>
                      <p className="text-[11px] text-text-muted">Full Stack Dev</p>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close navigation menu"
                    className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-surface"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {NAV_ITEMS.map(({ id, label, Icon }) => {
                    const active = activeId === id;
                    return (
                      <button
                        type="button"
                        key={id}
                        onClick={() => navigateTo(id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          active
                            ? "bg-brand-gradient text-white shadow-glow"
                            : "text-text-muted hover:text-text hover:bg-surface"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                <a
                  href="https://github.com/hamza-devx"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-text-muted hover:text-cyan-400 transition-colors"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>@hamza-devx</span>
                </a>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs text-text"
                >
                  {isDark ? <FaSun className="text-cyan-400" /> : <FaMoon className="text-indigo-500" />}
                  <span>{isDark ? "Light" : "Dark"}</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Left Vertical Sidebar */}
      <aside
        aria-label="Primary Sidebar"
        className={`hidden lg:flex fixed top-0 left-0 bottom-0 z-40 flex-col justify-between border-r border-border bg-bg-elevated/80 backdrop-blur-xl transition-all duration-300 ${
          collapsed ? "w-[76px] px-3 py-6" : "w-[228px] px-4 py-6"
        }`}
      >
        <div>
          {/* Logo + Collapse Toggle */}
          <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} mb-8`}>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("hero");
              }}
              className="flex items-center gap-3 min-w-0"
            >
              <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-display font-bold text-sm shadow-glow">
                HA
              </div>
              {!collapsed && (
                <div className="truncate">
                  <p className="font-display font-bold text-sm text-text leading-tight">Hamza</p>
                  <p className="text-[11px] text-text-muted">Full Stack Dev</p>
                </div>
              )}
            </a>
            {!collapsed && (
              <button
                type="button"
                onClick={() => setCollapsed(true)}
                aria-label="Collapse sidebar"
                className="p-1.5 rounded-lg text-text-muted hover:text-text hover:bg-surface transition-colors"
              >
                <FaChevronLeft className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {collapsed && (
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              aria-label="Expand sidebar"
              className="w-full flex justify-center p-2 mb-4 rounded-lg text-text-muted hover:text-text hover:bg-surface transition-colors"
            >
              <FaChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Section Nav Links */}
          <nav className="space-y-1.5">
            {NAV_ITEMS.map(({ id, label, Icon }) => {
              const active = activeId === id;
              return (
                <button
                  type="button"
                  key={id}
                  onClick={() => navigateTo(id)}
                  title={collapsed ? label : undefined}
                  className={`w-full flex items-center ${
                    collapsed ? "justify-center px-2" : "gap-3 px-3.5"
                  } py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-brand-gradient text-white shadow-glow"
                      : "text-text-muted hover:text-text hover:bg-surface"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="truncate">{label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: GitHub + Theme Toggle */}
        <div className="pt-4 border-t border-border space-y-2">
          <a
            href="https://github.com/hamza-devx"
            target="_blank"
            rel="noreferrer"
            title="GitHub (@hamza-devx)"
            className={`w-full flex items-center ${
              collapsed ? "justify-center px-2" : "gap-3 px-3.5"
            } py-2.5 rounded-xl text-xs font-medium text-text-muted hover:text-cyan-400 hover:bg-surface transition-colors`}
          >
            <FaGithub className="w-4 h-4 shrink-0" />
            {!collapsed && <span>github.com/hamza-devx</span>}
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`w-full flex items-center ${
              collapsed ? "justify-center px-2" : "gap-3 px-3.5"
            } py-2.5 rounded-xl text-xs font-medium text-text bg-surface border border-border hover:border-cyan-400/50 transition-colors`}
          >
            {isDark ? (
              <FaSun className="w-4 h-4 shrink-0 text-cyan-400" />
            ) : (
              <FaMoon className="w-4 h-4 shrink-0 text-indigo-500" />
            )}
            {!collapsed && <span>{isDark ? "Light Mode" : "Dark Mode"}</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
