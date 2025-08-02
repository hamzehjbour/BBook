import styled, { css } from "styled-components";

const sizes = {
  small: css`
    width: 1.5rem;
  `,

  medium: css`
    width: 2.4rem;
  `,

  large: css`
    width: 3.2rem;
  `,
};

const Icon = styled.span`
  ${(props) => sizes[props.size] + ";"}
`;

Icon.defaultProps = {
  size: "small",
};

export default Icon;
