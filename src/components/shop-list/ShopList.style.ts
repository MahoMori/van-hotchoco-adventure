import styled from "styled-components";
import { Section } from "../../assets/styleVariables";

export const ShopListSection = styled(Section)`
  position: relative;

  &::after {
    content: "";
    height: 6rem;
    width: 100%;
    position: absolute;
  }
`;

export const ShopListTitle = styled.h2`
  text-align: center;
  margin: 0.5rem 0;
`;

export const ButtonContainer = styled.div`
  background: #e9ede7;
  padding: 0.5rem 0;
  text-align: center;
`;

export const AreaFilterButton = styled.button<{
  color: string;
  isClicked: boolean;
}>`
  background: ${(props) => (props.isClicked ? props.color : "#fff")};
  color: ${(props) => (props.isClicked ? "#fff" : props.color)};
  border: solid ${(props) => props.color} 1px;
  margin: 0.2rem;
  font-size: 1rem;
  padding: 0 0.5rem;
  height: 1.7rem;
`;

export const ListContainer = styled.div`
  padding: 0.5rem;
`;
