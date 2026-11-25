import * as THREE from "three";

// One stop per section. Order matters — it's also the scroll order.
export const STOPS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "automation", label: "AI & Automation" },
  { id: "contact", label: "Contact" },
];

// Camera positions — a gentle drifting path through the scene (not a
// straight line) so movement feels cinematic rather than mechanical.
export const CAMERA_POINTS = [
  new THREE.Vector3(0, 0, 8),
  new THREE.Vector3(2.5, 0.6, 4),
  new THREE.Vector3(-2.5, -0.4, 0),
  new THREE.Vector3(2, 0.8, -4),
  new THREE.Vector3(-2, -0.6, -8),
  new THREE.Vector3(0, 0.3, -12),
];

// Where each island (decorative shapes per section) sits in the world —
// roughly along the same path, offset so islands don't sit exactly on
// the camera line.
export const ISLAND_POSITIONS = CAMERA_POINTS.map(
  (p, i) => new THREE.Vector3(p.x * 1.3, p.y, p.z - (i === 0 ? 2 : 1.5))
);

export const cameraCurve = new THREE.CatmullRomCurve3(
  CAMERA_POINTS,
  false,
  "catmullrom",
  0.3
);
