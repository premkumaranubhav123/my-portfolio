// src/components/MagneticButton.jsx
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const MagneticButton = ({ children, href = '#', className = '' }) => {
  const wrapRef = useRef(null);

  const onMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    // small translation
    el.style.transform = `translate(${relX * 0.08}px, ${relY * 0.08}px)`;
  };

  const onLeave = () => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.transform = 'translate(0,0)';
  };

  return (
    <a
      href={href}
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`px-5 py-2 rounded bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white transition inline-block ${className}`}
      data-cursor="hover"
    >
      {children}
    </a>
  );
};

MagneticButton.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
};

export default MagneticButton;
