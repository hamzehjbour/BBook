import styled from "styled-components";

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.2rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #ddd;
  background-color: #fff;

  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

function Row({ children }) {
  return <StyledRow>{children}</StyledRow>;
}

export default Row;
