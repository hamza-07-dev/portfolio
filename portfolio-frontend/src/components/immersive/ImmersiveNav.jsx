import { useScroll } from "../../three-world/ScrollContext";
import { STOPS } from "../../three-world/path";

const COUNT = STOPS.length;

export default function ImmersiveNav() {
  const { uiProgress } = useScroll();
  const active = Math.round(uiProgress * (COUNT - 1));

  function goTo(index) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (index / (COUNT - 1)) * max, behavior: "smooth" });
  }

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {STOPS.map((stop, i) => (
        <button
          key={stop.id}
          onClick={() => goTo(i)}
          aria-label={stop.label}
          className="group relative flex items-center justify-end"
        >
          <span
            className={`absolute right-5 whitespace-nowrap text-xs transition-opacity ${
              active === i ? "opacity-100 text-text" : "opacity-0 group-hover:opacity-70 text-text-muted"
            }`}
          >
            {stop.label}
          </span>
          <span
            className={`w-2.5 h-2.5 rounded-full border transition-all ${
              active === i
                ? "bg-brand-gradient border-transparent scale-125"
                : "bg-transparent border-text-dim"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
