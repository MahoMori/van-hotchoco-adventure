import styled from "styled-components";

export const EachShopContainer = styled.div<{ isOpen: boolean }>`
  --bg-gradient: linear-gradient(#a7e1d1 0 100%);
  margin: 0 0 0.5rem 0;
  padding: 0.7rem 1rem;
  background-image: var(--bg-gradient), var(--bg-gradient), var(--bg-gradient),
    var(--bg-gradient);
  background-repeat: no-repeat;
  background-size: 100% 2px, 2px 100%, 100% 2px, 2px 100%;
  background-position: left top 5px, right 5px top, left bottom 5px,
    left 5px top;

  height: auto;
  overflow: hidden;
`;

export const ShopName = styled.p`
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 0.7rem;
  border-bottom: dotted 2px #d25126;
`;

export const IconContainer = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: space-around;
  /* display: grid;
  grid-template-columns: repeat(2, 1fr); */

  & * {
    font-size: 1.2rem;
    color: #000;
  }
`;

export const FlavourList = styled.li<{ isOpen: boolean }>`
  list-style: none;
  margin: 0.5rem 0;

  & p:first-child {
    display: inline-block;
    /* color: #84563c; */
    -webkit-text-stroke: 0.25px #a7e1d1;
    text-stroke: 0.25px #a7e1d1;

    &::before {
      content: "🍫 ";
    }
  }

  & p:last-child {
    margin-left: 1.2rem;
  }
`;

export const StoreInfo = styled.div`
  background: #e9ede7;
  padding: 0.1rem 0;
  & div {
    display: flex;
    margin: 0.2rem 0.3rem;
    align-items: center;
  }
`;
