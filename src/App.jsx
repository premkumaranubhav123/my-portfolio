import React, { useEffect, useState, useRef } from 'react';
import { siteData } from './data';
import CustomCursor from './components/Cursor';
import { CursorProvider } from './context/CursorContext';
import Layout from './components/Layout';
import Nav from './components/Nav';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import { motion } from 'framer-motion';
import styled, { css, createGlobalStyle } from 'styled-components';
import mixins from './styles/mixins';
import HeroGradient from './components/HeroGradient';
import ProjectCard from './components/ProjectCard';

// Styled link using updated "link" mixin
const StyledLink = styled.a`
  ${mixins.link};
  padding: 0.5rem 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;

/* Extra global styles for animations and small helpers used only in this file */
const ExtraStyles = createGlobalStyle`
  /* ---------- Animated gradient for hero ---------- */
  .hero-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .hero-gradient {
    position: absolute; inset: 0; z-index: 0;
    background: radial-gradient(circle at 10% 20%, rgba(56,189,248,0.12), transparent 12%),
                radial-gradient(circle at 80% 80%, rgba(124,58,237,0.12), transparent 12%),
                linear-gradient(90deg, rgba(14,165,233,0.03), rgba(139,92,246,0.03));
    mix-blend-mode: screen;
    animation: gradientShift 12s linear infinite;
    filter: blur(10px);
    transform-origin: center;
  }
  @keyframes gradientShift {
    0% { transform: translate3d(0,0,0) scale(1); }
    50% { transform: translate3d(-8%, 6%, 0) scale(1.05); }
    100% { transform: translate3d(0,0,0) scale(1); }
  }

  /* ---------- Typing cursor ---------- */
  .typed-cursor { display:inline-block; width:2px; height:1.1em; margin-left:6px; background:currentColor; vertical-align:middle; animation: blink 1s steps(2,start) infinite; }
  @keyframes blink { 50% { opacity: 0; } }

  /* ---------- Timeline dot pulse ---------- */
  .timeline-dot { width:1.25rem; height:1.25rem; border-radius:9999px; background: linear-gradient(180deg,#34d399,#10b981); position:absolute; left:50%; transform: translateX(-50%); z-index:20; box-shadow: 0 0 0 rgba(52,211,153,0.9); animation: pulse 2.6s infinite; }
  @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(52,211,153,0.9); } 70% { box-shadow: 0 0 0 18px rgba(52,211,153,0); } 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); } }

  /* ---------- Wave divider ---------- */
  .wave-divider svg { display:block; width:100%; height:88px; }
  .wave-anim { transform-origin: center; animation: waveFloat 6s ease-in-out infinite; }
  @keyframes waveFloat { 0% { transform: translateY(0px); } 50% { transform: translateY(6px); } 100% { transform: translateY(0px); } }

  /* small responsive tweaks */
  @media (max-width: 768px) { 
    .hero-gradient { opacity: 0.9; filter: blur(6px); } 
    .project-card { backdrop-filter: blur(4px); }
  }
