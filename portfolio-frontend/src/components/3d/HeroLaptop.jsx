import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Generates a crisp high-contrast dark-editor screen texture via Canvas2D.
 * Zero external image dependencies, instant load, ultra-low memory footprint.
 */
function createCodeScreenTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 480;
  const ctx = canvas.getContext("2d");

  // Editor background
  ctx.fillStyle = "#060B1A";
  ctx.fillRect(0, 0, 768, 480);

  // Subtle top titlebar
  ctx.fillStyle = "#0B132B";
  ctx.fillRect(0, 0, 768, 34);
  const dots = ["#EF4444", "#F59E0B", "#10B981"];
  dots.forEach((c, idx) => {
    ctx.beginPath();
    ctx.arc(20 + idx * 18, 17, 5, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });

  ctx.fillStyle = "#64748B";
  ctx.font = "600 13px monospace";
  ctx.fillText("Portfolio.jsx — Ahallal Hamza", 95, 21);

  // Left sidebar strip in editor
  ctx.fillStyle = "#080E21";
  ctx.fillRect(0, 34, 48, 418);

  // Code lines with syntax highlighting
  const lines = [
    [["import ", "#818CF8"], ["{ React, Laravel, Node }", "#22D3EE"], [" from ", "#818CF8"], ["'@stack'", "#34D399"], [";", "#94A3B8"]],
    [["", "#94A3B8"]],
    [["const ", "#818CF8"], ["developer", "#60A5FA"], [" = {", "#94A3B8"]],
    [["  name: ", "#94A3B8"], ["'Ahallal Hamza'", "#34D399"], [",", "#94A3B8"]],
    [["  role: ", "#94A3B8"], ["'Junior Full Stack Developer'", "#34D399"], [",", "#94A3B8"]],
    [["  location: ", "#94A3B8"], ["'Tahla — Taza, Morocco'", "#34D399"], [",", "#94A3B8"]],
    [["  frontend: ", "#94A3B8"], ["['React', 'Tailwind', 'JS']", "#FBBF24"], [",", "#94A3B8"]],
    [["  backend: ", "#94A3B8"], ["['PHP', 'Laravel', 'Node.js']", "#FBBF24"], [",", "#94A3B8"]],
    [["  databases: ", "#94A3B8"], ["['MySQL', 'MongoDB']", "#FBBF24"], [",", "#94A3B8"]],
    [["};", "#94A3B8"]],
    [["", "#94A3B8"]],
    [["export function ", "#818CF8"], ["buildWebExperience", "#22D3EE"], ["() {", "#94A3B8"]],
    [["  return ", "#818CF8"], ["(", "#94A3B8"]],
    [["    <Architecture", "#60A5FA"], [" clean", "#22D3EE"], [" responsive", "#22D3EE"], [" fast", "#22D3EE"], [" />", "#60A5FA"]],
    [["  );", "#94A3B8"]],
    [["}", "#94A3B8"]],
  ];

  ctx.font = "15px Consolas, Monaco, monospace";
  lines.forEach((tokens, rowIdx) => {
    const y = 68 + rowIdx * 23;
    // Line number
    ctx.fillStyle = "#334155";
    ctx.fillText(String(rowIdx + 1).padStart(2, " "), 14, y);

    let x = 68;
    tokens.forEach(([text, color]) => {
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
      x += ctx.measureText(text).width;
    });
  });

  // Bottom status bar
  ctx.fillStyle = "#0F172A";
  ctx.fillRect(0, 452, 768, 28);
  ctx.fillStyle = "#22D3EE";
  ctx.font = "12px monospace";
  ctx.fillText("● READY  |  UTF-8  |  React 18 + Laravel API", 18, 470);

  // Subtle cyan reflection gradient
  const grad = ctx.createLinearGradient(0, 0, 768, 480);
  grad.addColorStop(0, "rgba(34,211,238,0.06)");
  grad.addColorStop(1, "rgba(99,102,241,0.05)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 768, 480);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function KeyboardKeys() {
  const keysRef = useRef();
  const rows = 4;
  const cols = 12;
  const total = rows * cols;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!keysRef.current) return;
    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = -0.95 + c * 0.172;
        const z = -0.32 + r * 0.16;
        dummy.position.set(x, 0.048, z);
        dummy.scale.set(0.145, 0.015, 0.125);
        dummy.updateMatrix();
        keysRef.current.setMatrixAt(idx++, dummy.matrix);
      }
    }
    keysRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  return (
    <instancedMesh ref={keysRef} args={[null, null, total]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.3} />
    </instancedMesh>
  );
}

