// src/AppTransitions.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppTransitions({ children, locationKey }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={locationKey || 'main'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
