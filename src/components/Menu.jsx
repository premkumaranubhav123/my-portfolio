import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// Styled components with transient prop ($menuOpen)
const StyledMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledHamburgerButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter};
    position: relative;
    z-index: 10;
    margin-right: -15px;
    padding: 15px;
    border: 0;
    background-color: transparent;
    color: inherit;
  }

  .ham-box {
    position: relative;
    width: var(--hamburger-width);
    height: 24px;
  }

  .ham-box-inner {
    position: absolute;
    top: 50%;
    right: 0;
    width: var(--hamburger-width);
    height: 2px;
    border-radius: var(--border-radius);
    background-color: var(--green);
    transform: rotate(${p => (p.$menuOpen ? '225deg' : '0deg')});
    transition: 0.22s transform;

    &:before,
    &:after {
      content: '';
      position: absolute;
      right: 0;
      height: 2px;
      background-color: var(--green);
      width: 100%;
    }

    &:before {
      top: ${p => (p.$menuOpen ? '0' : '-10px')};
      opacity: ${p => (p.$menuOpen ? 0 : 1)};
      transition: 0.2s;
    }

    &:after {
      bottom: ${p => (p.$menuOpen ? '0' : '-10px')};
      transform: rotate(${p => (p.$menuOpen ? '-90deg' : '0deg')});
      transition: 0.2s;
    }
  }
`;

const StyledSidebar = styled.aside`
  display: none;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter};
    position: fixed;
    inset: 0 0 0 auto;
    padding: 50px 10px;
    width: min(75vw, 400px);
    height: 100vh;
    outline: 0;
    background-color: var(--light-navy);
    box-shadow: -10px 0px 30px -15px var(--navy-shadow);
    z-index: 9;
    transform: translateX(${p => (p.$menuOpen ? '0' : '100')}vw);
    visibility: ${p => (p.$menuOpen ? 'visible' : 'hidden')};
    transition: var(--transition);
  }

  nav {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    flex-direction: column;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    text-align: center;
  }

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;

    li {
      position: relative;
      margin: 0 auto 20px;
      counter-increment: item 1;
      font-size: clamp(var(--fz-sm), 4vw, var(--fz-lg));

      &:before {
        content: '0' counter(item) '.';
        display: block;
        margin-bottom: 5px;
        color: var(--green);
        font-size: var(--fz-sm);
      }
    }

    a {
      ${({ theme }) => theme.mixins.link};
      width: 100%;
      padding: 3px 20px 20px;
    }
  }

  .resume-link {
    ${({ theme }) => theme.mixins.bigButton};
    padding: 18px 50px;
    margin: 10% auto 0;
    width: max-content;
  }
`;

const KEY = { ESC: 'Escape', TAB: 'Tab' };

const Menu = ({ navLinks, resumeUrl }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const navRef = useRef(null);

  // Outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuOpen && wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  // Keyboard nav + ESC close
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === KEY.ESC) setMenuOpen(false);
      if (e.key === KEY.TAB && navRef.current) {
        const focusables = [buttonRef.current, ...Array.from(navRef.current.querySelectorAll('a'))];
        if (focusables.length < 2) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Hide menu when resizing above tablet
  useEffect(() => {
    const onResize = (e) => { if (e.currentTarget.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <StyledMenu>
      <div ref={wrapperRef}>
        <StyledHamburgerButton
          onClick={() => setMenuOpen(!menuOpen)}
          $menuOpen={menuOpen}  // ✅ transient prop to avoid React warning
          ref={buttonRef}
          aria-label="Menu"
        >
          <div className="ham-box"><div className="ham-box-inner" /></div>
        </StyledHamburgerButton>

        <StyledSidebar $menuOpen={menuOpen} aria-hidden={!menuOpen} tabIndex={menuOpen ? 1 : -1}>
          <nav ref={navRef}>
            {navLinks && (
              <ol>
                {navLinks.map(({ url, name }, i) => (
                  <li key={i}>
                    <a href={url} onClick={() => setMenuOpen(false)}>{name}</a>
                  </li>
                ))}
              </ol>
            )}
            {resumeUrl && (
              <a href={resumeUrl} className="resume-link" target="_blank" rel="noreferrer">Resume</a>
            )}
          </nav>
        </StyledSidebar>
      </div>
    </StyledMenu>
  );
};

export default Menu;
