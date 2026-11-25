import { createContext, useContext, useEffect, useRef, useState } from "react";

const ScrollCtx = createContext(null);

export function ScrollProvider({ children }) {
  const progressRef = useRef(0); // read every frame by the 3D camera — never causes re-renders
  const [uiProgress, setUiProgress] = useState(0); // drives the HTML overlay, throttled via rAF

  useEffect(() => {
    let ticking = false;

    function computeProgress() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      progressRef.current = p;
      setUiProgress(p);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(computeProgress);
        ticking = true;
      }
    }

    computeProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ScrollCtx.Provider value={{ progressRef, uiProgress }}>
      {children}
    </ScrollCtx.Provider>
  );
}

export function useScroll() {
  const ctx = useContext(ScrollCtx);
  if (!ctx) throw new Error("useScroll must be used inside a ScrollProvider");
  return ctx;
}
