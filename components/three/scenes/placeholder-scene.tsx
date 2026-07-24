"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Mesh,
  MeshStandardMaterial,
  PointsMaterial,
  TorusGeometry,
} from "three";
import { threeQualityPresets } from "@/config/three";
import type { ThreeQualityLevel } from "@/types/three";

export function PlaceholderScene({
  active,
  quality,
}: {
  active: boolean;
  quality: ThreeQualityLevel;
}) {
  const coreRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);
  const particleLimit = threeQualityPresets[quality].particleLimit;

  const coreGeometry = useMemo(() => new TorusGeometry(1.05, 0.34, 18, 64), []);
  const ringGeometry = useMemo(() => new TorusGeometry(1.85, 0.025, 8, 96), []);
  const coreMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color("#173d70"),
        metalness: 0.55,
        roughness: 0.3,
      }),
    [],
  );
  const ringMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color("#e6c779"),
        emissive: new Color("#5a4618"),
        emissiveIntensity: 0.3,
        metalness: 0.7,
        roughness: 0.25,
      }),
    [],
  );
  const particleGeometry = useMemo(() => {
    const positions = new Float32Array(particleLimit * 3);
    for (let index = 0; index < particleLimit; index += 1) {
      const offset = index * 3;
      const radius = 2.4 + ((index * 47) % 100) / 62;
      const angle = index * 2.399963;
      positions[offset] = Math.cos(angle) * radius;
      positions[offset + 1] = (((index * 29) % 100) / 100 - 0.5) * 4;
      positions[offset + 2] = Math.sin(angle) * radius;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return geometry;
  }, [particleLimit]);
  const particleMaterial = useMemo(
    () =>
      new PointsMaterial({
        color: "#6aa8ff",
        size: quality === "low" ? 0.025 : 0.035,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
      }),
    [quality],
  );

  useEffect(
    () => () => {
      coreGeometry.dispose();
      ringGeometry.dispose();
      coreMaterial.dispose();
      ringMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    },
    [
      coreGeometry,
      coreMaterial,
      particleGeometry,
      particleMaterial,
      ringGeometry,
      ringMaterial,
    ],
  );

  useFrame((_, delta) => {
    if (!active) return;
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.14;
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.08;
      ringRef.current.rotation.z -= delta * 0.06;
    }
  });

  return (
    <group>
      <mesh ref={coreRef} geometry={coreGeometry} material={coreMaterial} />
      <mesh
        ref={ringRef}
        geometry={ringGeometry}
        material={ringMaterial}
        rotation={[1.1, 0.2, 0]}
      />
      {quality !== "low" ? (
        <points geometry={particleGeometry} material={particleMaterial} />
      ) : null}
    </group>
  );
}
