import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

export default function ContactObject({ reduced = false }) {
  const groupRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (reduced) return;

    if (groupRef.current) {
      const targetX = state.pointer.y * 0.22;
      const targetY = -0.2 + state.pointer.x * 0.35 + Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.35;
    }
  });

  return (
    <Float
      speed={reduced ? 0 : 1.7}
      rotationIntensity={reduced ? 0 : 0.2}
      floatIntensity={reduced ? 0 : 0.45}
    >
      <group ref={groupRef} scale={1.15}>
        {/* Envelope Body */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[1.9, 1.2, 0.14]} />
          <meshStandardMaterial
            color="#0F172A"
            metalness={0.75}
            roughness={0.28}
          />
        </mesh>

        {/* Glowing cyan message card peeking from the top */}
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[1.55, 0.85, 0.05]} />
          <meshStandardMaterial
            color="#1E293B"
            emissive="#22D3EE"
            emissiveIntensity={0.28}
            roughness={0.35}
          />
        </mesh>

        {/* Message lines on card */}
        <mesh position={[-0.18, 0.42, 0.03]}>
          <boxGeometry args={[0.9, 0.05, 0.01]} />
          <meshBasicMaterial color="#22D3EE" />
        </mesh>
        <mesh position={[-0.28, 0.28, 0.03]}>
          <boxGeometry args={[0.7, 0.04, 0.01]} />
          <meshBasicMaterial color="#60A5FA" />
        </mesh>

        {/* Front Envelope Flap Accent */}
        <mesh position={[0, 0.12, 0.085]} rotation={[0.18, 0, Math.PI / 4]}>
          <boxGeometry args={[1.25, 1.25, 0.025]} />
          <meshStandardMaterial
            color="#1E293B"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Glowing Cyan Trim Bar */}
        <mesh position={[0, -0.65, 0.075]}>
          <boxGeometry args={[1.92, 0.03, 0.02]} />
          <meshBasicMaterial color="#22D3EE" />
        </mesh>

        {/* Orbiting Signal Ring */}
        <group ref={ringRef}>
          <mesh rotation={[Math.PI / 2.3, 0.3, 0]}>
            <torusGeometry args={[1.55, 0.012, 8, 56]} />
            <meshBasicMaterial color="#6366F1" transparent opacity={0.38} />
          </mesh>
          <mesh position={[1.55, 0, 0]}>
            <sphereGeometry args={[0.055, 10, 10]} />
            <meshBasicMaterial color="#22D3EE" />
          </mesh>
        </group>
      </group>
    </Float>
  );
}
