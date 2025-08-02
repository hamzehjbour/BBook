import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root{

  --color-brand-4: #00693E;
  --color-brand-6: #40c057;
  --color-brand-8: #2f9e44;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --color-grey-0: #fff;
  --color-grey-3: #dee2e6;
  --color-grey-7: #495057;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body{
  background-color: #f1f3f5;
  font-family: "Poppins",  sans-serif;
  color: var(--color-grey-7);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
select,
button {
  font: inherit;
  color: inherit
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

button:focus,
input:focus{
  outline:2px solid #40c057;
  outline-offset: -1px;
}

button:has(svg) {
  line-height: 0;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
}

ul {
  list-style: none;
}

`;

export default GlobalStyles;
