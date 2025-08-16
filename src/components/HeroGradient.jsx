// src/components/HeroGradient.jsx
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function HeroGradient({ children }) {
  const gradientRef = useRef();

  useEffect(() => {
    let hue = 0;
    const interval = setInterval(() => {
      hue = (hue + 0.2) % 360;
      if (gradientRef.current) {
        gradientRef.current.style.background = `linear-gradient(135deg, hsl(${hue}, 60%, 50%), hsl(${(hue + 60) % 360}, 60%, 50%), hsl(${(hue + 120) % 360}, 60%, 50%))`;
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={gradientRef}
      className="relative min-h-screen flex items-center justify-center px-8 md:px-20 text-white"
      style={{
        background: 'linear-gradient(135deg, #6b73ff, #000dff, #00d4ff)',
        transition: 'background 0.1s linear',
      }}
    >
      {children}
    </section>
  );
}
