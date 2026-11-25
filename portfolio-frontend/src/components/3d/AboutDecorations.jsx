import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

export default function AboutDecorations({ reduced = false }) {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  const particlePositions = useMemo(
    () => [
      [-1.35, 1.15, 0.3],
      [1.4, 0.9, -0.2],
      [-1.1, -1.25, 0.2],
      [1.2, -1.05, 0.4],
      [0.0, 1.55, -0.4],
      [-1.55, 0.1, -0.3],
      [1.55, -0.15, 0.1],
      [0.45, -1.5, -0.2],
    ],
    []
  );

  useFrame((state, delta) => {
    if (reduced) return;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.3;
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.12;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.24;
    }
    if (groupRef.current) {
      const targetX = state.pointer.y * 0.18;
      const targetY = state.pointer.x * 0.22;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Holographic orbital rings framing the portrait */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0.25, 0]}>
        <torusGeometry args={[1.65, 0.014, 10, 64]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.45} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[-Math.PI / 3.5, -0.4, 0]}>
        <torusGeometry args={[1.92, 0.01, 10, 64]} />
        <meshBasicMaterial color="#6366F1" transparent opacity={0.35} />
      </mesh>

      {/* Subtle floating geometric shapes */}
      <Float speed={reduced ? 0 : 1.8} floatIntensity={reduced ? 0 : 0.4} rotationIntensity={0.4}>
        <mesh position={[-1.45, 1.05, 0.35]}>
          <octahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial
            color="#22D3EE"
            emissive="#22D3EE"
            emissiveIntensity={0.6}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Float speed={reduced ? 0 : 1.5} floatIntensity={reduced ? 0 : 0.35} rotationIntensity={0.5}>
        <mesh position={[1.45, -0.95, 0.25]}>
          <icosahedronGeometry args={[0.13, 0]} />
          <meshStandardMaterial
            color="#6366F1"
            emissive="#6366F1"
            emissiveIntensity={0.6}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Lightweight ambient particles */}
      {particlePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.032, 8, 8]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#22D3EE" : "#3B82F6"}
            transparent
            opacity={0.75}
          />
        </mesh>
      ))}
    </group>
  );
}
