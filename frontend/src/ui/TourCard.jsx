import { StarIcon, UsersIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";
import Icon from "./Icon";
import StyledParagraph from "./StyledParagraph";

const Card = styled.div`
  /* temp */
  /* margin: 50px auto; */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  width: 200px;
  justify-self: center;
`;

const CardContent = styled.div`
  padding: 1.5rem 1.8rem 1.5rem 1.8rem;
`;

const CardRow = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
  align-items: center;
`;

const CardName = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const CardImage = styled.img`
  /* width: 25%; */
  width: 200px;
  height: 150px;
  border-top-right-radius: inherit;
  border-top-left-radius: inherit;
`;

const StyledLink = styled.a`
  color: var(--color-brand-4);
  cursor: pointer;
`;

const Span = styled.span`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

function TourCard({ tour }) {
  const { name, price, maxGroupSize, ratingsAverage } = tour;

  return (
    <Card>
      {/* <CardImage src="https://placehold.co/200x150?text=\n" /> */}
      <CardImage src="./tour-1-3.jpg" />
      <CardContent>
        <CardName>{name}</CardName>
        <CardRow>
          <StyledParagraph>${price}</StyledParagraph>

          <Span>
            <StyledParagraph>{maxGroupSize}</StyledParagraph>
            <Icon size="small">
              <UsersIcon />
            </Icon>
          </Span>
        </CardRow>

        <CardRow>
          <Span>
            <StyledParagraph>{ratingsAverage}</StyledParagraph>
            <Icon size="small">
              <StarIcon />
            </Icon>
          </Span>
          <StyledLink>Details &gt;</StyledLink>
        </CardRow>
      </CardContent>
    </Card>
  );
}

export default TourCard;
