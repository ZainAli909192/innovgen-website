export function SceneEnvironment() {
  return (
    <>
      <color attach="background" args={["#071426"]} />
      <fog attach="fog" args={["#071426", 8, 18]} />
    </>
  );
}
