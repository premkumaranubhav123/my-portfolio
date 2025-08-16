// src/components/Nav.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Menu from './Menu';


const useScrollDirection = (initial = 'down') => {
  const [direction, setDirection] = useState(initial);
  useEffect(() => {
    let lastY = window.pageYOffset;
    const onScroll = () => {
      const y = window.pageYOffset;
      if (Math.abs(y - lastY) < 5) return;
      setDirection(y > lastY ? 'down' : 'up');
      lastY = y;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return direction;
};

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  transition: var(--transition);

  @media (max-width: 1080px) { padding: 0 40px; }
  @media (max-width: 768px) { padding: 0 25px; }

  @media (prefers-reduced-motion: no-preference) {
    ${({ $scrollDirection }) =>
      $scrollDirection === 'up' &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: rgba(10, 25, 47, 0.85);
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};

    ${({ $scrollDirection }) =>
      $scrollDirection === 'down' &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  z-index: 12;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};
    a {
      color: var(--green);
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border: 2px solid var(--green);
      border-radius: 8px;
      font-weight: 700;
      user-select: none;
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) { display: none; }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: var(--fz-xs);

      a {
        ${({ theme }) => theme.mixins.link};
        padding: 10px;
        &:before {
          content: '0' counter(item) '.';
          margin-right: 5px;
          color: var(--green);
          font-size: var(--fz-xxs);
          text-align: right;
        }
      }

      &.active a {
        color: var(--green);
        &:after {
          content: '';
          position: absolute;
          height: 2px;
          left: 0;
          right: 0;
          bottom: -4px;
          background: var(--green);
          border-radius: 2px;
        }
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-xs);
  }
`;

const Nav = ({ isHome, resumeUrl }) => {
  const scrollDirection = useScrollDirection('down');
  const [activeId, setActiveId] = useState('#');

  const navLinks = [
    { url: '#experience', name: 'Experience' },
    { url: '#projects', name: 'Projects' },
    { url: '#about', name: 'About' },
    { url: '#contact', name: 'Contact' },
  ];

  // scroll spy -> update activeId
  useEffect(() => {
    const ids = navLinks.map((l) => l.url.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(`#${entry.target.id}`);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -30% 0px', threshold: 0.15 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // observe top of page
    const hero = document.querySelector('main > section');
    if (hero) observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <StyledHeader $scrollDirection={scrollDirection}>
      <StyledNav>
        <div className="logo" tabIndex="-1">
          <a href="/" aria-label="home">∴</a>
        </div>

        <StyledLinks>
          <ol>
            {navLinks.map(({ url, name }, i) => (
              <li key={i} className={activeId === url ? 'active' : ''}>
                <a href={url}>{name}</a>
              </li>
            ))}
          </ol>
          {resumeUrl && (
            <div>
              <a className="resume-button" href={resumeUrl} target="_blank" rel="noreferrer">Resume</a>
            </div>
          )}
        </StyledLinks>

        <Menu navLinks={navLinks} resumeUrl={resumeUrl} />
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
  resumeUrl: PropTypes.string,
};

export default Nav;
