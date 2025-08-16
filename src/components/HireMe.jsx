// src/components/HireMe.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HireMe() {
  const [open, setOpen] = useState(false);
  // wiggle control
  const [wiggle, setWiggle] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setWiggle((s) => !s), 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <motion.button
        aria-label="Hire me"
        onClick={() => setOpen(true)}
        className="fixed bottom-8 left-8 bg-green-400 text-gray-900 p-3 rounded-full shadow-lg z-50"
        animate={wiggle ? { rotate: [0, -6, 6, 0] } : {}}
        transition={{ duration: 0.8 }}
        data-cursor="hover"
      >
        Hire me
      </motion.button>

      {open && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-60 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-gray-900 text-white rounded-lg p-8 max-w-xl w-full z-70">
            <h3 className="text-2xl font-bold mb-4">Let's talk!</h3>
            <p className="mb-4">I’m actively looking for Software Engineer roles. I can: build scalable full-stack products, optimise backend systems, and ship delightful front-end experiences.</p>
            <a className="inline-block px-4 py-2 bg-green-400 text-gray-900 rounded mr-3" href={`mailto:premkumar39411@gmail.com`}>Email me</a>
            <button className="px-4 py-2 border rounded" onClick={() => setOpen(false)}>Close</button>
          </motion.div>
        </div>
      )}
    </>
  );
}
