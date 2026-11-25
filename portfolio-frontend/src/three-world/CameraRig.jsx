import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cameraCurve } from "./path";
import { useScroll } from "./ScrollContext";

const lookAtTarget = new THREE.Vector3();
const desiredPos = new THREE.Vector3();

export default function CameraRig() {
  const { progressRef } = useScroll();
  const smoothed = useRef(0);

  useFrame((state, delta) => {
    // Smooth the raw scroll progress so the camera glides instead of jumping
    smoothed.current += (progressRef.current - smoothed.current) * Math.min(delta * 4, 1);
    const t = THREE.MathUtils.clamp(smoothed.current, 0, 1);

    cameraCurve.getPointAt(t, desiredPos);
    state.camera.position.copy(desiredPos);

    const tangentT = Math.min(t + 0.02, 1);
    cameraCurve.getPointAt(tangentT, lookAtTarget);
    state.camera.lookAt(lookAtTarget);
  });

  return null;
}