export default function HeroLaptop({ reduced = false, isMobile = false }) {
  const rootRef = useRef();
  const haloRef = useRef();
  const entrance = useRef(0);
  const screenTexture = useMemo(() => createCodeScreenTexture(), []);

  useEffect(() => {
    return () => screenTexture.dispose();
  }, [screenTexture]);

  useFrame((state, delta) => {
    if (!rootRef.current) return;

    // Smooth entrance scale
    if (entrance.current < 1) {
      entrance.current = Math.min(entrance.current + delta * 1.8, 1);
      const eased = 1 - Math.pow(1 - entrance.current, 3);
      rootRef.current.scale.setScalar(0.85 + eased * 0.15);
    }

    if (reduced) return;

    // Subtle scroll-based vertical tilt + mouse pointer parallax
    const scrollFactor = Math.min((window.scrollY || 0) / 700, 1);
    const targetRotX = 0.22 + state.pointer.y * 0.14 - scrollFactor * 0.18;
    const targetRotY = -0.32 + state.pointer.x * 0.26 + Math.sin(state.clock.elapsedTime * 0.5) * 0.06;

    rootRef.current.rotation.x += (targetRotX - rootRef.current.rotation.x) * 0.06;
    rootRef.current.rotation.y += (targetRotY - rootRef.current.rotation.y) * 0.06;

    if (haloRef.current) {
      haloRef.current.rotation.z += delta * 0.28;
    }
  });

  const baseScale = isMobile ? 0.82 : 1.05;

  return (
    <group scale={baseScale}>
      <Float
        speed={reduced ? 0 : 1.6}
        rotationIntensity={reduced ? 0 : 0.15}
        floatIntensity={reduced ? 0 : 0.45}
      >
        <group ref={rootRef} position={[0, -0.18, 0]} rotation={[0.22, -0.32, 0]}>
          {/* Laptop Base */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.35, 0.08, 1.55]} />
            <meshStandardMaterial color="#1E293B" metalness={0.82} roughness={0.28} />
          </mesh>

          {/* Keyboard recessed deck */}
          <mesh position={[0, 0.042, -0.05]}>
            <boxGeometry args={[2.12, 0.01, 0.92]} />
            <meshStandardMaterial color="#0B1120" metalness={0.4} roughness={0.6} />
          </mesh>

          {/* Instanced Keyboard Keys */}
          <KeyboardKeys />

          {/* Trackpad */}
          <mesh position={[0, 0.043, 0.5]}>
            <boxGeometry args={[0.75, 0.008, 0.4]} />
            <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Front Cyan LED Accent Strip */}
          <mesh position={[0, 0, 0.778]}>
            <boxGeometry args={[0.9, 0.014, 0.01]} />
            <meshBasicMaterial color="#22D3EE" />
          </mesh>

          {/* Hinge */}
          <mesh position={[0, 0.04, -0.75]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.032, 0.032, 1.8, 12]} />
            <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.25} />
          </mesh>

          {/* Laptop Lid / Screen Assembly (angled open ~108 deg) */}
          <group position={[0, 0.04, -0.75]} rotation={[-0.24, 0, 0]}>
            {/* Aluminum Back Shell */}
            <mesh position={[0, 0.76, 0]}>
              <boxGeometry args={[2.35, 1.48, 0.055]} />
              <meshStandardMaterial color="#1E293B" metalness={0.85} roughness={0.25} />
            </mesh>

            {/* Inner Dark Bezel */}
            <mesh position={[0, 0.76, 0.025]}>
              <boxGeometry args={[2.24, 1.38, 0.015]} />
              <meshStandardMaterial color="#050816" roughness={0.5} metalness={0.2} />
            </mesh>

            {/* Glowing Code Screen */}
            <mesh position={[0, 0.76, 0.034]}>
              <planeGeometry args={[2.14, 1.28]} />
              <meshBasicMaterial map={screenTexture} toneMapped={false} />
            </mesh>
          </group>

          {/* Subtle Holographic Accents around the Laptop */}
          <group ref={haloRef} position={[0, 0.55, -0.1]}>
            <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
              <torusGeometry args={[1.95, 0.012, 8, 64]} />
              <meshBasicMaterial color="#22D3EE" transparent opacity={0.32} />
            </mesh>
            <mesh rotation={[Math.PI / 2.1, -0.35, 0]}>
              <torusGeometry args={[2.2, 0.008, 8, 64]} />
              <meshBasicMaterial color="#6366F1" transparent opacity={0.25} />
            </mesh>
          </group>

          {/* Floating Holographic Nodes */}
          <mesh position={[-1.55, 1.25, 0.25]}>
            <octahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial
              color="#22D3EE"
              emissive="#22D3EE"
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[1.55, 0.95, -0.35]}>
            <icosahedronGeometry args={[0.09, 0]} />
            <meshStandardMaterial
              color="#6366F1"
              emissive="#6366F1"
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[1.25, 0.15, 0.65]}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshBasicMaterial color="#3B82F6" />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
