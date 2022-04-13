import React, { useState } from "react";

// ------ icon ------
import { HiOutlineExternalLink } from "react-icons/hi";

// ------ TS interface ------
import { LocationPropsF, MarkerProps } from "../../../assets/tsInterface";

// ------ components ------
import IsFavIcon from "../../reusable-components/IsFavIcon";
import BeenToIcon from "../../reusable-components/BeenToIcon";

// ------ styled component ------
import {
  MarkerInfoContainer,
  InfoWindow,
  MarkerIcon,
  ShopName,
  FlavourList,
  IconContainer,
} from "./Marker.style";
import { mapAreaColor } from "../../../assets/styleVariables";

const Marker: React.VFC<MarkerProps> = React.memo(
  ({ lat, lng, areaName, shop, beenTo, eachStoreId }) => {
    // ------ set shop location ------
    const shopLocation: LocationPropsF = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };

    // ------ set area color ------
    const areaColor: string = mapAreaColor[areaName];

    // ------ is Info Window open ------
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick = (className: string) => {
      const childElem: HTMLElement | null = document.querySelector(className);
      const parentElem = childElem?.parentElement;

      console.log(parentElem);

      if (isOpen) {
        (parentElem as HTMLElement).style.zIndex = "0";
        setIsOpen(false);
      } else {
        (parentElem as HTMLElement).style.zIndex = "100";
        setIsOpen(true);
      }
    };

    return (
      <MarkerInfoContainer className={`child-${eachStoreId}`}>
        <MarkerIcon
          markerColor={areaColor}
          onClick={(): void => {
            handleClick(`.child-${eachStoreId}`);
          }}
        ></MarkerIcon>

        <InfoWindow isOpen={isOpen}>
          <ShopName>
            <a href={shop.websiteUrl} target="_blank" rel="noreferrer">
              {shop.shopName}
              <HiOutlineExternalLink />
            </a>
          </ShopName>

          <FlavourList>
            {shop.flavours.map((flavour) => (
              <li key={flavour.flavourName}>{flavour.flavourName}</li>
            ))}
          </FlavourList>

          <IconContainer>
            <IsFavIcon {...shop} />
            <BeenToIcon
              shop={shop}
              beenTo={beenTo}
              storeLocation={shopLocation}
              eachStoreId={eachStoreId}
              kw="marker"
            />
          </IconContainer>
        </InfoWindow>
      </MarkerInfoContainer>
    );
  }
);

export default Marker;
