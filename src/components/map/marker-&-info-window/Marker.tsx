import React, { useState } from "react";

// ------ icon ------
import { BiCoffeeTogo } from "react-icons/bi";
import { SiBuymeacoffee } from "react-icons/si";
import { GiCoffeeMug } from "react-icons/gi";

// ------ TS interface ------
import {
  JsonProps,
  LocationPropsF,
  MarkerProps,
} from "../../../assets/tsInterface";

// ------ components ------
import IsFavIcon from "../../reusable-components/IsFavIcon";
import BeenToIcon from "../../reusable-components/BeenToIcon";

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

// vals: MarkerProps

const Marker: React.VFC<MarkerProps> = ({
  lat,
  lng,
  shop,
  beenTo,
  eachStoreId,
}) => {
  const shopLocation: LocationPropsF = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
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
          <IsFavIcon {...shop} />
          <BeenToIcon
            shop={shop}
            beenTo={beenTo}
            storeLocation={shopLocation}
            eachStoreId={eachStoreId}
            kw="marker"
          />
        </div>
      </InfoWindow>
    </MarkerInfoContainer>
  );
};

export default Marker;
