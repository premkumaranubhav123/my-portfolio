// src/components/ProjectCard.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const FALLBACK_IMG = '/project/project1.png';

const ProjectCard = ({ project }) => {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const imageSrc = project.img || FALLBACK_IMG;

  const handleImgError = (e) => {
    if (e.currentTarget.src.includes(FALLBACK_IMG)) return;
    e.currentTarget.src = FALLBACK_IMG;
  };

  const handleImgLoad = () => {
    setImgLoaded(true);
  };

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { duration: 0.1 } } }}
    >
      <Tilt 
        tiltMaxAngleX={8} 
        tiltMaxAngleY={8} 
        transitionSpeed={400} 
        glareEnable={true}
        glareMaxOpacity={0.2}
        glareColor="#ffffff"
        glarePosition="all"
        className="rounded-xl"
      >
        <article
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="border border-white/20 rounded-xl p-6 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:border-green-400/30"
          data-cursor="hover"
        >
          <div className="h-48 bg-gray-200/30 rounded mb-4 flex items-center justify-center overflow-hidden relative">
            {!imgLoaded && !project.preview && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse bg-gray-700/50 w-full h-full" />
              </div>
            )}
            
            {project.preview ? (
              <video
                src={project.preview}
                className="object-cover w-full h-full"
                muted
                loop
                playsInline
                style={{ display: hovered ? 'block' : 'none' }}
                autoPlay={hovered}
              />
            ) : (
              <img
                src={imageSrc}
                alt={project.title}
                className={`object-cover w-full h-full ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                decoding="async"
                onError={handleImgError}
                onLoad={handleImgLoad}
              />
            )}
          </div>

          <h4 className="text-xl font-semibold mb-2 text-white">{project.title}</h4>
          <p className="text-gray-300 mb-2">{project.description}</p>
          <p className="text-sm text-green-400 mb-3">Tech: {project.tech.join(', ')}</p>

          <div className="flex gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer noopener"
                className="px-4 py-1 border border-green-400 rounded hover:bg-green-400 hover:text-gray-900 transition flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Live
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="px-4 py-1 border border-green-400 rounded hover:bg-green-400 hover:text-gray-900 transition flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Repo
              </a>
            )}
          </div>
        </article>
      </Tilt>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tech: PropTypes.arrayOf(PropTypes.string),
    repo: PropTypes.string,
    live: PropTypes.string,
    img: PropTypes.string,
    preview: PropTypes.string,
  }).isRequired,
};

export default ProjectCard;