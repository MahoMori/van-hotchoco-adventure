import React, { useState } from "react";

// ------ icon ------
import { BiCoffeeTogo } from "react-icons/bi";
import { SiBuymeacoffee } from "react-icons/si";
import { GiCoffeeMug } from "react-icons/gi";

// ------ TS interface ------
import {
  JsonProps,
  LocationProps,
  MarkerProps,
} from "../../../assets/tsInterface";

// ------ components ------
import FavBeenToIcons from "../../reusable-components/FavBeenToIcons";

// ------ styled component ------
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
  const shop = vals.shop as JsonProps;
  const shopLocation: LocationProps = {
    lat: parseFloat(vals.lat),
    lng: parseFloat(vals.lng),
  };

  // ------ is Info Window open ------
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
            <a href={shop.websiteUrl}>{shop.shopName}</a>
          </p>
        </div>

        <ul>
          {shop.flavours.map((flavour) => (
            <li key={flavour.flavourName}>{flavour.flavourName}</li>
          ))}
        </ul>

        <div>
          <FavBeenToIcons shop={shop} shopLocation={shopLocation} kw="marker" />
        </div>
      </InfoWindow>
    </MarkerInfoContainer>
  );
};

export default Marker;
