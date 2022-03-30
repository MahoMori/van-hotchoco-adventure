import React, { useState } from "react";

import { BiCoffeeTogo } from "react-icons/bi";
import { SiBuymeacoffee } from "react-icons/si";
import { GiCoffeeMug } from "react-icons/gi";
import { MarkerProps } from "../../../assets/tsInterface";

import { MarkerInfoContainer, InfoWindow } from "./Marker.style";

// #######################
// shopName
// flavours.flavourName
// websiteUrl

// favourite button
// BsBookmarkHeartFill
// BsBookmarkHeart
// RiHeartsFill
// RiHeartsLine

// been to button
// IoStorefrontOutline
// IoStorefront
// #######################

const Marker = (vals: MarkerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <MarkerInfoContainer>
      <InfoWindow isOpen={isOpen}>
        <div>
          <p>InfoWindow</p>
          <p>InfoWindow</p>
          <p>InfoWindow</p>
        </div>

        <div>{/* icon */}</div>
      </InfoWindow>

      <SiBuymeacoffee
        style={{
          height: "50px",
          width: "50px",
          color: "red",
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translate(-50%, -100%)",
        }}
        onClick={(): void => {
          isOpen ? setIsOpen(false) : setIsOpen(true);
        }}
      ></SiBuymeacoffee>
    </MarkerInfoContainer>
  );
};

export default Marker;
