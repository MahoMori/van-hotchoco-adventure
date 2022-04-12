import styled from "styled-components";
import { GiCoffeeMug } from "react-icons/gi";

export const MarkerInfoContainer = styled.div`
  width: 12rem;
  height: 9.5rem;
  height: auto;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
`;

export const MarkerIcon = styled(GiCoffeeMug)<{ markerColor: string }>`
  height: 50px;
  width: 50px;
  color: ${(props) => props.markerColor};
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
  z-index: -1;
`;

export const InfoWindow = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "grid" : "none")};

  position: relative;
  background: #fff;
  border-bottom: 0.2rem solid #84563c;
  top: -4rem;
  z-index: 10;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  &::before {
    border: 1.1rem solid transparent;
    border-top: 1.1rem solid #84563c;
  }

  &::after {
    border-top: 0.8rem solid #fff;
    border-right: 0.8rem solid transparent;
    border-left: 0.8rem solid transparent;
  }
`;

export const ShopName = styled.p`
  background: #c70000;
  font-size: 1.1rem;
  text-align: center;
  padding: 0.4rem 0.25rem;

  & a {
    color: #fff;
  }
`;

export const FlavourList = styled.ul`
  & li {
    list-style: none;
    font-size: 1rem;
    margin: 0.4rem 0.25rem;
  }
`;

export const IconContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: solid 2px #c70000;
  padding: 0.4rem 0;

  & * {
    margin: 0 auto;
    font-size: 1rem;
  }
`;
