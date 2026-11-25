import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";
import { useViewportMode } from "../../hooks/useViewportMode";

const MAX_CONNECTIONS = 110;

function ParticleNetwork({ count, isDark, reduced }) {
  const meshRef = useRef();
  const linesRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Deterministic-feel spatial distribution in a wide, shallow volume
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 18,
        y: (Math.random() - 0.5) * 11,
        z: (Math.random() - 0.5) * 5 - 1.5,
        vx: (Math.random() - 0.5) * 0.006,
        vy: (Math.random() - 0.5) * 0.005,
        vz: (Math.random() - 0.5) * 0.003,
        scale: 0.03 + Math.random() * 0.035,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [count]);

  const linePositions = useMemo(() => new Float32Array(MAX_CONNECTIONS * 6), []);
  const lineColors = useMemo(() => new Float32Array(MAX_CONNECTIONS * 6), []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [linePositions, lineColors]);

  useEffect(() => {
    return () => lineGeometry.dispose();
  }, [lineGeometry]);

  // Assign subtle cyan / blue / indigo colors to instanced spheres
  useEffect(() => {
    if (!meshRef.current) return;
    const palette = isDark
      ? [new THREE.Color("#22D3EE"), new THREE.Color("#3B82F6"), new THREE.Color("#6366F1")]
      : [new THREE.Color("#0284C7"), new THREE.Color("#2563EB"), new THREE.Color("#4F46E5")];

    for (let i = 0; i < count; i++) {
      meshRef.current.setColorAt(i, palette[i % palette.length]);
    }
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [count, isDark]);

  useFrame((state) => {
    if (!meshRef.current || !linesRef.current) return;
    const t = state.clock.elapsedTime;
    const maxDist = 3.6;
    let lineIdx = 0;

    const baseR = isDark ? 0.13 : 0.12;
    const baseG = isDark ? 0.82 : 0.45;
    const baseB = isDark ? 0.93 : 0.9;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      if (!reduced) {
        p.x += p.vx;
        p.y += p.vy + Math.sin(t * 0.4 + p.phase) * 0.0012;
        p.z += p.vz;

        if (p.x > 9 || p.x < -9) p.vx *= -1;
        if (p.y > 5.5 || p.y < -5.5) p.vy *= -1;
        if (p.z > 1 || p.z < -4) p.vz *= -1;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Connect nearby nodes
      for (let j = i + 1; j < count && lineIdx < MAX_CONNECTIONS; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dz = p.z - q.z;
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < maxDist * maxDist) {
          const fade = 1 - Math.sqrt(distSq) / maxDist;
          const offset = lineIdx * 6;
          linePositions[offset] = p.x;
          linePositions[offset + 1] = p.y;
          linePositions[offset + 2] = p.z;
          linePositions[offset + 3] = q.x;
          linePositions[offset + 4] = q.y;
          linePositions[offset + 5] = q.z;

          lineColors[offset] = baseR * fade;
          lineColors[offset + 1] = baseG * fade;
          lineColors[offset + 2] = baseB * fade;
          lineColors[offset + 3] = baseR * fade;
          lineColors[offset + 4] = baseG * fade;
          lineColors[offset + 5] = baseB * fade;
          lineIdx++;
        }
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;
    lineGeometry.setDrawRange(0, lineIdx * 2);

    // Subtle mouse parallax on the entire network
    if (!reduced) {
      const targetX = state.pointer.y * 0.06;
      const targetY = state.pointer.x * 0.08;
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.03;
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.03;
      linesRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial transparent opacity={isDark ? 0.42 : 0.3} />
      </instancedMesh>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={isDark ? 0.16 : 0.12}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function FloatingParticles() {
  const { isDark } = useTheme();
  const { isMobile, isTablet, canWebGL, reducedMotion } = useViewportMode();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  if (!canWebGL) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none bg-grid-pattern opacity-70"
      />
    );
  }

  const count = isMobile ? 18 : isTablet ? 28 : 42;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-45" />
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, isMobile ? 1 : 1.25]}
        frameloop={hidden || reducedMotion ? "demand" : "always"}
        gl={{ antialias: false, alpha: true, powerPreference: "default" }}
        style={{ background: "transparent" }}
      >
        <ParticleNetwork count={count} isDark={isDark} reduced={reducedMotion} />
      </Canvas>
    </div>
  );
}
