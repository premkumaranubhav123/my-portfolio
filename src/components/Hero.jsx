// src/components/Hero.jsx
import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import SplitText from './SplitText';
import MagneticButton from './MagneticButton';

const DEFAULT_PROFILE = '/profile.jpg'; // ✅ matches your structure

const Hero = ({ name, shortBio, github, linkedin, email, profilePicture }) => {
  // parallax effect: transform background Y slower than scroll
  const { scrollY } = useViewportScroll();
  const bgY = useTransform(scrollY, [0, 600], ['0%', '30%']);

  const imgSrc = profilePicture || DEFAULT_PROFILE;

  const handleImgError = (e) => {
    if (e.currentTarget.src.includes(DEFAULT_PROFILE)) return;
    e.currentTarget.src = DEFAULT_PROFILE;
  };

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Parallax background layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(1000px 600px at 10% 20%, rgba(99,102,241,0.12), transparent 10%), radial-gradient(800px 500px at 90% 80%, rgba(16,185,129,0.08), transparent 10%), linear-gradient(180deg, rgba(10, 25, 47, 1), rgba(10, 25, 47, 0.85))',
          backgroundBlendMode: 'screen, screen, normal',
          transformOrigin: 'center',
          y: bgY,
          zIndex: 0,
        }}
        aria-hidden
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="grid md:grid-cols-2 gap-8 items-center py-20 min-h-screen px-8 md:px-20">
          <div className="space-y-6">
            <SplitText as="h1" className="text-5xl md:text-6xl font-bold" mode="words">
              {`Hi — I'm ${name}.`}
            </SplitText>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-lg md:text-xl"
            >
              {shortBio}
            </motion.p>

            <div className="flex gap-4">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 border border-white rounded hover:bg-white hover:text-indigo-600 transition"
                data-cursor="hover"
              >
                GitHub
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 border border-white rounded hover:bg-white hover:text-indigo-600 transition"
                data-cursor="hover"
              >
                LinkedIn
              </a>
              <MagneticButton href={`mailto:${email}`} className="resume-button">
                Say hello
              </MagneticButton>
            </div>
          </div>

          <div className="flex justify-center">
            <motion.div
              className="w-64 h-64 rounded-xl shadow-2xl bg-white/10 backdrop-blur-md overflow-hidden"
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <img
                src={imgSrc}
                alt={`${name} profile`}
                className="object-cover w-full h-full"
                loading="eager"
                decoding="async"
                onError={handleImgError}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
