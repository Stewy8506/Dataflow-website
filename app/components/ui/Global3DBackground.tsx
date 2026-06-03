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

uniform float uMixHero;
uniform float uMixShowcase;
uniform float uMixWorkflow;
uniform float uMixEcosystems;
uniform float uMixEngine;
uniform float uMixPrivacy;
uniform float uMixDownload;

uniform vec3 uColor1;
uniform vec3 uColor2;

uniform float uScrollVelocity;

// WebGL automatically defines 'attribute vec3 position;'
attribute vec3 posShowcase;
attribute vec3 posWorkflow;
attribute vec3 posEcosystems;
attribute vec3 posEngine;
attribute vec3 posPrivacy;
attribute vec3 posDownload;
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

  // Rotate Showcase layout (Data Core)
  float showcaseAngle = uTime * 0.2;
  float cosS = cos(showcaseAngle);
  float sinS = sin(showcaseAngle);
  vec3 rotatedShowcase = vec3(
    posShowcase.x * cosS - posShowcase.z * sinS,
    posShowcase.y,
    posShowcase.x * sinS + posShowcase.z * cosS
  );

  // Rotate Workflow layout for continuous dynamic flowing/drilling motion
  float workflowAngle = uTime * 0.8;
  float cosW = cos(workflowAngle);
  float sinW = sin(workflowAngle);
  vec3 rotatedWorkflow = vec3(
    posWorkflow.x * cosW - posWorkflow.z * sinW,
    posWorkflow.y,
    posWorkflow.x * sinW + posWorkflow.z * cosW
  );

  // Rotate Download galaxy spiral slowly
  float galAngle = uTime * 0.3;
  float cosG = cos(galAngle);
  float sinG = sin(galAngle);
  vec3 rotatedDownload = vec3(
    posDownload.x * cosG - posDownload.z * sinG,
    posDownload.y,
    posDownload.x * sinG + posDownload.z * cosG
  );

  // Rotate Engine knot dynamically on multiple axes (gyroscope effect)
  float engineAngle1 = uTime * 0.5;
  float engineAngle2 = uTime * 0.3;
  float cosE1 = cos(engineAngle1), sinE1 = sin(engineAngle1);
  float cosE2 = cos(engineAngle2), sinE2 = sin(engineAngle2);
  vec3 rotEngY = vec3(
    posEngine.x * cosE1 - posEngine.z * sinE1,
    posEngine.y,
    posEngine.x * sinE1 + posEngine.z * cosE1
  );
  vec3 rotatedEngine = vec3(
    rotEngY.x,
    rotEngY.y * cosE2 - rotEngY.z * sinE2,
    rotEngY.y * sinE2 + rotEngY.z * cosE2
  );

  // 1. Dynamic Hero Terrain: Rolling Waves
  vec3 dynamicHero = position;
  
  // Smooth, gentle rolling hills without velocity surging
  // Increased temporal displacement frequency (1.2 and 2.0) for faster undulation
  float waveY = sin(dynamicHero.x * 0.10 + uTime * 1.2) * 1.5 + 
                cos(dynamicHero.z * 0.10 + uTime * 2.0) * 1.5;
                
  dynamicHero.y = -8.0 + waveY;

  // Blend morph targets smoothly
  vec3 targetPos = dynamicHero * uMixHero + 
                   rotatedShowcase * uMixShowcase + 
                   rotatedWorkflow * uMixWorkflow + 
                   rotatedEcosystems * uMixEcosystems + 
                   rotatedEngine * uMixEngine + 
                   posPrivacy * uMixPrivacy +
                   rotatedDownload * uMixDownload;
  
  // Add some universal subtle noise - floaty organic swirling
  float noiseX = sin(targetPos.y * 0.1 + uTime * 0.3);
  float noiseY = cos(targetPos.z * 0.1 + uTime * 0.3);
  float noiseZ = sin(targetPos.x * 0.1 + uTime * 0.3);
  targetPos += vec3(noiseX, noiseY, noiseZ) * 0.4;

  vec4 mvPosition = modelViewMatrix * vec4(targetPos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Dynamic sizing based on depth - heavily increased for larger particles
  gl_PointSize = (250.0 * aRandom + 25.0) / -mvPosition.z;
  if (gl_PointSize < 5.0) gl_PointSize = 5.0;
  
  // Color Mixing
  float mixRatio = clamp((targetPos.y + 10.0) / 20.0, 0.0, 1.0);
  vColor = mix(uColor1, uColor2, mixRatio);
  
  // Fade out edges smoothly (only affects the massive Hero terrain)
  float distFromCenter = length(targetPos.xz);
  vAlpha = 1.0 - smoothstep(40.0, 110.0, distFromCenter);
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
    const posDownload = new Float32Array(count * 3);
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

        // 1. Hero: Flowing Terrain (Expanded Rectangular Grid)
        const xPosNorm = (x / (gridW - 1)) - 0.5;
        const yPosNorm = (y / (gridH - 1)) - 0.5;

        // Vastly scale up the grid to cover more screen area
        const xHero = xPosNorm * 180.0;
        const zHero = yPosNorm * 140.0;

        // Initial wave condition matching the shader (uTime = 0)
        const yHero = Math.sin(xHero * 0.10) * 1.5 + Math.cos(zHero * 0.10) * 1.5;

        posHero[idx] = xHero;
        posHero[idx + 1] = yHero - 8.0;
        posHero[idx + 2] = zHero;

        // 2. Showcase: Structured Architectural Data Core
        const lat = (y / (gridH - 1)) * Math.PI - Math.PI / 2; // -pi/2 to pi/2
        const lon = (x / (gridW - 1)) * Math.PI * 2; // 0 to 2pi
        // Create structured geometric rings
        const ring = Math.floor(y / 4) % 2 === 0 ? 1 : 0.9;
        const globeRadius = 26 * ring;

        posShowcase[idx] = Math.cos(lat) * Math.cos(lon) * globeRadius;
        posShowcase[idx + 1] = Math.sin(lat) * globeRadius;
        posShowcase[idx + 2] = Math.cos(lat) * Math.sin(lon) * globeRadius;

        // 3. Workflow: Swirling Double Helix (Dynamic & Continuous)
        const t = i / count;
        const workflowY = (t - 0.5) * 120; // Spread vertically
        const angleHelix = t * Math.PI * 12; // 6 full twists
        const radiusHelix = 14 + Math.sin(t * Math.PI) * 4; // Bulges in the center
        const strand = i % 2 === 0 ? 1 : -1;
        posWorkflow[idx] = Math.cos(angleHelix) * radiusHelix * strand + (Math.random() - 0.5) * 3;
        posWorkflow[idx + 1] = workflowY;
        posWorkflow[idx + 2] = Math.sin(angleHelix) * radiusHelix * strand + (Math.random() - 0.5) * 3;

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

        // 5. Engine: Interlocking Torus Knot (Structured Wireframe)
        const pKnot = 3; // Number of winds around the circle
        const qKnot = 2; // Number of winds through the hole (Trefoil knot)
        const uNode = (x / (gridW - 1)) * Math.PI * 2;
        const vNode = (y / (gridH - 1)) * Math.PI * 2;

        const knotR = 14.0;
        const tubeR = 5.0;
        const thickness = 2.0; // Thickness of the wireframe tube

        const pathR = knotR + tubeR * Math.cos(qKnot * uNode);

        const pxEng = (pathR + thickness * Math.cos(vNode)) * Math.cos(pKnot * uNode);
        const pyEng = (pathR + thickness * Math.cos(vNode)) * Math.sin(pKnot * uNode);
        const pzEng = tubeR * Math.sin(qKnot * uNode) + thickness * Math.sin(vNode);

        posEngine[idx] = pxEng;
        posEngine[idx + 1] = pyEng;
        posEngine[idx + 2] = pzEng;

        // 6. Privacy: True Classic Shield
        const uShield = x / (gridW - 1);
        const vShield = y / (gridH - 1);
        const sx = (uShield - 0.5) * 2.0; // -1 to 1

        // Classic shield width: drops vertically at the top, sweeps into a sharp bottom point
        const widthCurve = 1.0 - Math.pow(1.0 - vShield, 2.5);
        const shieldWidth = widthCurve * 15.0;

        const pxPriv = sx * shieldWidth;

        // Height: V-shaped top edge peaking in the center, straight dropping sides
        const baseHeight = -16.0 + (vShield * 26.0); // Bottom at -16, top corners at +10
        const peakHeight = (1.0 - Math.abs(sx)) * 6.0; // Center peak rises to +16
        const pyPriv = baseHeight + (vShield * peakHeight);

        // 3D structure: heroic sharp ridge down the center spine
        const pzPriv = (1.0 - Math.abs(sx)) * Math.sin(vShield * Math.PI) * 4.0;

        posPrivacy[idx] = pxPriv;
        posPrivacy[idx + 1] = pyPriv + 2.0; // Center visually above cards
        posPrivacy[idx + 2] = pzPriv;

        // 7. Download: Galaxy Spiral
        const rGal = Math.random() * 40;
        const arms = 3;
        const armOffset = Math.floor(Math.random() * arms) * (Math.PI * 2 / arms);
        const thetaGal = rGal * 0.3 + armOffset + (Math.random() - 0.5) * 0.4;
        posDownload[idx] = Math.cos(thetaGal) * rGal;
        posDownload[idx + 1] = (Math.random() - 0.5) * 6 * (1 - rGal / 40); // flatter at the edges
        posDownload[idx + 2] = Math.sin(thetaGal) * rGal;
      }
    }

    return { posHero, posShowcase, posWorkflow, posEcosystems, posEngine, posPrivacy, posDownload, randoms, indices: new Uint16Array(indices) };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0.0 },
    uColor1: { value: new THREE.Color(isDark ? "#ff6b00" : "#e65100") },
    uColor2: { value: new THREE.Color(isDark ? "#00f0ff" : "#00bcd4") },
    uMixHero: { value: 1.0 },
    uMixShowcase: { value: 0.0 },
    uMixWorkflow: { value: 0.0 },
    uMixEcosystems: { value: 0.0 },
    uMixEngine: { value: 0.0 },
    uMixPrivacy: { value: 0.0 },
    uMixDownload: { value: 0.0 },
    uScrollVelocity: { value: 0.0 },
    uOpacity: { value: 1.0 }
  }), [isDark]);

  const lineUniforms = useMemo(() => ({
    uTime: { value: 0.0 },
    uColor1: { value: new THREE.Color(isDark ? "#ff6b00" : "#e65100") },
    uColor2: { value: new THREE.Color(isDark ? "#00f0ff" : "#00bcd4") },
    uMixHero: { value: 1.0 },
    uMixShowcase: { value: 0.0 },
    uMixWorkflow: { value: 0.0 },
    uMixEcosystems: { value: 0.0 },
    uMixEngine: { value: 0.0 },
    uMixPrivacy: { value: 0.0 },
    uMixDownload: { value: 0.0 },
    uScrollVelocity: { value: 0.0 },
    uOpacity: { value: 0.15 } // Lower opacity for interconnected lines
  }), [isDark]);

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
    u.uScrollVelocity.value = smoothVelocity.get();
    lu.uScrollVelocity.value = smoothVelocity.get();

    const targetMix = {
      hero: activeSection === "hero" || activeSection === "marquee" || activeSection === "" ? 1 : 0,
      showcase: activeSection === "showcase" ? 1 : 0,
      workflow: activeSection === "workflow" ? 1 : 0,
      ecosystems: activeSection === "ecosystems" ? 1 : 0,
      engine: activeSection === "engine" ? 1 : 0,
      privacy: activeSection === "privacy" ? 1 : 0,
      download: activeSection === "download" ? 1 : 0,
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
    updateMix(u, "uMixDownload", targetMix.download);

    updateMix(lu, "uMixHero", targetMix.hero);
    updateMix(lu, "uMixShowcase", targetMix.showcase);
    updateMix(lu, "uMixWorkflow", targetMix.workflow);
    updateMix(lu, "uMixEcosystems", targetMix.ecosystems);
    updateMix(lu, "uMixEngine", targetMix.engine);
    updateMix(lu, "uMixPrivacy", targetMix.privacy);
    updateMix(lu, "uMixDownload", targetMix.download);

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
          <bufferAttribute attach="attributes-posDownload" count={count} array={geometryData.posDownload} itemSize={3} args={[geometryData.posDownload, 3]} />
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
          <bufferAttribute attach="attributes-posDownload" count={count} array={geometryData.posDownload} itemSize={3} args={[geometryData.posDownload, 3]} />
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