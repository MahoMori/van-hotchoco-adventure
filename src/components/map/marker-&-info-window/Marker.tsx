import React, { useState } from "react";

import { BiCoffeeTogo } from "react-icons/bi";

import { MarkerInfoContainer, InfoWindow } from "./Marker.style";

interface MarkerProps {
  lat: string;
  lng: string;
}

const Marker = (props: MarkerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <MarkerInfoContainer>
      <InfoWindow isOpen={isOpen}>
        <p>InfoWindow</p>
      </InfoWindow>

      <BiCoffeeTogo
        style={{ height: "50px", width: "50px", color: "red" }}
        onClick={(): void => {
          isOpen ? setIsOpen(false) : setIsOpen(true);
        }}
      ></BiCoffeeTogo>
    </MarkerInfoContainer>
  );
};

export default Marker;
