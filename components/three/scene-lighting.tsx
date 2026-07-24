import type { ThreeQualityLevel } from "@/types/three";

export function SceneLighting({ quality }: { quality: ThreeQualityLevel }) {
  return (
    <>
      <ambientLight intensity={quality === "low" ? 0.75 : 0.55} />
      <directionalLight
        position={[4, 5, 6]}
        intensity={2.2}
        color="#dcecff"
        castShadow={quality === "high"}
      />
      {quality !== "low" ? (
        <pointLight position={[-4, -1, 3]} intensity={1.4} color="#2f82f5" />
      ) : null}
      {quality === "high" ? (
        <pointLight position={[3, 1, -4]} intensity={1.1} color="#e6c779" />
      ) : null}
    </>
  );
}
