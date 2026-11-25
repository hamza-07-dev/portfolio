import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import GlassShape from "./GlassShape";

export default function HeroComposition({ reduced = false }) {
  const group = useRef();

  useFrame((state) => {
    if (reduced || !group.current) return;
    // Gentle parallax: rotate the whole composition toward the pointer
    const targetX = state.pointer.y * 0.25;
    const targetY = state.pointer.x * 0.35;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04;
  });

  return (
    <group ref={group}>
      <GlassShape
        geometry="icosahedron"
        position={[0, 0.2, 0]}
        scale={1.4}
        color="#3B82F6"
        floatSpeed={1.2}
        floatIntensity={0.8}
        reduced={reduced}
      />
      <GlassShape
        geometry="torus"
        position={[-2.1, -0.6, -1]}
        scale={0.85}
        color="#8B5CF6"
        floatSpeed={1.6}
        floatIntensity={1.2}
        reduced={reduced}
        transmissive={false}
      />
      <GlassShape
        geometry="octahedron"
        position={[2, 1, -0.5]}
        scale={0.7}
        color="#60A5FA"
        floatSpeed={1.8}
        floatIntensity={1.4}
        reduced={reduced}
        transmissive={false}
      />
      <GlassShape
        geometry="box"
        position={[1.7, -1.1, -1.5]}
        scale={0.55}
        color="#A78BFA"
        floatSpeed={2}
        floatIntensity={1}
        reduced={reduced}
        transmissive={false}
      />
    </group>
  );
}
