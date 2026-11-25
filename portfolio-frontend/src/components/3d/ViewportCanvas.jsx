import { Component, Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useViewportMode } from "../../hooks/useViewportMode";

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

/**
 * Performance-guarded Canvas wrapper for Intel UHD 620 & mobile devices:
 * - Lazy-mounts when approaching viewport via IntersectionObserver
 * - Pauses rendering (frameloop="demand") when offscreen or tab is hidden
 * - Respects prefers-reduced-motion & falls back cleanly if WebGL is unavailable
 */
export default function ViewportCanvas({
  children,
  fallback = null,
  camera = { position: [0, 0, 5], fov: 45 },
  className = "w-full h-full",
  alwaysActive = false,
}) {
  const containerRef = useRef(null);
  const { isMobile, canWebGL, reducedMotion } = useViewportMode();
  const [inView, setInView] = useState(alwaysActive);
  const [hasMounted, setHasMounted] = useState(alwaysActive);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (alwaysActive || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setInView(visible);
        if (visible) setHasMounted(true);
      },
      { rootMargin: "140px 0px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [alwaysActive]);

  if (!canWebGL) {
    return <div className={className}>{fallback}</div>;
  }

  const shouldAnimate = (alwaysActive || inView) && !tabHidden && !reducedMotion;

  return (
    <div ref={containerRef} className={className}>
      {hasMounted ? (
        <WebGLErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            <Canvas
              camera={camera}
              dpr={[1, isMobile ? 1.15 : 1.5]}
              frameloop={shouldAnimate ? "always" : "demand"}
              gl={{
                antialias: !isMobile,
                alpha: true,
                powerPreference: "default",
              }}
              style={{ background: "transparent" }}
            >
              {children}
            </Canvas>
          </Suspense>
        </WebGLErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}
