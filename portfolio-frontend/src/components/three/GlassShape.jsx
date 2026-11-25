import { Float, MeshTransmissionMaterial } from "@react-three/drei";

const GEOMETRIES = {
  icosahedron: <icosahedronGeometry args={[1, 0]} />,
  torus: <torusGeometry args={[0.9, 0.32, 24, 48]} />,
  octahedron: <octahedronGeometry args={[1, 0]} />,
  box: <boxGeometry args={[1.3, 1.3, 1.3]} />,
};

export default function GlassShape({
  geometry = "icosahedron",
  position = [0, 0, 0],
  scale = 1,
  color = "#3B82F6",
  floatSpeed = 1.4,
  floatIntensity = 1,
  reduced = false,
  // MeshTransmissionMaterial does an extra render pass per instance — very
  // expensive when several are on screen at once. Only the "hero" shape of
  // each cluster should use it; the rest get a cheap glossy material.
  transmissive = true,
}) {
  return (
    <Float
      speed={reduced ? 0 : floatSpeed}
      floatIntensity={reduced ? 0 : floatIntensity}
      rotationIntensity={reduced ? 0 : 0.6}
    >
      <mesh position={position} scale={scale}>
        {GEOMETRIES[geometry]}
        {transmissive ? (
          <MeshTransmissionMaterial
            color={color}
            thickness={0.6}
            roughness={0.08}
            transmission={1}
            ior={1.3}
            chromaticAberration={0.02}
            resolution={256}
            samples={4}
            backside={false}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            roughness={0.25}
            metalness={0.1}
            transparent
            opacity={0.55}
            emissive={color}
            emissiveIntensity={0.15}
          />
        )}
      </mesh>
    </Float>
  );
}
