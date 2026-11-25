import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { TECH_ORBIT_ITEMS } from "../../data/technologies";

function OrbitNode({ item, basePos, isSelected, isHovered, onHover, onSelect }) {
  const { Icon, name, color } = item;
  const active = isSelected || isHovered;

  return (
    <group position={basePos}>
      {/* Small glowing anchor sphere */}
      <mesh>
        <sphereGeometry args={[active ? 0.1 : 0.06, 10, 10]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.9 : 0.55} />
      </mesh>

      <Html center distanceFactor={8.5} zIndexRange={[20, 0]}>
        <button
          type="button"
          onClick={() => onSelect(item)}
          onMouseEnter={() => onHover(item.id)}
          onMouseLeave={() => onHover(null)}
          aria-label={`Select ${name}`}
          className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border backdrop-blur-md transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
            active
              ? "scale-110 bg-slate-900/95 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.45)] text-white"
              : "bg-slate-900/80 border-white/15 text-slate-200 hover:border-cyan-400/60"
          }`}
        >
          <Icon style={{ color }} className="w-4 h-4 shrink-0" />
          <span className="text-[11px] font-medium tracking-tight">{name}</span>
        </button>
      </Html>
    </group>
  );
}

export default function TechnologyOrbit({
  selectedTech,
  onSelectTech,
  reduced = false,
  isMobile = false,
}) {
  const orbitGroupRef = useRef();
  const coreRef = useRef();
  const [hoveredId, setHoveredId] = useState(null);

  const radius = isMobile ? 2.15 : 2.85;

  // Distribute 12 technologies across two tilted orbital rings (6 outer, 6 inner)
  const nodes = useMemo(() => {
    return TECH_ORBIT_ITEMS.map((item, idx) => {
      const isInner = idx % 2 === 1;
      const ringIndex = Math.floor(idx / 2);
      const angle = (ringIndex / 6) * Math.PI * 2;
      const r = isInner ? radius * 0.72 : radius;
      const yOffset = isInner ? Math.sin(angle) * 0.65 : Math.cos(angle) * -0.55;
      return {
        item,
        pos: [Math.cos(angle) * r, yOffset, Math.sin(angle) * r],
      };
    });
  }, [radius]);

  useFrame((state, delta) => {
    if (coreRef.current && !reduced) {
      coreRef.current.rotation.y += delta * 0.35;
      coreRef.current.rotation.x += delta * 0.15;
    }

    if (orbitGroupRef.current && !reduced) {
      // Slow down orbit smoothly when hovering or inspecting a technology
      const speedFactor = hoveredId ? 0.15 : 1;
      orbitGroupRef.current.rotation.y += delta * 0.22 * speedFactor;

      const targetTiltX = 0.18 + state.pointer.y * 0.15;
      const targetTiltZ = state.pointer.x * -0.08;
      orbitGroupRef.current.rotation.x += (targetTiltX - orbitGroupRef.current.rotation.x) * 0.04;
      orbitGroupRef.current.rotation.z += (targetTiltZ - orbitGroupRef.current.rotation.z) * 0.04;
    }
  });

  return (
    <group>
      {/* Central Core */}
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[0.62, 1]} />
          <meshStandardMaterial
            color="#0B132B"
            emissive="#1D4ED8"
            emissiveIntensity={0.45}
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.72, 1]} />
          <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.35} />
        </mesh>
      </group>

      {/* Orbital Rings & 12 Tech Nodes */}
      <group ref={orbitGroupRef} rotation={[0.18, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0.2, 0]}>
          <torusGeometry args={[radius, 0.01, 8, 72]} />
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.22} />
        </mesh>
        <mesh rotation={[Math.PI / 2, -0.25, 0]}>
          <torusGeometry args={[radius * 0.72, 0.008, 8, 64]} />
          <meshBasicMaterial color="#6366F1" transparent opacity={0.22} />
        </mesh>

        {nodes.map(({ item, pos }) => (
          <OrbitNode
            key={item.id}
            item={item}
            basePos={pos}
            isSelected={selectedTech?.id === item.id}
            isHovered={hoveredId === item.id}
            onHover={setHoveredId}
            onSelect={onSelectTech}
          />
        ))}
      </group>
    </group>
  );
}
