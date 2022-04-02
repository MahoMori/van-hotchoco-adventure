import React, { useState } from "react";

import { BiCoffeeTogo } from "react-icons/bi";
import { SiBuymeacoffee } from "react-icons/si";
import { GiCoffeeMug } from "react-icons/gi";

import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { IoStorefront, IoStorefrontOutline } from "react-icons/io5";

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
  // const Marker = (shop: JsonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <MarkerInfoContainer>
      <SiBuymeacoffee
        style={{
          height: "50px",
          width: "50px",
          color: "red",
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translate(-50%, -100%)",
          zIndex: "-1",
        }}
        onClick={(): void => {
          isOpen ? setIsOpen(false) : setIsOpen(true);
        }}
      ></SiBuymeacoffee>

      <InfoWindow isOpen={isOpen}>
        <div>
          <p>
            <a href={vals.shop?.websiteUrl}>{vals.shop?.shopName}</a>
          </p>
        </div>

        <ul>
          {vals.shop?.flavours.map((flavour) => (
            <li key={flavour.flavourName}>{flavour.flavourName}</li>
          ))}
        </ul>

        <div>
          {vals.shop?.isFav ? <BsBookmarkHeartFill /> : <BsBookmarkHeart />}
          {vals.shop?.beenTo ? <IoStorefront /> : <IoStorefrontOutline />}
        </div>
      </InfoWindow>
    </MarkerInfoContainer>
  );
};

export default Marker;
