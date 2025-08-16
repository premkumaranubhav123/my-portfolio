// src/styles/theme.js
import { css } from 'styled-components';
import variables from './variables';

const theme = {
  colors: variables.colors,
  fonts: variables.fonts,
  sizes: variables.sizes,
  layout: variables.layout,
  transitions: variables.transitions,
  mixins: {
    flexCenter: css`
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    flexBetween: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,
    link: css`
      display: inline-block;
      text-decoration: none;
      color: inherit;
      transition: ${variables.transitions.default};
      &:hover,
      &:focus {
        color: ${variables.colors.green};
      }
    `,
    inlineLink: css`
      display: inline-block;
      text-decoration: none;
      color: ${variables.colors.green};
      transition: ${variables.transitions.default};
      &:hover,
      &:focus {
        text-decoration: underline;
      }
    `,
  },
};

export default theme;
