import React from "react";

import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { IoStorefront, IoStorefrontOutline } from "react-icons/io5";
import { HiOutlineExternalLink } from "react-icons/hi";

import { useSelector } from "react-redux";
import { TStore } from "../../redux/store";

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
              {shop.isFav ? <BsBookmarkHeartFill /> : <BsBookmarkHeart />}
              {shop.beenTo ? <IoStorefront /> : <IoStorefrontOutline />}
              <HiOutlineExternalLink />
            </div>

            <div>
              {shop.mapArea.map((area) => (
                <p key={area}>{area}</p>
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
