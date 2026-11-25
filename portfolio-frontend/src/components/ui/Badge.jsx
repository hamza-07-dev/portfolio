export default function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border text-xs text-text-muted hover:border-cyan-400/50 hover:text-text transition-colors ${className}`}
    >
      {children}
    </span>
  );
}
