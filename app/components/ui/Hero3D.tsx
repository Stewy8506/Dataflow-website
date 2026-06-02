"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={3}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={1.8} position={[2, 0, -2]}>
        <MeshDistortMaterial
          color="#ff6b00"
          attach="material"
          distort={0.5}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
          envMapIntensity={2}
        />
      </Sphere>
      <Sphere args={[0.5, 64, 64]} position={[-2, 1, -1]}>
        <MeshDistortMaterial
          color="#ffa040"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          envMapIntensity={1}
        />
      </Sphere>
    </Float>
  );
}

export function Hero3D() {
  return (
    <div style={{ position: "absolute", top: 0, right: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: 'none', opacity: 0.8 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <AnimatedSphere />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
