import styled from "styled-components";

export const MarkerInfoContainer = styled.div`
  /* background-color: pink; */
  width: 20rem;
  height: 10rem;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
`;

export const InfoWindow = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};

  position: relative;
  /* margin: 2em 0 2em 40px; */
  padding: 15px;
  background: #fff0c6;

  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -50%;
    width: 1.25rem;
    height: 1.25rem;
    /* background: #fff0c6; */
    background: green;

    border-radius: 50%;
  }

  &::after {
    content: "";
    position: absolute;
    left: 49.5%;
    bottom: -80%;
    width: 0.8rem;
    height: 0.8rem;
    /* background: #fff0c6; */
    background: red;
    border-radius: 50%;
  }
`;
