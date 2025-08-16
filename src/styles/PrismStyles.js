import { css } from 'styled-components';

const PrismStyles = css`
  code[class*='language-'],
  pre[class*='language-'] {
    color: white;
    background: none;
    text-shadow: none;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }
  pre {
    padding: 1.5em;
    margin: 0 0 1.5em;
    overflow: auto;
    border-radius: var(--border-radius);
  }
`;

export default PrismStyles;
