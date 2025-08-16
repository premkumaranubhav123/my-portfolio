// src/components/Timeline.jsx
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { InView } from 'react-intersection-observer';

const TimelineItem = ({ item, index }) => {
  return (
    <InView triggerOnce rootMargin="-20% 0px -20% 0px">
      {({ inView, ref }) => (
        <div ref={ref} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            className={`bg-white/8 backdrop-blur-md rounded-xl p-6 shadow-lg max-w-md ${index % 2 === 0 ? 'md:ml-auto text-left' : 'md:mr-auto text-left'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{item.role}</h3>
              <span className="text-sm text-green-400">{item.duration}</span>
            </div>
            <h4 className="text-sm text-gray-300 mb-2">{item.company}</h4>
            <ul className="list-disc ml-5 text-gray-200 space-y-1">
              {item.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </motion.div>
        </div>
      )}
    </InView>
  );
};

export default function Timeline({ items = [] }) {
  return (
    <section id="timeline" className="py-20 px-8 md:px-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Career Timeline</h2>
      <div className="relative max-w-5xl mx-auto">
        {/* growing line - visual only */}
        <div className="absolute left-1/2 -translate-x-1/2 w-1 bg-white/10 h-full" />
        <div className="space-y-16">
          {items.map((it, idx) => (
            <div key={idx} className="relative flex flex-col md:flex-row items-center md:items-start md:justify-start gap-6 md:gap-12">
              <div className="absolute md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 bg-green-400 rounded-full z-10" />
              <TimelineItem item={it} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
