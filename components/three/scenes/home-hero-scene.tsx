"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import {
  BufferGeometry,
  CapsuleGeometry,
  Color,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Points,
  PointsMaterial,
  Shape,
  SphereGeometry,
  TorusGeometry,
} from "three";
import { threeQualityPresets } from "@/config/three";
import type { ThreeQualityLevel } from "@/types/three";

const networkCounts = {
  low: { nodes: 8, connections: 9 },
  medium: { nodes: 16, connections: 22 },
  high: { nodes: 24, connections: 36 },
} as const;

function createCoreShape() {
  const shape = new Shape();
  const outerRadius = 0.86;
  const innerRadius = 0.53;
  const start = MathUtils.degToRad(38);
  const end = MathUtils.degToRad(322);
  const segments = 48;

  for (let index = 0; index <= segments; index += 1) {
    const angle = MathUtils.lerp(start, end, index / segments);
    const x = Math.cos(angle) * outerRadius;
    const y = Math.sin(angle) * outerRadius;
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }

  for (let index = segments; index >= 0; index -= 1) {
    const angle = MathUtils.lerp(start, end, index / segments);
    shape.lineTo(
      Math.cos(angle) * innerRadius,
      Math.sin(angle) * innerRadius,
    );
  }
  shape.closePath();
  return shape;
}

