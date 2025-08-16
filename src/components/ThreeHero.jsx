// src/components/ThreeHero.jsx
import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import SignatureParticles from './SignatureParticles';

/**
 * ParticleField component — simple performant point cloud that reacts to mouse
 */
function ParticleField({ mouse }) {
  const pointsRef = useRef();
  // generate points positions
  const positions = useMemo(() => {
    const amt = 800;
    const arr = new Float32Array(amt * 3);
    for (let i = 0; i < amt; i++) {
      const i3 = i * 3;
      arr[i3 + 0] = (Math.random() - 0.5) * 12; // x
      arr[i3 + 1] = (Math.random() - 0.5) * 6;  // y
      arr[i3 + 2] = (Math.random() - 0.5) * 8;  // z
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.2;
    // small bobbing + mouse follow
    const mx = (mouse.current.x / state.viewport.width - 0.5) * 2;
    const my = (mouse.current.y / state.viewport.height - 0.5) * -2;
    const positions = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < positions.length / 3; i++) {
      const i3 = i * 3;
      positions[i3 + 1] = positions[i3 + 1] + Math.sin(t + i * 0.01) * 0.002;
      // subtle attraction to mouse (not too strong)
      positions[i3 + 0] += (mx * 0.02 - positions[i3 + 0] * 0.0002);
      positions[i3 + 2] += (my * 0.02 - positions[i3 + 2] * 0.0002);
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = Math.sin(t * 0.2) * 0.02;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial size={0.06} sizeAttenuation color="#64ffda" />
    </Points>
  );
}

export default function ThreeHero({ name, shortBio, github, linkedin, email }) {
  const mouse = React.useRef({ x: 0, y: 0 });
  const onPointerMove = (e) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
  };

  return (
    <section onPointerMove={onPointerMove} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Canvas Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 4, 5]} intensity={0.6} />
          <Suspense fallback={null}>
            <ParticleField mouse={mouse} />
          </Suspense>
          {/* no controls by default, but keep for dev (disabled) */}
          <OrbitControls enabled={false} />
        </Canvas>
      </div>

      {/* Foreground content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="grid md:grid-cols-2 gap-8 items-center py-20 min-h-screen px-8 md:px-20">
          <div className="space-y-6">
            {/* name with easter-egg hook */}
            <h1 id="signature-name" className="text-5xl md:text-6xl font-bold" style={{ cursor: 'pointer' }}>
              {name}
            </h1>
            <p className="text-lg md:text-xl">{shortBio}</p>

            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="px-5 py-2 border border-white rounded hover:bg-white hover:text-indigo-600 transition" data-cursor="hover">GitHub</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="px-5 py-2 border border-white rounded hover:bg-white hover:text-indigo-600 transition" data-cursor="hover">LinkedIn</a>
              <a href={`mailto:${email}`} className="px-5 py-2 rounded bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white transition" data-cursor="hover">Say hello</a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-xl shadow-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-indigo-600 font-bold text-xl">Your Photo</div>
          </div>
        </div>
      </div>

      {/* Signature SVG + particles overlay (hidden until triggered) */}
      <SignatureParticles targetId="signature-name" />
    </section>
  );
}
