// src/components/Email.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLinkWrapper = styled.div`
  display: flex;
  flex-direction: row; /* horizontal layout */
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  a {
    margin: 0 10px;
    padding: 8px 12px;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    line-height: 1.5;
    color: var(--green);
    text-decoration: none;
    transition: transform 0.2s, color 0.2s;

    &:hover,
    &:focus {
      transform: translateY(-3px);
      color: var(--accent-color, #00bfa6);
    }
  }
`;

const Email = ({ email }) => (
  <>
    {email && (
      <StyledLinkWrapper>
        <a href={`mailto:${email}`} data-cursor="hover">{email}</a>
      </StyledLinkWrapper>
    )}
  </>
);

Email.propTypes = {
  email: PropTypes.string,
};

export default Email;