`;

/* Hero background wrapper (kept behind content) */
const HeroBackground = styled.div`
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
`;

/* Small helper: a compact typed text effect implemented without external packages */
function TypedText({ phrases = [], speed = 80, pause = 1400, className = '' }) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;
    const current = phrases[phraseIndex % phrases.length];
    let timeout = null;

    if (!deleting && subIndex <= current.length) {
      setText(current.slice(0, subIndex));
      timeout = setTimeout(() => setSubIndex((s) => s + 1), speed);
    }

    if (deleting && subIndex >= 0) {
      setText(current.slice(0, subIndex));
      timeout = setTimeout(() => setSubIndex((s) => s - 1), speed / 2);
    }

    if (subIndex === current.length + 1 && !deleting) {
      timeout = setTimeout(() => setDeleting(true), pause);
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setPhraseIndex((i) => i + 1);
    }

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, phraseIndex, phrases, speed, pause]);

  return (
    <span className={className} aria-hidden>
      {text}
      <span className="typed-cursor" />
    </span>
  );
}

/* Wave divider component (SVG) */
function WaveDivider({ className = '' }) {
  return (
    <div className={`wave-divider ${className} w-full overflow-hidden`} aria-hidden>
      <svg className="wave-anim" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,32 C150,96 350,0 600,48 C850,96 1050,16 1200,64 L1200 120 L0 120 Z" fill="rgba(99,102,241,0.08)" />
        <path d="M0,48 C200,0 400,96 600,48 C800,0 1000,96 1200,48 L1200 120 L0 120 Z" fill="rgba(79,70,229,0.06)" />
      </svg>
    </div>
  );
}

export default function App() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.pageYOffset > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ExtraStyles />
      <CursorProvider>
        <div className="min-h-screen bg-gray-900 text-white font-sans relative overflow-x-hidden">
          <Nav navLinks={siteData.navLinks} resumeUrl={siteData.social?.resume} />
          <CustomCursor />

          <Layout>
            <main>
              {/* HERO */}
              <motion.section
                className="relative grid md:grid-cols-2 gap-8 items-center py-20 min-h-screen px-8 md:px-20 overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <HeroBackground className="hero-bg">
                  <div className="hero-gradient" />
                </HeroBackground>

                <div className="space-y-6 z-10">
                  <h1 className="text-5xl md:text-6xl font-bold">{`Hi — I'm ${siteData.name}.`}</h1>

                  <div className="text-xl md:text-2xl leading-snug">
                    <TypedText 
                      phrases={siteData.titles} 
                      speed={70} 
                      pause={1500} 
                      className="text-lg md:text-xl font-medium text-green-400" 
                    />
                    <p className="mt-3 text-gray-100 text-lg md:text-xl">{siteData.shortBio}</p>
                  </div>

                  <div className="flex gap-4 flex-wrap">
                    <StyledLink 
                      href={siteData.social.github} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-gray-800 hover:bg-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </StyledLink>
                    <StyledLink 
                      href={siteData.social.linkedin} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </StyledLink>
                    <StyledLink 
                      href={`mailto:${siteData.social.email}`} 
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Say hello
                    </StyledLink>
                  </div>
                </div>

                <div className="flex justify-center z-10">
                  <motion.div
                    className="w-64 h-64 rounded-xl shadow-2xl bg-white/10 backdrop-blur-md flex items-center justify-center overflow-hidden border-2 border-green-400/30"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {siteData.profilePicture ? (
                      <img 
                        src={siteData.profilePicture} 
                        alt={`${siteData.name} photo`} 
                        className="w-full h-full object-cover rounded-lg" 
                        loading="eager"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-full">
                        <span className="text-4xl font-extrabold">
                          {(siteData.name || '').split(' ').map(n=>n[0]).slice(0,2).join('')}
                        </span>
                        <span className="text-xs text-gray-300 mt-2">Your Photo</span>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.section>

              {/* EXPERIENCE */}
              <motion.section
                id="experience"
                className="py-20 px-8 md:px-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Experience</h2>

                <div className="relative max-w-5xl mx-auto">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-white/20 h-full" />

                  <div className="space-y-16">
                    {siteData.experience.map((exp, idx) => (
                      <motion.div
                        key={idx}
                        className={'relative flex flex-col md:flex-row items-center md:items-start md:justify-start gap-6 md:gap-12'}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.12 }}
                      >
                        <div className="timeline-dot" style={{ top: '10px' }} aria-hidden />

                        <div
                          className={`bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg flex-1 md:max-w-md ${
                            idx % 2 === 0 ? 'md:ml-auto text-left' : 'md:mr-auto text-left'
                          }`}
                        >
                          <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                          <h4 className="text-md text-green-400 mb-2">{exp.company}</h4>
                          <p className="text-sm text-gray-300 mb-2">{exp.duration}</p>
                          <ul className="list-disc ml-5 text-gray-200 space-y-1">
                            {exp.responsibilities.map((res, i) => (
                              <li key={i}>{res}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>

{/* EDUCATION */}
<motion.section
  id="education"
  className="py-20 px-8 md:px-20 relative overflow-hidden"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  {/* Animated Background Gradient */}
  <div
    className="absolute inset-0 z-0 opacity-30"
    style={{
      background: `radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.2), transparent 40%),
                    radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.15), transparent 40%)`,
      transition: 'all 0.5s ease',
    }}
  />

  <div className="relative z-10">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
      Education
    </h2>
    <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto text-lg">
      Academic journey and key milestones in my learning path.
    </p>

    <div className="max-w-4xl mx-auto space-y-10">
      {/* IIT Jodhpur */}
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300 group"
        initial={{ opacity: 0, x: -60, scale: 0.98 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(34, 197, 94, 0.15)' }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h3 className="text-2xl font-semibold text-green-400 group-hover:text-green-300 transition-colors duration-300">
            Indian Institute of Technology Jodhpur
          </h3>
          <span className="px-4 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30">
            Ongoing
          </span>
        </div>
        <p className="text-xl text-white mb-2">B.Tech in Artificial Intelligence & Data Science</p>
        <p className="text-sm text-gray-300 mb-5">Oct 2022 — May 2026</p>

        <div className="bg-black/30 rounded-lg p-5 border border-green-500/20">
          <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m-4 4v-6a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Key Details
          </h4>
          <ul className="list-disc ml-5 space-y-2 text-gray-200 text-sm md:text-base">
            <li><strong>GPA:</strong> <span className="text-green-300">8.52 / 10</span></li>
            <li>
              <strong>Relevant Coursework:</strong> Data Structures, Algorithms, Machine Learning, Operating Systems, Computer Networks, AI, Probability & Statistics
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Kendriya Vidyalaya */}
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group"
        initial={{ opacity: 0, x: 60, scale: 0.98 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(59, 130, 246, 0.15)' }}
      >
        <h3 className="text-2xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300 mb-4">
          Kendriya Vidyalaya Mokamaghat
        </h3>
        <div className="space-y-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-gradient-to-r from-indigo-900/40 to-purple-900/30 p-4 rounded-lg border border-indigo-500/20">
            <span className="text-gray-200">
              <strong>Class XII (CBSE):</strong> 92.4%
            </span>
            <span className="text-sm text-gray-400 bg-indigo-700/30 px-3 py-1 rounded-full">2022</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-gradient-to-r from-violet-900/40 to-pink-900/30 p-4 rounded-lg border border-violet-500/20">
            <span className="text-gray-200">
              <strong>Class X (CBSE):</strong> 91.6%
            </span>
            <span className="text-sm text-gray-400 bg-violet-700/30 px-3 py-1 rounded-full">2020</span>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</motion.section>

              {/* PROJECTS */}
              <motion.section
                id="projects"
                className="py-16 px-8 md:px-20 bg-gray-900"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-center">Selected Projects</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {siteData.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </motion.section>

              {/* ABOUT */}
              <motion.section
                id="about"
                className="py-16 px-8 md:px-20 bg-gray-800 text-gray-200"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-6">About</h2>
                <p className="whitespace-pre-line">{siteData.about}</p>
              </motion.section>

              {/* SKILLS */}
              <motion.section
                className="py-16 px-8 md:px-20 bg-gray-900"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-center">Skills</h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {siteData.skills.map((s) => (
                    <motion.span
                      key={s}
                      className="px-4 py-2 border rounded text-sm border-green-400 hover:bg-green-400 hover:text-gray-900 transition"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.section>

              <WaveDivider />

              {/* CONTACT */}
              <motion.section
                id="contact"
                className="py-16 px-8 md:px-20 bg-gray-800 text-gray-200 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-6">Get in touch</h2>
                <p className="mb-4">
                  Email me at{' '}
                  <StyledLink href={`mailto:${siteData.social.email}`}>{siteData.social.email}</StyledLink>{' '}
                  or connect on{' '}
                  <StyledLink href={siteData.social.linkedin}>LinkedIn</StyledLink>.
                </p>
                <p className="text-gray-400 text-sm mt-8">
                  © {new Date().getFullYear()} {siteData.name}. All rights reserved.
                </p>
              </motion.section>
            </main>
          </Layout>

          {/* Back to top */}
          {showTop && (
            <motion.button
              aria-label="Back to top"
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-white text-indigo-700 p-3 rounded-full shadow-lg hover:scale-105 transition transform z-50"
              data-cursor="hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          )}
        </div>
      </CursorProvider>
    </ThemeProvider>
  );
}