import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const StyledSocial = styled.aside`
  position: fixed;
  bottom: 0;
  left: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 10;

  a {
    color: var(--lightest-slate);
    font-size: 1.2rem;
    transition: transform 0.2s, color 0.2s;

    &:hover {
      color: var(--green);
      transform: translateY(-3px);
    }
  }

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    background-color: var(--light-slate);
    margin-top: 10px;
  }
`;

const Social = ({ socialMedia }) => {
  return (
    <StyledSocial>
      {socialMedia.map(({ name, url }) => {
        let Icon;
        if (name === 'GitHub') Icon = <FaGithub />;
        else if (name === 'LinkedIn') Icon = <FaLinkedin />;
        else if (name === 'Email') Icon = <FaEnvelope />;

        return (
          <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name}>
            {Icon}
          </a>
        );
      })}
    </StyledSocial>
  );
};

Social.propTypes = {
  socialMedia: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

export default Social;
