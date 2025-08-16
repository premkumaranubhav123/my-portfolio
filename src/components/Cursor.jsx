// src/components/Cursor.jsx
import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CursorContext } from '../context/CursorContext';

const CursorDot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(100, 255, 218, 1);
  pointer-events: none;
  transform: translate(-50%, -50%);
  mix-blend-mode: normal;
  transition: background 0.15s ease, width 0.15s ease, height 0.15s ease, opacity 0.2s;
  z-index: 9999;
`;

const CursorRing = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  box-shadow: 0 10px 30px rgba(100,255,218,0.12);
  backdrop-filter: blur(4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 9998;
`;

export default function CustomCursor() {
  const { cursorType } = useContext(CursorContext);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // target position
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const smooth = useRef({ x: pos.current.x, y: pos.current.y });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      // show immediately for pointer events when first moved
      if (dotRef.current) dotRef.current.style.opacity = 1;
      if (ringRef.current) ringRef.current.style.opacity = 1;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('pointermove', onMove);

    // hide when leaving window
    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('blur', onLeave);

    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const render = () => {
      // smooth follow
      smooth.current.x = lerp(smooth.current.x, pos.current.x, 0.18);
      smooth.current.y = lerp(smooth.current.y, pos.current.y, 0.18);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${smooth.current.x}px, ${smooth.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        // ring lags slightly more for trailing feel
        const ringX = lerp((ringRef.current._x || smooth.current.x), pos.current.x, 0.12);
        const ringY = lerp((ringRef.current._y || smooth.current.y), pos.current.y, 0.12);
        ringRef.current._x = ringX;
        ringRef.current._y = ringY;
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Update style when cursor type changes
  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;

    if (cursorType === 'hovered') {
      dotRef.current.style.width = '34px';
      dotRef.current.style.height = '34px';
      dotRef.current.style.background = 'rgba(100,255,218,0.95)';
      dotRef.current.style.mixBlendMode = 'normal';
      ringRef.current.style.width = '70px';
      ringRef.current.style.height = '70px';
      ringRef.current.style.opacity = '0.18';
    } else if (cursorType === 'hidden') {
      dotRef.current.style.opacity = '0';
      ringRef.current.style.opacity = '0';
    } else {
      // default
      dotRef.current.style.width = '14px';
      dotRef.current.style.height = '14px';
      dotRef.current.style.background = 'rgba(100,255,218,1)';
      dotRef.current.style.mixBlendMode = 'normal';
      ringRef.current.style.width = '44px';
      ringRef.current.style.height = '44px';
      ringRef.current.style.opacity = '1';
    }
  }, [cursorType]);

  return (
    <>
      <CursorRing ref={ringRef} style={{ opacity: 0 }} />
      <CursorDot ref={dotRef} style={{ opacity: 0 }} />
    </>
  );
}
