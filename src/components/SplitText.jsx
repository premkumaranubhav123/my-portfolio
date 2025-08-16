// src/components/SplitText.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * SplitText
 * - mode: 'words' | 'chars' (default: 'words')
 * - wraps each piece in a motion.span and applies staggered animation
 */
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.45 } },
};

const SplitText = ({ children, as = 'h1', className = '', mode = 'words', ...rest }) => {
  const Tag = as;
  const text = children || '';
  const parts = mode === 'chars'
    ? text.split('').map((c, i) => ({ txt: c, key: `${i}-${c}` }))
    : text.split(' ').map((w, i) => ({ txt: w, key: `${i}-${w}` }));

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      <Tag aria-hidden="true" style={{ display: 'inline-block', lineHeight: 1 }}>
        {parts.map((p, i) => (
          <motion.span
            key={p.key}
            variants={wordVariant}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {p.txt}
            {mode === 'words' ? (i !== parts.length - 1 ? '\u00A0' : '') : ''}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
};

SplitText.propTypes = {
  children: PropTypes.string.isRequired,
  as: PropTypes.string,
  className: PropTypes.string,
  mode: PropTypes.oneOf(['words', 'chars']),
};

export default SplitText;
