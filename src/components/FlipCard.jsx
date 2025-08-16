// src/components/FlipCard.jsx
import React from 'react';
import PropTypes from 'prop-types';

export default function FlipCard({ front, back }) {
  return (
    <div className="w-64 h-40 perspective-1000">
      <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180" style={{ transformStyle: 'preserve-3d' }}>
        <div style={{ backfaceVisibility: 'hidden' }} className="absolute inset-0 bg-white/5 rounded-lg flex items-center justify-center p-4">
          {front}
        </div>
        <div style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }} className="absolute inset-0 bg-green-800/20 rounded-lg flex items-center justify-center p-4">
          {back}
        </div>
      </div>
    </div>
  );
}

FlipCard.propTypes = {
  front: PropTypes.node.isRequired,
  back: PropTypes.node.isRequired,
};
