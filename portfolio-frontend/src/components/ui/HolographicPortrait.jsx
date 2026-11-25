import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useViewportMode } from "../../hooks/useViewportMode";

const PERIMETER_PARTICLES = [
  { id: "p1", top: "7%", left: "3%", size: 5, color: "bg-cyan-400", delay: 0, mobile: true },
  { id: "p2", top: "22%", right: "3%", size: 4, color: "bg-blue-400", delay: 0.7, mobile: true },
  { id: "p3", bottom: "22%", left: "-5%", size: 4, color: "bg-indigo-400", delay: 1.3, mobile: false },
  { id: "p4", bottom: "10%", right: "-4%", size: 5, color: "bg-cyan-300", delay: 0.4, mobile: false },
  { id: "p5", top: "-4%", left: "26%", size: 3, color: "bg-cyan-400", delay: 1.1, mobile: false },
  { id: "p6", top: "55%", right: "-5%", size: 3, color: "bg-indigo-400", delay: 1.8, mobile: false },
  { id: "p7", bottom: "-3%", left: "62%", size: 4, color: "bg-blue-400", delay: 0.9, mobile: false },
];

const POP_TRANSITION = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1],
};

export default function HolographicPortrait({
  candidates = ["/me.png", "/me-face.png"],
  alt = "Ahallal Hamza — Full Stack Web Developer",
}) {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { amount: 0.15, once: false });
  const { isMobile, isTablet, isDesktop, reducedMotion } = useViewportMode();

  const [photoIndex, setPhotoIndex] = useState(0);
  const [finePointer, setFinePointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const photoMissing = photoIndex >= candidates.length;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFinePointer(mq.matches);
    const onChange = (e) => setFinePointer(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Strong 3D pop-out and cursor parallax only on desktop with a fine pointer
  const interactiveEnabled = finePointer && isDesktop && !reducedMotion;
  const shouldAnimate = inView && !reducedMotion;
  const popOutActive = interactiveEnabled && isHovered;

  useEffect(() => {
    if (!interactiveEnabled) {
      setIsHovered(false);
    }
  }, [interactiveEnabled]);

  // Normalized cursor coordinates [-0.5, 0.5]
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 135, damping: 20, mass: 0.65 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // Portrait assembly 3D perspective tilt
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  // Multi-plane parallax offsets across depth layers
  const ringOffsetX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const ringOffsetY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);
  const portraitOffsetX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const portraitOffsetY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const particleOffsetX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const particleOffsetY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  // Cursor-following specular lighting on the glass plane
  const lightPercentX = useTransform(smoothX, [-0.5, 0.5], [15, 85]);
  const lightPercentY = useTransform(smoothY, [-0.5, 0.5], [15, 85]);
  const specularGradient = useMotionTemplate`radial-gradient(circle 240px at ${lightPercentX}% ${lightPercentY}%, rgba(34, 211, 238, 0.28), rgba(59, 130, 246, 0.1) 45%, transparent 74%)`;

  function handleMouseEnter() {
    if (interactiveEnabled) {
      setIsHovered(true);
    }
  }

  function handleMouseMove(e) {
    if (!interactiveEnabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(Math.max(-0.5, Math.min(0.5, nx)));
    rawY.set(Math.max(-0.5, Math.min(0.5, ny)));
  }

  function handleMouseLeave() {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
  }

  const visibleParticles = isMobile
    ? PERIMETER_PARTICLES.filter((p) => p.mobile)
    : isTablet
      ? PERIMETER_PARTICLES.slice(0, 5)
      : PERIMETER_PARTICLES;

  return (
    <motion.div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ amount: 0.2, once: false }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[370px] mx-auto select-none overflow-visible"
    >
      {/* Floating 3D Assembly */}
      <motion.div
        animate={
          shouldAnimate
            ? { y: isMobile ? [0, -4, 0] : [0, -8, 0] }
            : { y: 0 }
        }
        transition={
          shouldAnimate
            ? { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
        style={{
          rotateX: interactiveEnabled ? rotateX : 0,
          rotateY: interactiveEnabled ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative aspect-[4/5] overflow-visible"
      >
        {/* LAYER -2 (translateZ: -40px): Deep Ambient Glow & Cyan Rim Boost */}
        <motion.div
          animate={{
            z: -40,
            scale: popOutActive ? 1.08 : 1,
            opacity: popOutActive ? 1 : 0.75,
          }}
          transition={POP_TRANSITION}
          style={{ transformStyle: "preserve-3d" }}
          className="pointer-events-none absolute -inset-5 rounded-[34px] bg-gradient-to-tr from-cyan-500/25 via-blue-500/15 to-indigo-500/25 blur-2xl"
        />

        {/* LAYER -1 (translateZ: -20px): 3D Holographic Orbital Rings */}
        <motion.div
          style={{
            z: -20,
            x: interactiveEnabled ? ringOffsetX : 0,
            y: interactiveEnabled ? ringOffsetY : 0,
            transformStyle: "preserve-3d",
          }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-visible"
          aria-hidden="true"
        >
          {/* Ring 1: Outer Cyan Orbital Ring */}
          <div
            className="absolute w-[103%] sm:w-[114%] lg:w-[122%] aspect-square flex items-center justify-center"
            style={{ transform: "rotateX(64deg) rotateY(-18deg)" }}
          >
            <motion.div
              animate={shouldAnimate ? { rotate: 360 } : { rotate: 0 }}
              transition={
                shouldAnimate
                  ? { duration: 22, repeat: Infinity, ease: "linear" }
                  : { duration: 0 }
              }
              className={`w-full h-full rounded-full border transition-colors duration-500 relative ${
                popOutActive
                  ? "border-cyan-400/75 shadow-[0_0_24px_rgba(34,211,238,0.4)]"
                  : "border-cyan-400/45 dark:border-cyan-400/40 shadow-[0_0_16px_rgba(34,211,238,0.22)]"
              }`}
            >
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22D3EE]" />
            </motion.div>
          </div>

          {/* Ring 2: Counter-Rotating Electric Blue Dashed Ring */}
          <div
            className="absolute w-[94%] sm:w-[104%] lg:w-[109%] aspect-square flex items-center justify-center"
            style={{ transform: "rotateX(-68deg) rotateY(22deg)" }}
          >
            <motion.div
              animate={shouldAnimate ? { rotate: -360 } : { rotate: 0 }}
              transition={
                shouldAnimate
                  ? { duration: 16, repeat: Infinity, ease: "linear" }
                  : { duration: 0 }
              }
              className="w-full h-full rounded-full border border-dashed border-blue-500/45 dark:border-blue-400/40 relative"
            >
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3B82F6]" />
            </motion.div>
          </div>

          {/* Ring 3: Subtle Indigo Equatorial Ring (Tablet & Desktop) */}
          {!isMobile && (
            <div
              className="absolute w-[112%] lg:w-[116%] aspect-square flex items-center justify-center"
              style={{ transform: "rotateX(78deg) rotateY(8deg)" }}
            >
              <motion.div
                animate={shouldAnimate ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  shouldAnimate
                    ? { duration: 28, repeat: Infinity, ease: "linear" }
                    : { duration: 0 }
                }
                className="w-full h-full rounded-full border border-indigo-500/35 dark:border-indigo-400/35"
              />
            </div>
          )}
        </motion.div>

        {/* LAYER 0 (translateZ: 0px): Transparent Holographic Glass Frame */}
        <motion.div
          style={{ z: 0, transformStyle: "preserve-3d" }}
          className={`relative z-10 w-full h-full rounded-[22px] p-[1px] transition-shadow duration-500 ${
            popOutActive
              ? "bg-gradient-to-br from-cyan-400/70 via-blue-500/35 to-indigo-500/65 shadow-[0_28px_70px_rgba(6,182,212,0.22)] dark:shadow-[0_32px_80px_rgba(0,0,0,0.75)]"
              : "bg-gradient-to-br from-cyan-400/45 via-blue-500/20 to-indigo-500/45 shadow-[0_20px_50px_rgba(2,6,23,0.35)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
          }`}
        >
          <div className="relative w-full h-full rounded-[21px] overflow-hidden bg-gradient-to-b from-slate-100/90 via-blue-50/85 to-slate-200/90 dark:from-[#0B142C]/90 dark:via-[#060B1A]/94 dark:to-[#050816]/96 backdrop-blur-xl">
            {/* Subtle holographic grid inside glass card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-55"
            />

            {/* Cyan-blue studio rim backlight (intensifies softly on hover) */}
            <motion.div
              aria-hidden="true"
              animate={{
                opacity: popOutActive ? 1 : 0.65,
                scale: popOutActive ? 1.12 : 1,
              }}
              transition={POP_TRANSITION}
              className="pointer-events-none absolute inset-x-6 top-6 bottom-12 rounded-full bg-gradient-to-b from-cyan-400/35 via-blue-500/22 to-indigo-500/25 blur-2xl"
            />

            {/* Depth shadow cast onto the glass frame beneath the emerging portrait */}
            <motion.div
              aria-hidden="true"
              animate={{
                opacity: popOutActive ? 0.65 : 0.25,
                scale: popOutActive ? 0.94 : 1,
              }}
              transition={POP_TRANSITION}
              className="pointer-events-none absolute inset-x-8 bottom-8 h-24 rounded-full bg-slate-950/60 dark:bg-black/80 blur-2xl"
            />

            {/* Cursor-reactive specular highlight */}
            {interactiveEnabled && (
              <motion.div
                aria-hidden="true"
                style={{ background: specularGradient }}
                className="pointer-events-none absolute inset-0"
              />
            )}

            {/* Bottom edge gradient inside frame */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-900/60 via-slate-900/15 to-transparent dark:from-[#050816]/90 dark:via-[#050816]/35" />
          </div>
        </motion.div>

        {/* LAYER +1 (translateZ: 50px -> 122px on hover): Real Cutout Portrait Pop-Out */}
        <motion.div
          animate={{
            z: popOutActive ? 122 : 50,
            y: popOutActive ? -20 : -2,
            scale: popOutActive ? 1.11 : 1,
          }}
          transition={POP_TRANSITION}
          style={{
            x: interactiveEnabled ? portraitOffsetX : 0,
            transformOrigin: "50% 84%",
            transformStyle: "preserve-3d",
          }}
          className="pointer-events-none absolute inset-0 z-30 flex items-end justify-center pt-1 px-2 overflow-visible"
        >
          <motion.div
            style={{
              y: interactiveEnabled ? portraitOffsetY : 0,
              WebkitMaskImage:
                "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 8%, #000 18%, #000 100%)",
              maskImage:
                "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 8%, #000 18%, #000 100%)",
            }}
            className="relative w-full h-full flex items-end justify-center overflow-visible"
          >
            {!photoMissing ? (
              <img
                src={candidates[photoIndex]}
                alt={alt}
                onError={() => setPhotoIndex((i) => i + 1)}
                loading="eager"
                draggable={false}
                className={`w-full h-full object-contain object-bottom transition-[filter] duration-500 ${
                  popOutActive
                    ? "drop-shadow-[0_24px_34px_rgba(34,211,238,0.28)] dark:drop-shadow-[0_28px_40px_rgba(0,0,0,0.82)]"
                    : "drop-shadow-[0_12px_22px_rgba(15,23,42,0.28)] dark:drop-shadow-[0_16px_28px_rgba(0,0,0,0.68)]"
                }`}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="w-28 h-28 rounded-full bg-brand-gradient p-[2px] mb-4 shadow-glow">
                  <div className="w-full h-full rounded-full bg-bg-elevated flex items-center justify-center">
                    <span className="text-3xl font-display font-bold gradient-text">
                      HA
                    </span>
                  </div>
                </div>
                <p className="font-display font-semibold text-base text-text">
                  Ahallal Hamza
                </p>
                <p className="text-xs text-text-muted mt-1 inline-flex items-center gap-1.5">
                  <FaMapMarkerAlt className="w-3 h-3 text-cyan-400" />
                  Tahla — Taza, Morocco
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* LAYER +2 (translateZ: 72px): Foreground Frame Details (outside face area) */}
        <motion.div
          style={{ z: 72, transformStyle: "preserve-3d" }}
          className="pointer-events-none absolute inset-0 z-40"
          aria-hidden="true"
        >
          {/* Minimal holographic status strip anchored at bottom rim */}
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/80 dark:bg-[#0B1226]/80 backdrop-blur-md border border-slate-900/10 dark:border-white/15 shadow-sm">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE] shrink-0" />
              <span className="text-[11px] font-medium text-slate-900 dark:text-slate-100 truncate">
                Ahallal Hamza
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-wider uppercase text-blue-600 dark:text-cyan-400 shrink-0">
              Full Stack
            </span>
          </div>

          {/* Precision Corner Brackets */}
          <span className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-cyan-400/75 rounded-tl-lg" />
          <span className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-blue-400/65 rounded-tr-lg" />
          <span className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-blue-400/65 rounded-bl-lg" />
          <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-indigo-400/75 rounded-br-lg" />
        </motion.div>

        {/* LAYER +3 (translateZ: 88px): Floating Perimeter Particles */}
        <motion.div
          animate={{ z: popOutActive ? 98 : 82 }}
          transition={POP_TRANSITION}
          style={{
            x: interactiveEnabled ? particleOffsetX : 0,
            y: interactiveEnabled ? particleOffsetY : 0,
            transformStyle: "preserve-3d",
          }}
          className="pointer-events-none absolute inset-0 z-40"
          aria-hidden="true"
        >
          {visibleParticles.map((p) => (
            <motion.span
              key={p.id}
              animate={
                shouldAnimate
                  ? { y: [0, -6, 0], opacity: [0.45, 0.95, 0.45] }
                  : { y: 0, opacity: 0.6 }
              }
              transition={
                shouldAnimate
                  ? {
                      duration: 3.6 + p.delay,
                      delay: p.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  : { duration: 0 }
              }
              style={{
                top: p.top,
                bottom: p.bottom,
                left: p.left,
                right: p.right,
                width: p.size,
                height: p.size,
              }}
              className={`absolute rounded-full ${p.color} shadow-[0_0_10px_currentColor]`}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
