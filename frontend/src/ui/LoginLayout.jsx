import styled from "styled-components";

const LoginLayout = styled.main`
  min-height: 100dvh;
  display: grid;
  /* grid-template-columns: auto; */
  grid-template-columns: 64rem;
  justify-content: center;
  align-content: center;
  gap: 3.2rem;

  @media (max-width: 750px) {
    grid-template-columns: 48rem;
  }

  @media (max-width: 550px) {
    grid-template-columns: 42rem;
  }

  @media (max-width: 490px) {
    grid-template-columns: auto;
    gap: 2.4rem;
  }
`;

export default LoginLayout;
