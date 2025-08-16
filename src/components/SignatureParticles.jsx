// src/components/SignatureParticles.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

/**
 * SignatureParticles
 * - Watches clicks on the target element. On 1st trigger, runs stroke animation (SVG).
 * - On completion it emits a small particle burst (confetti).
 */

export default function SignatureParticles({ targetId = 'signature-name' }) {
  const [triggered, setTriggered] = useState(false);
  const clicksRef = useRef(0);
  const svgRef = useRef(null);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const handler = () => {
      clicksRef.current += 1;
      // immediate single-trigger animation on 1 click; 5 clicks -> extra easter egg
      if (!triggered) {
        setTriggered(true);
        // small confetti burst
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#64ffda', '#5eead4', '#a78bfa'],
        });
      } else if (clicksRef.current === 5) {
        // easter egg bigger confetti
        confetti({
          particleCount: 220,
          spread: 160,
          scalar: 1.2,
          colors: ['#64ffda', '#fef3c7', '#a78bfa', '#60a5fa'],
        });
      }
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }, [targetId, triggered]);

  // render an SVG stroke that animates when triggered
  return (
    <>
      {triggered && (
        <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.svg
            ref={svgRef}
            width="560"
            height="120"
            viewBox="0 0 560 120"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.path
              d="M20 80 C120 -10 220 150 320 60 C420 -20 520 100 540 80"
              fill="transparent"
              stroke="#64ffda"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1000"
              strokeDashoffset={1000}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />
          </motion.svg>
        </div>
      )}
    </>
  );
}
