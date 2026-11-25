import { Canvas } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import CameraRig from "./CameraRig";
import Island from "./Island";
import { ISLAND_POSITIONS } from "./path";
import { useReducedMotion } from "../lib/useReducedMotion";

export default function World() {
  const reduced = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop="always"
      >
        <color attach="background" args={["#0A0E17"]} />
        <fog attach="fog" args={["#0A0E17", 8, 22]} />

        <ambientLight intensity={0.35} />
        <pointLight position={[4, 3, 6]} intensity={35} color="#3B82F6" />
        <pointLight position={[-4, -2, -4]} intensity={30} color="#8B5CF6" />

        <Environment preset="city" environmentIntensity={0.4} />

        <CameraRig />

        {ISLAND_POSITIONS.map((pos, i) => (
          <Island key={i} position={pos} index={i} reduced={reduced} />
        ))}

        <Sparkles
          count={50}
          scale={[20, 10, 30]}
          size={1.8}
          speed={reduced ? 0 : 0.2}
          color="#93C5FD"
          opacity={0.35}
        />

        <EffectComposer multisampling={0}>
          <Bloom intensity={0.45} luminanceThreshold={0.2} mipmapBlur={false} />
          <Vignette eskil={false} offset={0.15} darkness={0.7} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
