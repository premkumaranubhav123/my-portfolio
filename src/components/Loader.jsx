// src/components/Loader.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo {
    width: 80px;
    height: 80px;
    border-radius: 9999px;
    border: 3px solid var(--green);
    display: grid;
    place-items: center;
    font-family: var(--font-mono);
    color: var(--green);
    animation: pulse 1.2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(0.92); opacity: 0.8; }
  }
`;

const Loader = ({ finishLoading, delay = 1200 }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => finishLoading?.(), delay);
    return () => clearTimeout(t);
  }, [delay, finishLoading]);

  return (
    <StyledLoader aria-hidden={!mounted}>
      <div className="logo">•</div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
  delay: PropTypes.number,
};

export default Loader;
