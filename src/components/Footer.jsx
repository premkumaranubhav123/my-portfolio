import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;

  a {
    padding: 10px;
  }
`;

const Footer = ({ author = 'Your Name', repoUrl }) => {
  return (
    <StyledFooter>
      <StyledCredit tabIndex="-1">
        {repoUrl ? (
          <a href={repoUrl} target="_blank" rel="noreferrer">
            <div>Designed &amp; Built by {author}</div>
          </a>
        ) : (
          <div>Designed &amp; Built by {author}</div>
        )}
      </StyledCredit>
    </StyledFooter>
  );
};

Footer.propTypes = {
  author: PropTypes.string,
  repoUrl: PropTypes.string,
};

export default Footer;
