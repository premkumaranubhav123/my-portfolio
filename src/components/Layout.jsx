// src/components/Layout.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Nav, Social, Email, Footer, Loader } from './index';
import { GlobalStyle, theme } from '../styles';
import { siteData } from '../data';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children }) => {
  const isHome = true; // single-page app
  const [isLoading, setIsLoading] = useState(false); // set true to show loader

  // Ensure external links open safely
  useEffect(() => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    allLinks.forEach(link => {
      try {
        if (link.host && link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      } catch {}
    });
  }, []);

  // If the page opened with a hash, scroll to it
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const id = hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          el.focus?.();
        }
      }, 0);
    }
  }, []);

  const socialMedia = [
    { name: 'GitHub', url: siteData?.social?.github },
    { name: 'LinkedIn', url: siteData?.social?.linkedin },
    { name: 'Email', url: `mailto:${siteData?.social?.email}` },
  ].filter(Boolean);

  return (
    <>
      <Head title={`${siteData.name} • ${siteData.role}`} description={siteData.shortBio} />
      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <a className="skip-to-content" href="#content">Skip to Content</a>

          {isLoading ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <StyledContent>
              <Nav
                isHome={isHome}
                navLinks={[
                  { url: '#projects', name: 'Projects' },
                  { url: '#about', name: 'About' },
                  { url: '#contact', name: 'Contact' },
                ]}
                resumeUrl={siteData.resume}
              />

              {/* Horizontal social & email section */}
              <div className="flex justify-center items-center mt-4 gap-6">
                <Social isHome={isHome} socialMedia={socialMedia} />
              </div>

              <div id="content">
                {children}
                <Footer author={siteData.name} repoUrl={siteData.repo} />
              </div>
            </StyledContent>
          )}
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
