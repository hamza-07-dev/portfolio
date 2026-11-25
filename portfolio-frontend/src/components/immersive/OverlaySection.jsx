import { useScroll } from "../../three-world/ScrollContext";
import { STOPS } from "../../three-world/path";

const COUNT = STOPS.length;

export default function OverlaySection({ index, children }) {
  const { uiProgress } = useScroll();
  const continuous = uiProgress * (COUNT - 1);
  const distance = Math.abs(continuous - index);
  const opacity = Math.max(0, 1 - distance * 1.4);
  const translateY = (continuous - index) * 24; // subtle drift while fading

  return (
    <div
      className="fixed inset-0 flex items-center justify-center px-6"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.4 ? "auto" : "none",
        willChange: "opacity, transform",
      }}
      aria-hidden={opacity < 0.4}
    >
      <div className="max-w-[1100px] w-full">{children}</div>
    </div>
  );
}
