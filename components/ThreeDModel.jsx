"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

const Model = () => {
  const { scene, animations } = useGLTF("/black_dragon_with_idle_animation.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    console.log("Animations:", animations);
    if (actions) {
      const idleAnimation = actions["Idle"] || actions[Object.keys(actions)[0]];
      if (idleAnimation) {
        idleAnimation.play();
      }
    }
  }, [actions]);

  return <primitive object={scene} scale={1} />;
};

const MovingLight = () => {
  const [mousePos, setMousePos] = useState([0, 0]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePos([x * 5, y * 5]); // Adjust multiplier for sensitivity
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
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 5, 3]} intensity={12} />
          <MovingLight /> {/* Light follows the cursor */}
          <Model />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeDModel;
