export default function GlassCard({ children, className = "" }) {
  return (
    <div className={`glass-card p-6 md:p-8 ${className}`}>{children}</div>
  );
}
