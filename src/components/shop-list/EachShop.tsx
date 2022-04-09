import React from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { JsonProps } from "../../assets/tsInterface";
import BeenToIcon from "../reusable-components/BeenToIcon";
import IsFavIcon from "../reusable-components/IsFavIcon";

const EachShop = (shop: JsonProps) => {
  return (
    <div>
      <p>{shop.shopName}</p>

      <ul>
        {shop.flavours.map((flavour) => (
          <li key={flavour.flavourName}>
            <p>{flavour.flavourName}</p>
            <p>{flavour.taste}</p>
          </li>
        ))}
      </ul>

      <div>
        <IsFavIcon {...shop} />
        <HiOutlineExternalLink />
      </div>

      <div>
        {shop.eachStoreInfo.map((eachStore) => (
          <div key={eachStore.eachStoreId}>
            <p>{eachStore.areaName}</p>
            <BeenToIcon
              shop={shop}
              beenTo={eachStore.beenTo}
              eachStoreId={eachStore.eachStoreId as string}
              kw="shop-list"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EachShop;
