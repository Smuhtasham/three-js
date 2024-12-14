"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FirstComp = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(0.5,0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    let flagX = true; 
    let flagY = true; 
    const boundaryX = 8;
    const boundaryY = 3.3;
    const speed = 0.12; 
    const animate = () => {
      // Check boundaries for X-axis
      if (cube.position.x > boundaryX) {
        flagX = false;
      } else if (cube.position.x < -boundaryX) {
        flagX = true;
      }

      // Check boundaries for Y-axis
      if (cube.position.y > boundaryY) {
        flagY = false;
      } else if (cube.position.y < -boundaryY) {
        flagY = true;
      }

      // Update position based on direction flags
      cube.position.x += flagX ? speed : -speed;
      cube.position.y += flagY ? speed : -speed;

      // Rotate the cube
      cube.rotation.x += 0.03;
      cube.rotation.y += 0.03;

      // Render the scene
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    return () => {
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};
export default FirstComp;