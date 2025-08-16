import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledExperience = styled.section`
  max-width: 1000px;
  margin: 0 auto 100px;
  padding: 0 20px;

  h2 {
    font-size: 32px;
    margin-bottom: 40px;
    color: var(--green);
    text-align: center;
  }
`;

const ExperienceList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 30px;
    background-color: var(--light-navy);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 30px -10px var(--navy-shadow);

    h3 {
      margin: 0 0 5px;
      font-size: 20px;
    }
    span {
      font-size: 14px;
      color: var(--light-slate);
    }
    p {
      margin-top: 10px;
      line-height: 1.5;
    }
    ul {
      margin-top: 10px;
      padding-left: 20px;
      list-style-type: disc;
      li {
        font-size: 14px;
        color: var(--light-slate);
      }
    }
  }
`;

const Experience = ({ data }) => {
  return (
    <StyledExperience>
      <h2>Experience</h2>
      <ExperienceList>
        {data.map((exp, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
          >
            <h3>{exp.role} @ {exp.company}</h3>
            <span>{exp.period}</span>
            <ul>
              {exp.highlights.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ExperienceList>
    </StyledExperience>
  );
};

export default Experience;
