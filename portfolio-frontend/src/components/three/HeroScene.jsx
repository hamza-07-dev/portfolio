import { Canvas } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import HeroComposition from "./HeroComposition";
import { useReducedMotion } from "../../lib/useReducedMotion";

// Skip heavy postprocessing on small/low-power screens
const isSmallScreen =
  typeof window !== "undefined" && window.innerWidth < 768;

export default function HeroScene() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, isSmallScreen ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 4]} intensity={40} color="#3B82F6" />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#8B5CF6" />
      <directionalLight position={[0, 5, 2]} intensity={0.6} />

      <Environment preset="city" environmentIntensity={0.5} />

      <HeroComposition reduced={reduced} />

      {!isSmallScreen && (
        <Sparkles
          count={60}
          scale={[8, 5, 4]}
          size={2}
          speed={reduced ? 0 : 0.25}
          color="#93C5FD"
          opacity={0.5}
        />
      )}

      {!isSmallScreen && (
        <EffectComposer>
          <Bloom intensity={0.6} luminanceThreshold={0.15} mipmapBlur />
          <Vignette eskil={false} offset={0.2} darkness={0.6} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
