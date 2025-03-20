"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

const Scalpture = () => {
  const { scene } = useGLTF("/laocoon_and_his_sons.glb");

  return (
    <primitive
      object={scene}
      scale={1}
    />
  );
};

const MovingLight = () => {
  const [mousePos, setMousePos] = useState([0, 0]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePos([x * 5, y * 5]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <pointLight
      position={[mousePos[0], mousePos[1], 2]}
      intensity={2}
      color={"#ffffff"}
    />
  );
};

const ThreeDModel = () => {
  return (
    <div className="h-[100vh] w-full">
      <Canvas camera={{ fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 5, 3]} intensity={1.2} />
          <MovingLight />
          <Scalpture /> {/* ✅ Correct component name */}
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeDModel; // ✅ Correct default export
