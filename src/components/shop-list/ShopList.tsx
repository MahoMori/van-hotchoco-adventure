import React from "react";

// ------ icon ------
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { IoStorefront, IoStorefrontOutline } from "react-icons/io5";
import { HiOutlineExternalLink } from "react-icons/hi";

// ------ redux ------
import { useDispatch, useSelector } from "react-redux";
import { changeIsFav } from "../../redux/shopSlice";
import { TStore } from "../../redux/store";

// ------ map area object ------
import { mapAreaColor } from "../../assets/styleVariables";

// ------ components ------
import FavBeenToIcons from "../reusable-components/FavBeenToIcons";

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
  const dispatch = useDispatch();
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
              <FavBeenToIcons shop={shop} kw="shop-list" />
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
