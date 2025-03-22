"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

const Sculpture = () => {
  const { scene } = useGLTF("/laocoon_and_his_sons.glb");
  return <primitive object={scene} scale={0.3} />;
};

// Light that accurately follows the mouse
const MovingLight = () => {
  const lightRef = useRef(null);
  const targetPos = useRef(new THREE.Vector3(0, 0, 5));

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1; // Normalize X
      const y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize Y
      targetPos.current.set(x * 5, y * 7, 5); // Adjusted scaling for precise movement
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (lightRef.current) {
      // Smooth interpolation for natural movement
      lightRef.current.position.lerp(targetPos.current, 0.2);
    }
  });

  return <pointLight ref={lightRef} intensity={10} color="white" distance={10} decay={1} />;
};

const ThreeDModel = () => {
  return (
    <div className="h-[100vh] w-full bg-black">
      <Canvas camera={{ fov: 50, position: [0, 4, 10] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.05} /> {/* Low ambient light for better contrast */}
          <Sculpture />
          <MovingLight />
          <OrbitControls enableRotate={false} enablePan={false} enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeDModel;
