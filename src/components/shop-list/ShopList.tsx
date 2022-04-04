import React from "react";

// ------ icon ------
import { HiOutlineExternalLink } from "react-icons/hi";

// ------ redux ------
import { useSelector } from "react-redux";
import { TStore } from "../../redux/store";

// ------ map area object ------
import { mapAreaColor } from "../../assets/styleVariables";

// ------ components ------
import IsFavIcon from "../reusable-components/IsFavIcon";
import BeenToIcon from "../reusable-components/BeenToIcon";

// #######################
// shopName
// flavours.flavourName
// flavours.taste
// websiteUrl
// mapArea

// favourite button
// BsBookmarkHeartFill
// BsBookmarkHeart
// RiHeartsFill
// RiHeartsLine

// been to button
// IoStorefrontOutline
// IoStorefront
// #######################

const ShopList = () => {
  // ------ redux ------
  const shops = useSelector((state: TStore) => state.shops.shops);

  return (
    <section>
      <h2>Shop List</h2>
      <div>
        {Object.keys(mapAreaColor).map((area, i) => (
          <button key={`area-button-${i}`}>{area}</button>
        ))}
      </div>

      {shops.length > 0 ? (
        shops.map((shop) => (
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
        ))
      ) : (
        <div>No data</div>
      )}
    </section>
  );
};

export default ShopList;
