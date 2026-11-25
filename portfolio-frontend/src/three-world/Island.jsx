import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import GlassShape from "../components/three/GlassShape";
import { STOPS } from "./path";
import { useScroll } from "./ScrollContext";

const PALETTE = ["#3B82F6", "#8B5CF6", "#60A5FA", "#A78BFA"];
const GEOMETRIES = ["icosahedron", "torus", "octahedron", "box"];
const COUNT = STOPS.length;
// How far (in "stops") an island stays visible/active around the camera's
// current position. Keeps only ~2 islands' worth of shapes rendering at
// once instead of all 6 — the main source of scroll jank.
const ACTIVE_RANGE = 1.1;

export default function Island({ position, index, reduced }) {
  const color = PALETTE[index % PALETTE.length];
  const geometry = GEOMETRIES[index % GEOMETRIES.length];
  const groupRef = useRef();
  const { progressRef } = useScroll();

  useFrame(() => {
    if (!groupRef.current) return;
    const current = progressRef.current * (COUNT - 1);
    groupRef.current.visible = Math.abs(current - index) < ACTIVE_RANGE;
  });

  return (
    <group ref={groupRef} position={position}>
      <GlassShape
        geometry={geometry}
        color={color}
        scale={1.1}
        floatSpeed={1.2 + index * 0.1}
        floatIntensity={0.9}
        reduced={reduced}
      />
      <GlassShape
        geometry={GEOMETRIES[(index + 1) % GEOMETRIES.length]}
        color={PALETTE[(index + 1) % PALETTE.length]}
        position={[1.6, -0.8, 0.5]}
        scale={0.5}
        floatSpeed={1.8}
        floatIntensity={1.3}
        reduced={reduced}
        transmissive={false}
      />
    </group>
  );
}
