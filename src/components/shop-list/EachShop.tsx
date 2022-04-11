import React, { useState } from "react";

// ------ icon ------
import { HiOutlineExternalLink } from "react-icons/hi";

// ------ TS interface ------
import { JsonProps } from "../../assets/tsInterface";

// ------ components ------
import BeenToIcon from "../reusable-components/BeenToIcon";
import IsFavIcon from "../reusable-components/IsFavIcon";

// ------ styled component ------
import {
  EachShopContainer,
  FlavourList,
  IconContainer,
  ShopName,
  StoreInfo,
} from "./EachShop.style";

const EachShop = (shop: JsonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <EachShopContainer
      isOpen={isOpen}
      onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
    >
      <ShopName>{shop.shopName}</ShopName>

      <IconContainer isOpen={isOpen}>
        <IsFavIcon {...shop} />
        <a href={shop.websiteUrl} target="_blank" rel="noreferrer">
          <HiOutlineExternalLink />
        </a>
      </IconContainer>

      <ul>
        {shop.flavours.map((flavour) => (
          <FlavourList key={flavour.flavourName} isOpen={isOpen}>
            <p>{flavour.flavourName}</p>
            <p style={isOpen ? { display: "block" } : { display: "none" }}>
              {flavour.taste}
            </p>
          </FlavourList>
        ))}
      </ul>

      <StoreInfo style={isOpen ? { display: "block" } : { display: "none" }}>
        {shop.eachStoreInfo.map((eachStore) => (
          <div key={eachStore.eachStoreId}>
            <BeenToIcon
              shop={shop}
              beenTo={eachStore.beenTo}
              eachStoreId={eachStore.eachStoreId as string}
              kw="shop-list"
            />
            &nbsp; -&nbsp;<p>{eachStore.areaName}</p>
          </div>
        ))}
      </StoreInfo>
    </EachShopContainer>
  );
};

export default EachShop;