export function HomeHeroScene({
  active,
  lowMotion,
  progress,
  quality,
}: {
  active: boolean;
  lowMotion: boolean;
  progress: MotionValue<number>;
  quality: ThreeQualityLevel;
}) {
  const ecosystemRef = useRef<Group>(null);
  const coreRef = useRef<Group>(null);
  const orbitsRef = useRef<Group>(null);
  const orbitOneRef = useRef<Mesh>(null);
  const orbitTwoRef = useRef<Mesh>(null);
  const orbitThreeRef = useRef<Mesh>(null);
  const pulseOneRef = useRef<Mesh>(null);
  const pulseTwoRef = useRef<Mesh>(null);
  const pulseThreeRef = useRef<Mesh>(null);
  const particlesRef = useRef<Points>(null);
  const particleMaterialRef = useRef<PointsMaterial>(null);
  const networkRef = useRef<Group>(null);
  const networkLinesRef = useRef<LineSegments>(null);
  const networkNodesRef = useRef<Points>(null);
  const elapsedRef = useRef(0);

  const coreShape = useMemo(() => createCoreShape(), []);
  const coreGeometry = useMemo(
    () =>
      new ExtrudeGeometry(coreShape, {
        bevelEnabled: true,
        bevelSegments: quality === "low" ? 2 : 4,
        bevelSize: 0.045,
        bevelThickness: 0.045,
        curveSegments: quality === "low" ? 6 : 10,
        depth: 0.22,
        steps: 1,
      }),
    [coreShape, quality],
  );
  const stemGeometry = useMemo(
    () => new CapsuleGeometry(0.115, 1.18, quality === "low" ? 4 : 8, 12),
    [quality],
  );
  const bridgeGeometry = useMemo(
    () => new CapsuleGeometry(0.1, 0.58, quality === "low" ? 4 : 8, 12),
    [quality],
  );
  const orbitGeometry = useMemo(
    () => new TorusGeometry(1.48, 0.012, 4, quality === "low" ? 72 : 112),
    [quality],
  );
  const pulseGeometry = useMemo(() => new SphereGeometry(0.038, 8, 8), []);

  const goldMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color("#d9b75f"),
        emissive: new Color("#2e2107"),
        emissiveIntensity: 0.16,
        metalness: 0.68,
        roughness: 0.34,
      }),
    [],
  );
  const orbitBlueMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color("#2f82f5"),
        emissive: new Color("#0b2d61"),
        emissiveIntensity: 0.3,
        metalness: 0.32,
        roughness: 0.48,
      }),
    [],
  );
  const orbitNavyMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color("#173d70"),
        emissive: new Color("#07162b"),
        emissiveIntensity: 0.18,
        metalness: 0.42,
        roughness: 0.54,
      }),
    [],
  );
  const pulseMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color("#91c3ff"),
        emissive: new Color("#2f82f5"),
        emissiveIntensity: 1.2,
        roughness: 0.4,
      }),
    [],
  );

  const particleGeometry = useMemo(() => {
    const count = threeQualityPresets[quality].particleLimit;
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;
      const angle = index * 2.399963;
      const radius = 1.85 + ((index * 37) % 100) / 62;
      positions[offset] = Math.cos(angle) * radius;
      positions[offset + 1] = (((index * 61) % 100) / 100 - 0.5) * 3.6;
      positions[offset + 2] = Math.sin(angle) * radius;
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return geometry;
  }, [quality]);

  const network = useMemo(() => {
    const { nodes, connections } = networkCounts[quality];
    const nodePositions = new Float32Array(nodes * 3);
    for (let index = 0; index < nodes; index += 1) {
      const offset = index * 3;
      const angle = (index / nodes) * Math.PI * 2;
      const radius = 1.9 + (index % 3) * 0.28;
      nodePositions[offset] = Math.cos(angle) * radius;
      nodePositions[offset + 1] = Math.sin(index * 1.73) * 1.08;
      nodePositions[offset + 2] = Math.sin(angle) * radius;
    }

    const linePositions = new Float32Array(connections * 6);
    for (let index = 0; index < connections; index += 1) {
      const from = index % nodes;
      const to = (index * 5 + 3) % nodes;
      const lineOffset = index * 6;
      linePositions.set(
        nodePositions.subarray(from * 3, from * 3 + 3),
        lineOffset,
      );
      linePositions.set(
        nodePositions.subarray(to * 3, to * 3 + 3),
        lineOffset + 3,
      );
    }

    const nodeGeometry = new BufferGeometry();
    nodeGeometry.setAttribute(
      "position",
      new Float32BufferAttribute(nodePositions, 3),
    );
    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new Float32BufferAttribute(linePositions, 3),
    );
    return { lineGeometry, nodeGeometry };
  }, [quality]);

  useEffect(
    () => () => {
      coreGeometry.dispose();
      stemGeometry.dispose();
      bridgeGeometry.dispose();
      orbitGeometry.dispose();
      pulseGeometry.dispose();
      particleGeometry.dispose();
      network.lineGeometry.dispose();
      network.nodeGeometry.dispose();
      goldMaterial.dispose();
      orbitBlueMaterial.dispose();
      orbitNavyMaterial.dispose();
      pulseMaterial.dispose();
    },
    [
      bridgeGeometry,
      coreGeometry,
      goldMaterial,
      network,
      orbitBlueMaterial,
      orbitGeometry,
      orbitNavyMaterial,
      particleGeometry,
      pulseGeometry,
      pulseMaterial,
      stemGeometry,
    ],
  );

  useFrame((_, delta) => {
    if (!active) return;
    const sectionProgress = MathUtils.clamp(progress.get(), 0, 1);
    const architectureProgress = MathUtils.smoothstep(
      sectionProgress,
      0.2,
      0.5,
    );
    const networkProgress = MathUtils.smoothstep(
      sectionProgress,
      0.5,
      0.8,
    );
    if (!lowMotion) elapsedRef.current += delta;
    const elapsed = elapsedRef.current;

    if (ecosystemRef.current) {
      ecosystemRef.current.position.y = lowMotion
        ? 0
        : Math.sin(elapsed * 0.34) * 0.035;
      ecosystemRef.current.rotation.y = MathUtils.damp(
        ecosystemRef.current.rotation.y,
        lowMotion
          ? -0.1
          : -0.1 +
              Math.sin(elapsed * 0.2) * 0.035 +
              sectionProgress * 0.08,
        2.5,
        delta,
      );
    }
    if (coreRef.current) {
      const targetScale = lowMotion
        ? 0.98
        : MathUtils.lerp(
            0.94,
            0.98,
            MathUtils.smoothstep(sectionProgress, 0, 0.35),
          );
      const scale = MathUtils.damp(
        coreRef.current.scale.x,
        targetScale,
        3,
        delta,
      );
      coreRef.current.scale.setScalar(scale);
      coreRef.current.rotation.z = lowMotion
        ? 0
        : Math.sin(elapsed * 0.26) * 0.018;
    }
    if (orbitsRef.current) {
      const targetScale = lowMotion
        ? 0.96
        : MathUtils.lerp(0.92, 0.98, architectureProgress);
      const scale = MathUtils.damp(
        orbitsRef.current.scale.x,
        targetScale,
        3,
        delta,
      );
      orbitsRef.current.scale.setScalar(scale);
    }
    if (orbitOneRef.current) {
      orbitOneRef.current.rotation.z = 0.18 + elapsed * 0.024;
    }
    if (orbitTwoRef.current) {
      orbitTwoRef.current.rotation.z = -0.4 - elapsed * 0.018;
    }
    if (orbitThreeRef.current) {
      orbitThreeRef.current.rotation.y = 0.56 + elapsed * 0.013;
    }

    const pulsesVisible = !lowMotion;
    if (pulseOneRef.current) pulseOneRef.current.visible = pulsesVisible;
    if (pulseTwoRef.current) pulseTwoRef.current.visible = pulsesVisible;
    if (pulseThreeRef.current) pulseThreeRef.current.visible = pulsesVisible;
    if (!lowMotion && pulseOneRef.current) {
      const angle = elapsed * 0.34;
      pulseOneRef.current.position.set(
        Math.cos(angle) * 1.48,
        Math.sin(angle) * 1.48,
        0,
      );
    }
    if (!lowMotion && pulseTwoRef.current) {
      const angle = elapsed * 0.27 + 2.1;
      pulseTwoRef.current.position.set(
        Math.cos(angle) * 1.72,
        Math.sin(angle) * 0.72,
        Math.sin(angle) * 0.98,
      );
    }
    if (!lowMotion && pulseThreeRef.current) {
      const angle = elapsed * 0.22 + 4.2;
      pulseThreeRef.current.position.set(
        Math.cos(angle) * 0.82,
        Math.sin(angle) * 1.76,
        Math.cos(angle) * 0.72,
      );
    }

    const particleMaterial = particleMaterialRef.current;
    if (particleMaterial) {
      particleMaterial.opacity = MathUtils.damp(
        particleMaterial.opacity,
        lowMotion ? 0.08 : MathUtils.lerp(0.14, 0.26, architectureProgress),
        3,
        delta,
      );
    }
    if (particlesRef.current && !lowMotion) {
      particlesRef.current.rotation.y += delta * 0.006;
    }
    const lineMaterial = networkLinesRef.current?.material;
    if (lineMaterial instanceof LineBasicMaterial) {
      lineMaterial.opacity = MathUtils.damp(
        lineMaterial.opacity,
        lowMotion ? 0.06 : MathUtils.lerp(0, 0.18, networkProgress),
        3,
        delta,
      );
    }
    const nodeMaterial = networkNodesRef.current?.material;
    if (nodeMaterial instanceof PointsMaterial) {
      nodeMaterial.opacity = MathUtils.damp(
        nodeMaterial.opacity,
        lowMotion ? 0.18 : MathUtils.lerp(0.2, 0.56, architectureProgress),
        3,
        delta,
      );
    }
    if (networkRef.current) {
      networkRef.current.rotation.y = sectionProgress * 0.05;
    }
  });

  return (
    <group
      ref={ecosystemRef}
      position={[0.22, 0, 0]}
      rotation={[0.04, -0.1, 0]}
      scale={0.76}
    >
      <group ref={coreRef} rotation={[0, 0.08, 0]}>
        <mesh
          geometry={coreGeometry}
          material={goldMaterial}
          position={[0.12, 0, -0.11]}
        />
        <mesh
          geometry={stemGeometry}
          material={goldMaterial}
          position={[-0.28, 0, 0.08]}
        />
        <mesh
          geometry={bridgeGeometry}
          material={goldMaterial}
          position={[0.5, -0.08, 0.08]}
          rotation={[0, 0, Math.PI / 2]}
        />
      </group>

      <group ref={orbitsRef}>
        <mesh
          ref={orbitOneRef}
          geometry={orbitGeometry}
          material={orbitBlueMaterial}
          rotation={[0.3, 0.12, 0.18]}
        />
        <mesh
          ref={orbitTwoRef}
          geometry={orbitGeometry}
          material={orbitNavyMaterial}
          rotation={[1.02, 0.18, -0.4]}
          scale={1.16}
        />
        {quality !== "low" ? (
          <mesh
            ref={orbitThreeRef}
            geometry={orbitGeometry}
            material={orbitBlueMaterial}
            rotation={[0.62, 0.56, 0.22]}
            scale={1.32}
          />
        ) : null}
        <mesh
          ref={pulseOneRef}
          geometry={pulseGeometry}
          material={pulseMaterial}
        />
        {quality !== "low" ? (
          <>
            <mesh
              ref={pulseTwoRef}
              geometry={pulseGeometry}
              material={pulseMaterial}
            />
            <mesh
              ref={pulseThreeRef}
              geometry={pulseGeometry}
              material={pulseMaterial}
            />
          </>
        ) : null}
      </group>

      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          ref={particleMaterialRef}
          color="#5a9df8"
          depthWrite={false}
          opacity={0.08}
          size={quality === "low" ? 0.018 : 0.025}
          sizeAttenuation
          transparent
        />
      </points>

      <group ref={networkRef}>
        <lineSegments ref={networkLinesRef} geometry={network.lineGeometry}>
          <lineBasicMaterial
            color="#2f82f5"
            depthWrite={false}
            opacity={0}
            transparent
          />
        </lineSegments>
        <points ref={networkNodesRef} geometry={network.nodeGeometry}>
          <pointsMaterial
            color="#9dcaff"
            depthWrite={false}
            opacity={0.03}
            size={quality === "low" ? 0.035 : 0.052}
            sizeAttenuation
            transparent
          />
        </points>
      </group>
    </group>
  );
}
