"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useTheme } from "next-themes";
import { useBgStore } from "../../store/bgStore";
import { useScroll, useVelocity, useSpring } from "framer-motion";

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

uniform float uScrollVelocity;

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
  // Rotate Ecosystems layout so the moons orbit the planet
  float ecoAngle = uTime * 0.4;
  float cosE = cos(ecoAngle);
  float sinE = sin(ecoAngle);
  vec3 rotatedEcosystems = vec3(
    posEcosystems.x * cosE - posEcosystems.z * sinE,
    posEcosystems.y,
    posEcosystems.x * sinE + posEcosystems.z * cosE
  );

  // Blend morph targets based on uniforms. We use 'position' as the Hero state.
  vec3 targetPos = position * uMixHero + 
                   posShowcase * uMixShowcase + 
                   posWorkflow * uMixWorkflow + 
                   rotatedEcosystems * uMixEcosystems + 
                   posEngine * uMixEngine + 
                   posPrivacy * uMixPrivacy;
                   
  // Add some universal subtle noise - floaty organic swirling
  float noiseX = sin(targetPos.y * 0.1 + uTime * 0.3);
  float noiseY = cos(targetPos.z * 0.1 + uTime * 0.3);
  float noiseZ = sin(targetPos.x * 0.1 + uTime * 0.3);
  targetPos += vec3(noiseX, noiseY, noiseZ) * 0.4;

  // Add mouse repulsion (noticeable but soft)
  float mouseDist = distance(vec2(targetPos.x, targetPos.y), vec2(uMouse.x * 30.0, -uMouse.y * 30.0));
  float gravity = max(0.0, 5.0 - mouseDist);
  targetPos.z += gravity * 0.8;

  vec4 mvPosition = modelViewMatrix * vec4(targetPos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Dynamic sizing based on depth - heavily increased for larger particles
  gl_PointSize = (250.0 * aRandom + 25.0) / -mvPosition.z;
  if (gl_PointSize < 5.0) gl_PointSize = 5.0;
  
  // Color Mixing
  float mixRatio = clamp((targetPos.y + 10.0) / 20.0, 0.0, 1.0);
  vColor = mix(uColor1, uColor2, mixRatio);
  
  // Fixed max opacity — reduced to dim the background
  vAlpha = 1.0;
}
`;

const fragmentShader = `
uniform float uOpacity;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);
  if (dist > 0.5) discard;
  
  // Create a soft glowing effect rather than a solid flat circle
  float glow = pow(1.0 - (dist * 2.0), 1.8);
  
  // Add a bright core in the very center
  float core = pow(1.0 - (dist * 2.0), 5.0);
  
  // Mix base color with a slightly brighter core
  vec3 finalColor = mix(vColor, vec3(1.0), core * 0.4);
  
  float alpha = glow * vAlpha * uOpacity;
  gl_FragColor = vec4(finalColor, alpha);
}
`;

const lineFragmentShader = `
uniform float uOpacity;
varying vec3 vColor;
varying float vAlpha;

