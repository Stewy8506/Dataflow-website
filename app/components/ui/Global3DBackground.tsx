"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useTheme } from "next-themes";
import { useBgStore } from "../../store/bgStore";

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;

uniform float uMixHero;
uniform float uMixShowcase;
uniform float uMixWorkflow;
uniform float uMixEcosystems;
uniform float uMixEngine;
uniform float uMixPrivacy;

uniform vec3 uColor1;
uniform vec3 uColor2;

// WebGL automatically defines 'attribute vec3 position;'
attribute vec3 posShowcase;
attribute vec3 posWorkflow;
attribute vec3 posEcosystems;
attribute vec3 posEngine;
attribute vec3 posPrivacy;
attribute float aRandom;

varying vec3 vColor;
varying float vAlpha;

void main() {
  // Blend morph targets based on uniforms. We use 'position' as the Hero state.
  vec3 targetPos = position * uMixHero + 
                   posShowcase * uMixShowcase + 
                   posWorkflow * uMixWorkflow + 
                   posEcosystems * uMixEcosystems + 
                   posEngine * uMixEngine + 
                   posPrivacy * uMixPrivacy;
                   
  // Add some universal subtle noise
  float noise = sin(targetPos.y * 0.1 + uTime) * cos(targetPos.z * 0.1 + uTime);
  targetPos += vec3(noise, noise, noise) * 0.5;

  // Add mouse repulsion
  float mouseDist = distance(vec2(targetPos.x, targetPos.y), vec2(uMouse.x * 50.0, -uMouse.y * 50.0));
  float gravity = max(0.0, 10.0 - mouseDist);
  targetPos.z += gravity * 2.0;

  vec4 mvPosition = modelViewMatrix * vec4(targetPos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Dynamic sizing based on depth
  gl_PointSize = (10.0 * aRandom) / -mvPosition.z;
  if (gl_PointSize < 1.0) gl_PointSize = 1.0;
  
  // Color Mixing
  float mixRatio = clamp((targetPos.y + 10.0) / 20.0, 0.0, 1.0);
  vColor = mix(uColor1, uColor2, mixRatio);
  
  float depth = -mvPosition.z;
  vAlpha = (1.0 - smoothstep(10.0, 100.0, depth)) * (0.3 + 0.7 * aRandom);
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  
  // Standard glowing dot
  float dist = length(uv);
  
  if (dist > 0.5) discard;
  
  float alpha = (0.5 - dist) * 2.0 * vAlpha;
  gl_FragColor = vec4(vColor, alpha);
}
`;

function MorphingParticles() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { resolvedTheme } = useTheme();
  const { activeSection } = useBgStore();
  
  const isDark = resolvedTheme === "dark" || resolvedTheme === undefined;

  const count = 50000;
  
  const geometryData = useMemo(() => {
    const posHero = new Float32Array(count * 3);
    const posShowcase = new Float32Array(count * 3);
    const posWorkflow = new Float32Array(count * 3);
    const posEcosystems = new Float32Array(count * 3);
    const posEngine = new Float32Array(count * 3);
    const posPrivacy = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      randoms[i] = Math.random();
      
      // 1. Hero: Massive chaotic sphere
      const rHero = 25 * Math.cbrt(Math.random());
      const thetaHero = 2 * Math.PI * Math.random();
      const phiHero = Math.acos(2 * Math.random() - 1);
      posHero[idx] = rHero * Math.sin(phiHero) * Math.cos(thetaHero);
      posHero[idx + 1] = rHero * Math.sin(phiHero) * Math.sin(thetaHero);
      posHero[idx + 2] = rHero * Math.cos(phiHero);
      
      // 2. Showcase: Flat grid with a blast ripple hole
      posShowcase[idx] = (Math.random() - 0.5) * 60;
      posShowcase[idx + 1] = -10;
      posShowcase[idx + 2] = (Math.random() - 0.5) * 60;
      
      // 3. Workflow: Long pipeline cylinders
      const rPipe = 5 + Math.random() * 2;
      const tPipe = Math.random() * Math.PI * 2;
      posWorkflow[idx] = rPipe * Math.cos(tPipe);
      posWorkflow[idx + 1] = rPipe * Math.sin(tPipe);
      posWorkflow[idx + 2] = (Math.random() - 0.5) * 80;
      
      // 4. Ecosystems: 1 Core + 4 Moons
      const moonId = i % 5;
      if (moonId === 0) { // Core
        const rCore = 8 * Math.cbrt(Math.random());
        const tCore = 2 * Math.PI * Math.random();
        const pCore = Math.acos(2 * Math.random() - 1);
        posEcosystems[idx] = rCore * Math.sin(pCore) * Math.cos(tCore);
        posEcosystems[idx + 1] = rCore * Math.sin(pCore) * Math.sin(tCore);
        posEcosystems[idx + 2] = rCore * Math.cos(pCore);
      } else { // Orbiting moons
        const rMoon = 3 * Math.cbrt(Math.random());
        const tMoon = 2 * Math.PI * Math.random();
        const pMoon = Math.acos(2 * Math.random() - 1);
        const orbitRadius = 18;
        const orbitAngle = (moonId / 4) * Math.PI * 2;
        posEcosystems[idx] = Math.cos(orbitAngle) * orbitRadius + rMoon * Math.sin(pMoon) * Math.cos(tMoon);
        posEcosystems[idx + 1] = rMoon * Math.sin(pMoon) * Math.sin(tMoon);
        posEcosystems[idx + 2] = Math.sin(orbitAngle) * orbitRadius + rMoon * Math.cos(pMoon);
      }
      
      // 5. Engine: Torus Knot approximation
      const p = 3; const q = 4;
      const u = Math.random() * Math.PI * 2;
      const tubeR = Math.random() * 2;
      const knotR = 10;
      const xKnot = (knotR + tubeR * Math.cos(q * u)) * Math.cos(p * u);
      const yKnot = (knotR + tubeR * Math.cos(q * u)) * Math.sin(p * u);
      const zKnot = tubeR * Math.sin(q * u);
      // add noise
      posEngine[idx] = xKnot + (Math.random()-0.5)*3;
      posEngine[idx + 1] = yKnot + (Math.random()-0.5)*3;
      posEngine[idx + 2] = zKnot + (Math.random()-0.5)*3;
      
      // 6. Privacy: Hollow Shield
      const rShield = 18;
      const tShield = 2 * Math.PI * Math.random();
      const pShield = Math.acos(2 * Math.random() - 1);
      posPrivacy[idx] = rShield * Math.sin(pShield) * Math.cos(tShield);
      posPrivacy[idx + 1] = rShield * Math.sin(pShield) * Math.sin(tShield);
      posPrivacy[idx + 2] = rShield * Math.cos(pShield);
    }
    
    return { posHero, posShowcase, posWorkflow, posEcosystems, posEngine, posPrivacy, randoms };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor1: { value: new THREE.Color("#ff6b00") },
    uColor2: { value: new THREE.Color("#00f0ff") },
    uMixHero: { value: 1.0 },
    uMixShowcase: { value: 0.0 },
    uMixWorkflow: { value: 0.0 },
    uMixEcosystems: { value: 0.0 },
    uMixEngine: { value: 0.0 },
    uMixPrivacy: { value: 0.0 }
  }), []);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColor1.value.set(isDark ? "#ff6b00" : "#e65100");
      materialRef.current.uniforms.uColor2.value.set(isDark ? "#00f0ff" : "#00bcd4");
    }
  }, [isDark]);

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    
    const time = state.clock.getElapsedTime();
    materialRef.current.uniforms.uTime.value = time;
    materialRef.current.uniforms.uMouse.value.set(state.pointer.x, state.pointer.y);

    // Smooth uniform lerping
    const targetMix = {
      hero: activeSection === "hero" || activeSection === "marquee" || activeSection === "download" || activeSection === "" ? 1 : 0,
      showcase: activeSection === "showcase" ? 1 : 0,
      workflow: activeSection === "workflow" ? 1 : 0,
      ecosystems: activeSection === "ecosystems" ? 1 : 0,
      engine: activeSection === "engine" ? 1 : 0,
      privacy: activeSection === "privacy" ? 1 : 0,
    };

    const rate = delta * 3.0;
    const u = materialRef.current.uniforms;
    u.uMixHero.value += (targetMix.hero - u.uMixHero.value) * rate;
    u.uMixShowcase.value += (targetMix.showcase - u.uMixShowcase.value) * rate;
    u.uMixWorkflow.value += (targetMix.workflow - u.uMixWorkflow.value) * rate;
    u.uMixEcosystems.value += (targetMix.ecosystems - u.uMixEcosystems.value) * rate;
    u.uMixEngine.value += (targetMix.engine - u.uMixEngine.value) * rate;
    u.uMixPrivacy.value += (targetMix.privacy - u.uMixPrivacy.value) * rate;
    
    // Slow cinematic camera rotation
    state.camera.position.x = Math.sin(time * 0.1) * 5;
    state.camera.position.z = Math.cos(time * 0.1) * 5 + 30;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        {/* We use posHero as the standard 'position' attribute to satisfy Three.js */}
        <bufferAttribute attach="attributes-position" count={count} array={geometryData.posHero} itemSize={3} args={[geometryData.posHero, 3]} />
        <bufferAttribute attach="attributes-posShowcase" count={count} array={geometryData.posShowcase} itemSize={3} args={[geometryData.posShowcase, 3]} />
        <bufferAttribute attach="attributes-posWorkflow" count={count} array={geometryData.posWorkflow} itemSize={3} args={[geometryData.posWorkflow, 3]} />
        <bufferAttribute attach="attributes-posEcosystems" count={count} array={geometryData.posEcosystems} itemSize={3} args={[geometryData.posEcosystems, 3]} />
        <bufferAttribute attach="attributes-posEngine" count={count} array={geometryData.posEngine} itemSize={3} args={[geometryData.posEngine, 3]} />
        <bufferAttribute attach="attributes-posPrivacy" count={count} array={geometryData.posPrivacy} itemSize={3} args={[geometryData.posPrivacy, 3]} />
        <bufferAttribute attach="attributes-aRandom" count={count} array={geometryData.randoms} itemSize={1} args={[geometryData.randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

export function Global3DBackground() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || resolvedTheme === undefined;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 35], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <MorphingParticles />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={300} intensity={isDark ? 2.0 : 1.0} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
