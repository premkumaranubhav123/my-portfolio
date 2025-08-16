// src/components/Hero3D.jsx
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ mouse }) {
  const ref = useRef();
  const sphere = React.useMemo(() => {
    const points = [];
    for (let i = 0; i < 5000; i++) {
      const phi = Math.acos(-1 + (2 * i) / 5000);
      const theta = Math.sqrt(5000 * Math.PI) * phi;
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);
      points.push(x, y, z);
    }
    return new Float32Array(points);
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0005;
      ref.current.rotation.x += 0.0003;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.015}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Hero3D() {
  const mouse = useRef([0, 0]);
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    >
      <Particles mouse={mouse} />
    </Canvas>
  );
}
