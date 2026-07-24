"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import {
  BoxGeometry,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Points,
  PointsMaterial,
  SphereGeometry,
  TorusGeometry,
} from "three";
import type { ThreeQualityLevel } from "@/types/three";

const moduleIds = [
  "digital-transformation",
  "software",
  "ai",
  "cloud",
  "cybersecurity",
  "infrastructure",
  "consulting",
] as const;

const modulePositions = [
  [-2.45, 0.85, -0.2],
  [-1.45, -1.35, 0.25],
  [-0.15, 1.75, -0.45],
  [1.45, 1.15, 0.3],
  [2.45, -0.4, -0.15],
  [0.85, -1.65, 0.4],
  [-1.1, 0.25, 0.65],
] as const;

const particleCounts = {
  low: 40,
  medium: 80,
  high: 140,
} as const;

export function ServicesEcosystemScene({
  active,
  interactionId,
  lowMotion,
  progress,
  quality,
}: {
  active: boolean;
  interactionId: string | null;
  lowMotion: boolean;
  progress: MotionValue<number>;
  quality: ThreeQualityLevel;
}) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Group>(null);
  const modulesRef = useRef<InstancedMesh>(null);
  const activeHaloRef = useRef<Mesh>(null);
  const connectorsRef = useRef<LineSegments>(null);
  const activeConnectorRef = useRef<LineSegments>(null);
  const particlesRef = useRef<Points>(null);
  const particleMaterialRef = useRef<PointsMaterial>(null);
  const elapsedRef = useRef(0);
  const moduleScalesRef = useRef(new Float32Array(moduleIds.length));
  const dummy = useMemo(() => new Object3D(), []);

  const coreGeometry = useMemo(() => new IcosahedronGeometry(0.62, 1), []);
  const coreRingGeometry = useMemo(
    () => new TorusGeometry(0.92, 0.018, 5, quality === "low" ? 48 : 72),
    [quality],
  );
  const moduleGeometry = useMemo(
    () => new BoxGeometry(0.48, 0.34, 0.16, 1, 1, 1),
    [],
  );
  const haloGeometry = useMemo(() => new SphereGeometry(0.34, 10, 8), []);
  const goldMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color("#d9b75f"),
        emissive: new Color("#3a2908"),
        emissiveIntensity: 0.22,
        metalness: 0.62,
        roughness: 0.38,
      }),
    [],
  );
  const moduleMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color("#173d70"),
        emissive: new Color("#071b35"),
        emissiveIntensity: 0.24,
        metalness: 0.35,
        roughness: 0.52,
      }),
    [],
  );
  const haloMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color("#5a9df8"),
        emissive: new Color("#2f82f5"),
        emissiveIntensity: 0.68,
        metalness: 0.22,
        opacity: 0.22,
        roughness: 0.5,
        transparent: true,
      }),
    [],
  );

  const connectorGeometry = useMemo(() => {
    const positions = new Float32Array(modulePositions.length * 6);
    modulePositions.forEach((position, index) => {
      const offset = index * 6;
      positions[offset] = 0;
      positions[offset + 1] = 0;
      positions[offset + 2] = 0;
      positions[offset + 3] = position[0];
      positions[offset + 4] = position[1];
      positions[offset + 5] = position[2];
    });
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const activeConnectorGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute(
      "position",
      new Float32BufferAttribute(new Float32Array(6), 3),
    );
    return geometry;
  }, []);

  const particleGeometry = useMemo(() => {
    const count = particleCounts[quality];
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;
      const angle = index * 2.399963;
      const radius = 1.4 + ((index * 37) % 100) / 38;
      positions[offset] = Math.cos(angle) * radius;
      positions[offset + 1] = (((index * 53) % 100) / 100 - 0.5) * 4.4;
      positions[offset + 2] = Math.sin(angle) * radius * 0.55;
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return geometry;
  }, [quality]);

  useEffect(
    () => () => {
      coreGeometry.dispose();
      coreRingGeometry.dispose();
      moduleGeometry.dispose();
      haloGeometry.dispose();
      connectorGeometry.dispose();
      activeConnectorGeometry.dispose();
      particleGeometry.dispose();
      goldMaterial.dispose();
      moduleMaterial.dispose();
      haloMaterial.dispose();
    },
    [
      activeConnectorGeometry,
      connectorGeometry,
      coreGeometry,
      coreRingGeometry,
      goldMaterial,
      haloGeometry,
      haloMaterial,
      moduleGeometry,
      moduleMaterial,
      particleGeometry,
    ],
  );

  useFrame((_, delta) => {
    if (!active) return;
    if (!lowMotion) elapsedRef.current += delta;
    const elapsed = elapsedRef.current;
    const sectionProgress = MathUtils.clamp(progress.get(), 0, 1);
    const entrance = MathUtils.smoothstep(sectionProgress, 0.08, 0.3);
    const assembly = MathUtils.smoothstep(sectionProgress, 0.18, 0.42);
    const exit = MathUtils.smoothstep(sectionProgress, 0.78, 1);
    const interactionIndex = interactionId
      ? moduleIds.indexOf(interactionId as (typeof moduleIds)[number])
      : -1;
    const storyIndex = MathUtils.clamp(
      Math.floor(
        MathUtils.mapLinear(sectionProgress, 0.42, 0.82, 0, moduleIds.length),
      ),
      0,
      moduleIds.length - 1,
    );
    const activeIndex = interactionIndex >= 0 ? interactionIndex : storyIndex;

    if (groupRef.current) {
      groupRef.current.position.z = lowMotion
        ? 0
        : MathUtils.lerp(-0.7, 0, entrance) - exit * 0.55;
      groupRef.current.rotation.y = lowMotion
        ? 0
        : MathUtils.lerp(-0.035, 0.045, sectionProgress) +
          Math.sin(elapsed * 0.16) * 0.012;
      const targetScale = lowMotion
        ? 0.96
        : MathUtils.lerp(0.9, 1, entrance) - exit * 0.04;
      const nextScale = MathUtils.damp(
        groupRef.current.scale.x,
        targetScale,
        3,
        delta,
      );
      groupRef.current.scale.setScalar(nextScale);
    }

    if (coreRef.current && !lowMotion) {
      coreRef.current.rotation.y += delta * 0.075;
      coreRef.current.rotation.z = Math.sin(elapsed * 0.22) * 0.035;
    }

    if (modulesRef.current) {
      modulePositions.forEach((position, index) => {
        const moduleEntrance = MathUtils.smoothstep(
          assembly,
          index * 0.075,
          Math.min(index * 0.075 + 0.42, 1),
        );
        const selected = index === activeIndex ? 1 : 0;
        const targetScale =
          (0.68 + moduleEntrance * 0.32) * (1 + selected * 0.09);
        moduleScalesRef.current[index] = MathUtils.damp(
          moduleScalesRef.current[index],
          lowMotion ? 1 : targetScale,
          5,
          delta,
        );
        dummy.position.set(
          position[0],
          position[1] + (lowMotion ? 0 : Math.sin(elapsed * 0.35 + index) * 0.035),
          position[2] + selected * 0.14,
        );
        dummy.rotation.set(0, index * 0.08 - 0.2, index % 2 === 0 ? 0.03 : -0.03);
        dummy.scale.setScalar(moduleScalesRef.current[index]);
        dummy.updateMatrix();
        modulesRef.current?.setMatrixAt(index, dummy.matrix);
      });
      modulesRef.current.instanceMatrix.needsUpdate = true;
    }

    const activePosition = modulePositions[activeIndex];
    if (activeHaloRef.current) {
      activeHaloRef.current.position.x = MathUtils.damp(
        activeHaloRef.current.position.x,
        activePosition[0],
        6,
        delta,
      );
      activeHaloRef.current.position.y = MathUtils.damp(
        activeHaloRef.current.position.y,
        activePosition[1],
        6,
        delta,
      );
      activeHaloRef.current.position.z = MathUtils.damp(
        activeHaloRef.current.position.z,
        activePosition[2],
        6,
        delta,
      );
      activeHaloRef.current.scale.setScalar(
        lowMotion ? 0.82 : 0.88 + Math.sin(elapsed * 1.1) * 0.05,
      );
    }

    const activePositions =
      activeConnectorRef.current?.geometry.attributes.position;
    if (activePositions) {
      activePositions.setXYZ(0, 0, 0, 0);
      activePositions.setXYZ(
        1,
        activePosition[0],
        activePosition[1],
        activePosition[2],
      );
      activePositions.needsUpdate = true;
    }

    const connectorMaterial = connectorsRef.current?.material;
    if (connectorMaterial instanceof LineBasicMaterial) {
      connectorMaterial.opacity = lowMotion
        ? 0.12
        : MathUtils.lerp(0.04, 0.22, assembly) * (1 - exit * 0.55);
    }
    const activeMaterial = activeConnectorRef.current?.material;
    if (activeMaterial instanceof LineBasicMaterial) {
      activeMaterial.opacity = lowMotion
        ? 0.24
        : 0.34 + Math.sin(elapsed * 1.4) * 0.12;
    }
    if (particlesRef.current && !lowMotion) {
      particlesRef.current.rotation.y += delta * 0.008;
    }
    if (particleMaterialRef.current) {
      particleMaterialRef.current.opacity = lowMotion
        ? 0.06
        : MathUtils.lerp(0.04, 0.2, entrance) * (1 - exit * 0.7);
    }
  });

  return (
    <group ref={groupRef} scale={0.9}>
      <group ref={coreRef}>
        <mesh geometry={coreGeometry} material={goldMaterial} />
        <mesh
          geometry={coreRingGeometry}
          material={goldMaterial}
          rotation={[0.82, 0.16, 0.15]}
        />
      </group>

      <instancedMesh
        ref={modulesRef}
        args={[moduleGeometry, moduleMaterial, moduleIds.length]}
        frustumCulled={false}
      />
      <mesh
        ref={activeHaloRef}
        geometry={haloGeometry}
        material={haloMaterial}
      />

      <lineSegments ref={connectorsRef} geometry={connectorGeometry}>
        <lineBasicMaterial
          color="#2f82f5"
          depthWrite={false}
          opacity={0.04}
          transparent
        />
      </lineSegments>
      <lineSegments
        ref={activeConnectorRef}
        geometry={activeConnectorGeometry}
      >
        <lineBasicMaterial
          color="#e4c477"
          depthWrite={false}
          opacity={0.3}
          transparent
        />
      </lineSegments>

      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          ref={particleMaterialRef}
          color="#83b9ff"
          depthWrite={false}
          opacity={0.06}
          size={quality === "low" ? 0.016 : 0.024}
          sizeAttenuation
          transparent
        />
      </points>
    </group>
  );
}
