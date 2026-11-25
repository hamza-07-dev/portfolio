export default function Button({
  children,
  variant = "primary",
  as = "button",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-brand-gradient text-white shadow-glow-blue hover:shadow-glow hover:-translate-y-0.5",
    secondary:
      "bg-surface border border-border text-text hover:border-cyan-400/60 hover:-translate-y-0.5 backdrop-blur-md",
  };
  const Comp = as;
  return (
    <Comp className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Comp>
  );
}