void main() {
  // Lines don't use gl_PointCoord, we just render solid lines with alpha
  gl_FragColor = vec4(vColor, vAlpha * uOpacity);
}
`;

function MorphingParticles() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const lineMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const { resolvedTheme } = useTheme();
  const { activeSection } = useBgStore();

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 25, stiffness: 800 });

  const isDark = resolvedTheme === "dark" || resolvedTheme === undefined;

  // Reduced count for cleaner look, but larger/brighter particles
  const count = 2000;

  const geometryData = useMemo(() => {
    const posHero = new Float32Array(count * 3);
    const posShowcase = new Float32Array(count * 3);
    const posWorkflow = new Float32Array(count * 3);
    const posEcosystems = new Float32Array(count * 3);
    const posEngine = new Float32Array(count * 3);
    const posPrivacy = new Float32Array(count * 3);
    const randoms = new Float32Array(count);

    const gridW = 50;
    const gridH = 40;
    const indices = [];

    for (let y = 0; y < gridH; y++) {
      for (let x = 0; x < gridW; x++) {
        const i = y * gridW + x;
        const idx = i * 3;
        randoms[i] = Math.random();

        // Indices for WebGL LineSegments
        if (x < gridW - 1) indices.push(i, i + 1);
        if (y < gridH - 1) indices.push(i, i + gridW);

        // 1. Hero: Flowing Terrain (formerly Showcase)
        const xPosNorm = (x / (gridW - 1)) - 0.5;
        const yPosNorm = (y / (gridH - 1)) - 0.5;
        const xHero = xPosNorm * 80;
        const zHero = yPosNorm * 60;
        const yHero = Math.sin(xHero * 0.2) * 2.0 + Math.cos(zHero * 0.2) * 2.0;
        posHero[idx] = xHero;
        posHero[idx + 1] = yHero - 5.0;
        posHero[idx + 2] = zHero;

        // 2. Showcase: Branching Hierarchical AST
        const depth = y / (gridH - 1); // 0 to 1
        const radiusAST = depth * 30;
        const heightAST = 15 - depth * 30; // root at top, branching down
        const clusterAngle = Math.round((x / gridW) * (4 + depth * 8)) / (4 + depth * 8) * Math.PI * 2;
        const finalAngle = clusterAngle + (Math.random() - 0.5) * 0.3;
        posShowcase[idx] = Math.cos(finalAngle) * radiusAST + (Math.random() - 0.5) * 2;
        posShowcase[idx + 1] = heightAST + (Math.random() - 0.5) * 2;
        posShowcase[idx + 2] = Math.sin(finalAngle) * radiusAST + (Math.random() - 0.5) * 2;

        // 3. Workflow: 5 Cascading Data Clusters
        const clusterId = Math.floor((x / gridW) * 5); // 0 to 4
        const clusterX = (clusterId - 2) * 16;
        const clusterY = (2 - clusterId) * 10;
        const cRadius = 4 * Math.cbrt(Math.random());
        const cTheta = Math.random() * Math.PI * 2;
        const cPhi = Math.acos(2 * Math.random() - 1);
        posWorkflow[idx] = clusterX + cRadius * Math.sin(cPhi) * Math.cos(cTheta);
        posWorkflow[idx + 1] = clusterY + cRadius * Math.sin(cPhi) * Math.sin(cTheta);
        posWorkflow[idx + 2] = (Math.random() - 0.5) * 8 + cRadius * Math.cos(cPhi);

        // 4. Ecosystems: 1 Core + 4 Moons
        const moonId = i % 5;
        if (moonId === 0) {
          const rCore = 8 * Math.cbrt(Math.random());
          const tCore = 2 * Math.PI * Math.random();
          const pCore = Math.acos(2 * Math.random() - 1);
          posEcosystems[idx] = rCore * Math.sin(pCore) * Math.cos(tCore);
          posEcosystems[idx + 1] = rCore * Math.sin(pCore) * Math.sin(tCore);
          posEcosystems[idx + 2] = rCore * Math.cos(pCore);
        } else {
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
        posEngine[idx] = xKnot + (Math.random() - 0.5) * 3;
        posEngine[idx + 1] = yKnot + (Math.random() - 0.5) * 3;
        posEngine[idx + 2] = zKnot + (Math.random() - 0.5) * 3;

        // 6. Privacy: Structured Tech Shield
        const layer = Math.floor(Math.random() * 3);
        const scale = 1.0 - layer * 0.25;
        let pXPos = (Math.random() - 0.5) * 2.0;
        let yNorm = Math.random();
        const mode = Math.random();
        if (mode < 0.4) yNorm = Math.round(yNorm * 12) / 12;
        else if (mode < 0.8) pXPos = Math.round(pXPos * 12) / 12;
        const y_top = (12 + 2 * Math.cos(pXPos * Math.PI / 2)) * scale;
        const y_bottom = (-16 + 28 * Math.pow(Math.abs(pXPos), 1.5)) * scale;
        const px = pXPos * 20 * scale;
        const py = y_bottom + yNorm * (y_top - y_bottom);
        const pz = (8 - 15 * (pXPos * pXPos) - yNorm * 5) - layer * 15;
        posPrivacy[idx] = px;
        posPrivacy[idx + 1] = py + 2;
        posPrivacy[idx + 2] = pz + (Math.random() - 0.5) * 1.5;
      }
    }

    return { posHero, posShowcase, posWorkflow, posEcosystems, posEngine, posPrivacy, randoms, indices: new Uint16Array(indices) };
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
    uMixPrivacy: { value: 0.0 },
    uScrollVelocity: { value: 0.0 },
    uOpacity: { value: 1.0 }
  }), []);

  const lineUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor1: { value: new THREE.Color("#ff6b00") },
    uColor2: { value: new THREE.Color("#00f0ff") },
    uMixHero: { value: 1.0 },
    uMixShowcase: { value: 0.0 },
    uMixWorkflow: { value: 0.0 },
    uMixEcosystems: { value: 0.0 },
    uMixEngine: { value: 0.0 },
    uMixPrivacy: { value: 0.0 },
    uScrollVelocity: { value: 0.0 },
    uOpacity: { value: 0.15 } // Lower opacity for interconnected lines
  }), []);

  useEffect(() => {
    if (materialRef.current && lineMaterialRef.current) {
      materialRef.current.uniforms.uColor1.value.set(isDark ? "#ff6b00" : "#e65100");
      materialRef.current.uniforms.uColor2.value.set(isDark ? "#00f0ff" : "#00bcd4");
      lineMaterialRef.current.uniforms.uColor1.value.set(isDark ? "#ff6b00" : "#e65100");
      lineMaterialRef.current.uniforms.uColor2.value.set(isDark ? "#00f0ff" : "#00bcd4");
    }
  }, [isDark]);

  useFrame((state, delta) => {
    if (!materialRef.current || !lineMaterialRef.current) return;

    const time = state.clock.getElapsedTime();
    const u = materialRef.current.uniforms;
    const lu = lineMaterialRef.current.uniforms;

    u.uTime.value = time;
    lu.uTime.value = time;
    u.uMouse.value.set(state.pointer.x, state.pointer.y);
    lu.uMouse.value.set(state.pointer.x, state.pointer.y);
    u.uScrollVelocity.value = smoothVelocity.get();
    lu.uScrollVelocity.value = smoothVelocity.get();

    const targetMix = {
      hero: activeSection === "hero" || activeSection === "marquee" || activeSection === "download" || activeSection === "" ? 1 : 0,
      showcase: activeSection === "showcase" ? 1 : 0,
      workflow: activeSection === "workflow" ? 1 : 0,
      ecosystems: activeSection === "ecosystems" ? 1 : 0,
      engine: activeSection === "engine" ? 1 : 0,
      privacy: activeSection === "privacy" ? 1 : 0,
    };

    const rate = delta * 4.0;
    const updateMix = (uniformsObj: any, key: string, target: number) => {
      uniformsObj[key].value += (target - uniformsObj[key].value) * rate;
    };

    updateMix(u, "uMixHero", targetMix.hero);
    updateMix(u, "uMixShowcase", targetMix.showcase);
    updateMix(u, "uMixWorkflow", targetMix.workflow);
    updateMix(u, "uMixEcosystems", targetMix.ecosystems);
    updateMix(u, "uMixEngine", targetMix.engine);
    updateMix(u, "uMixPrivacy", targetMix.privacy);

    updateMix(lu, "uMixHero", targetMix.hero);
    updateMix(lu, "uMixShowcase", targetMix.showcase);
    updateMix(lu, "uMixWorkflow", targetMix.workflow);
    updateMix(lu, "uMixEcosystems", targetMix.ecosystems);
    updateMix(lu, "uMixEngine", targetMix.engine);
    updateMix(lu, "uMixPrivacy", targetMix.privacy);

    // Fade out lines smoothly when not in hero section
    lu.uOpacity.value = 0.15 * lu.uMixHero.value;

    // Cinematic camera rotation (calmed down)
    state.camera.position.x = Math.sin(time * 0.02) * 2;
    state.camera.position.z = Math.cos(time * 0.02) * 2 + 30;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <points frustumCulled={false}>
        <bufferGeometry>
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
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="index" array={geometryData.indices} count={geometryData.indices.length} itemSize={1} args={[geometryData.indices, 1]} />
          <bufferAttribute attach="attributes-position" count={count} array={geometryData.posHero} itemSize={3} args={[geometryData.posHero, 3]} />
          <bufferAttribute attach="attributes-posShowcase" count={count} array={geometryData.posShowcase} itemSize={3} args={[geometryData.posShowcase, 3]} />
          <bufferAttribute attach="attributes-posWorkflow" count={count} array={geometryData.posWorkflow} itemSize={3} args={[geometryData.posWorkflow, 3]} />
          <bufferAttribute attach="attributes-posEcosystems" count={count} array={geometryData.posEcosystems} itemSize={3} args={[geometryData.posEcosystems, 3]} />
          <bufferAttribute attach="attributes-posEngine" count={count} array={geometryData.posEngine} itemSize={3} args={[geometryData.posEngine, 3]} />
          <bufferAttribute attach="attributes-posPrivacy" count={count} array={geometryData.posPrivacy} itemSize={3} args={[geometryData.posPrivacy, 3]} />
          <bufferAttribute attach="attributes-aRandom" count={count} array={geometryData.randoms} itemSize={1} args={[geometryData.randoms, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={lineMaterialRef}
          vertexShader={vertexShader}
          fragmentShader={lineFragmentShader}
          uniforms={lineUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}

export function Global3DBackground() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || resolvedTheme === undefined;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.5) : 1}
        camera={{ position: [0, 0, 50], fov: 60, near: 0.1, far: 200 }}
        style={{ background: "transparent" }}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <MorphingParticles />
        <EffectComposer>
          {/* Lowered threshold to catch more particles, reduced intensity to dim the background */}
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.5} height={1200} intensity={isDark ? 3.0 : 2.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}