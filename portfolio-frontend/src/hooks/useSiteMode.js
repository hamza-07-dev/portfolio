import { useEffect, useState } from "react";
import { hasWebGL } from "../lib/webgl";

const MOBILE_BREAKPOINT = 768;

/**
 * Decides between the immersive scroll-driven 3D world and the classic
 * stacked-sections fallback. Immersive is heavy (always-on Canvas + camera
 * animation), so it's reserved for capable desktop/tablet browsers that
 * don't ask for reduced motion.
 */
export function useSiteMode() {
  const [mode, setMode] = useState("checking"); // checking | immersive | classic

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT;
    const webgl = hasWebGL();

    if (reducedMotion || isSmallScreen || !webgl) {
      setMode("classic");
    } else {
      setMode("immersive");
    }
  }, []);

  return mode;
}
