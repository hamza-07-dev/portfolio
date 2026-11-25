import { useEffect, useState } from "react";
import { hasWebGL } from "../lib/webgl";
import { useReducedMotion } from "../lib/useReducedMotion";

export function useViewportMode() {
  const reducedMotion = useReducedMotion();
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  const [canWebGL, setCanWebGL] = useState(true);

  useEffect(() => {
    setCanWebGL(hasWebGL());
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
    canWebGL,
    reducedMotion,
  };
}
