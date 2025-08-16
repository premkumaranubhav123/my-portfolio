import { createGlobalStyle } from 'styled-components';
import variables from './variables';
import mixins from './mixins';

const GlobalStyle = createGlobalStyle`
  :root {
    --green: ${variables.colors.green};
    --light-slate: ${variables.colors.lightSlate};
    --lightest-slate: ${variables.colors.lightestSlate};
    --dark-navy: ${variables.colors.darkNavy};
    --navy: ${variables.colors.navy};
    --navy-shadow: rgba(2, 12, 27, 0.7);
    --border-radius: 4px;
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    --font-mono: ${variables.fonts.mono};
    --fz-xs: 12px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-heading: 32px;
    --hamburger-width: 30px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    /* performance hints for animated elements */
    --motion-will-change: transform, opacity;
  }

  /* hint for heavy animated elements */
  [data-cursor],
  .project-card,
  .resume-button,
  button,
  a {
    will-change: transform, opacity;
  }

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100vh;
    background-color: var(--navy);
    color: var(--lightest-slate);
    font-family: ${variables.fonts.sans};
    font-size: var(--fz-md);
  }

  main {
    width: 100%;
    margin: 0 auto;
    padding: 100px 150px;
    @media (max-width: 1080px) { padding: 100px 100px; }
    @media (max-width: 768px) { padding: 100px 25px; }
  }

  a {
    ${mixins.link};
    color: var(--green);
    &:hover, &:focus {
      color: var(--green);
    }
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
  }
`;

export default GlobalStyle;
