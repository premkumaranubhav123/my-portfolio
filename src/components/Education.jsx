// src/components/Education.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
  const educationData = [
    {
      institution: "Indian Institute of Technology Jodhpur",
      degree: "B.Tech in Artificial Intelligence & Data Science",
      duration: "Oct 2022 to May 2026 (ongoing)",
      details: [
        "GPA: 8.52/10",
        "Relevant Coursework: Data Structures, Algorithms, Machine Learning, Operating Systems, Computer Networks, AI, Probability & Statistics"
      ]
    },
    {
      institution: "Kendriya Vidyalaya Mokamaghat",
      details: [
        "Class XII (CBSE): 92.4% — 2022",
        "Class X (CBSE): 91.6% — 2020"
      ]
    }
  ];

  return (
    <motion.section 
      id="education"
      className="py-16 px-8 md:px-20 bg-gray-800"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
      
      <div className="max-w-4xl mx-auto space-y-8">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-semibold text-green-400 mb-1">{edu.institution}</h3>
            {edu.degree && <p className="text-lg mb-2">{edu.degree}</p>}
            <p className="text-sm text-gray-300 mb-3">{edu.duration}</p>
            <ul className="list-disc ml-5 space-y-1">
              {edu.details.map((detail, i) => (
                <li key={i} className="text-gray-200">{detail}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Education;