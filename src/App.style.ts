import styled from "styled-components";
import { Link } from "react-router-dom";

export const Title = styled.h1`
  font-family: "Train One", cursive;
  color: #595959;
  text-align: center;
  line-height: 2rem;

  font-size: 1.75rem;
  margin: 0.5rem 0;
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  background: #fff;
  width: 100%;

  height: 4rem;
`;

export const Nav = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  height: 100%;

  & a {
    text-decoration: none;
    font-size: 1.25rem;
    color: #c70000;
    background: #fff;

    border-top: solid #c70000 3px;
    border-right: solid #c70000 3px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }

  & a:last-child {
    border-right: none;
  }
`;

export const StyledLink = styled(Link)<{ isOnPage: boolean }>`
  color: ${(props) => (props.isOnPage ? "#fff" : "#c70000")};
  background: ${(props) => (props.isOnPage ? "#c70000" : "#fff")};
`;
