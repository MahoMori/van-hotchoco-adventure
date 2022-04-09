import React, { useEffect, useState } from "react";

// ------ icon ------
import { HiOutlineExternalLink } from "react-icons/hi";

// ------ redux ------
import { useSelector } from "react-redux";
import { TStore } from "../../redux/store";

// ------ TS interface ------
import { JsonProps, MapAreaClicked } from "../../assets/tsInterface";

// ------ map area object ------
import { mapAreaColor } from "../../assets/styleVariables";

// ------ components ------
import IsFavIcon from "../reusable-components/IsFavIcon";
import BeenToIcon from "../reusable-components/BeenToIcon";
import EachShop from "./EachShop";
import { prependListener } from "process";
import { type } from "os";

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

  // ------ filter ------
  // const [filterShopName, setFilterShopName] = useState<string[]>([]);
  // const [isAreaClicked, setIsAreaClicked] = useState<MapAreaClicked>()
  const [filteredShops, setFillteredShops] = useState<JsonProps[]>(shops);

  // const isAreaClicked: MapAreaClicked = {
  //   "Westside / Kerrisdale": false,
  //   "North Vancouver / West Vancouver": false,
  //   "Downtown Vancouver": false,
  //   Burnaby: false,
  //   "Mount Pleasant / East Vancouver": false,
  //   "South Granville / Kitsilano": false,
  //   "White Rock / Surrey": false,
  //   Richmond: false,
  //   Whistler: false,
  //   "Tri-Cities": false,
  // };

  // const handleButtonClick = (area: string) => {
  //   shops.map((shop) => {
  //     shop.eachStoreInfo.map((eachShop) => {
  //       if (eachShop.areaName === area) {
  //         const idx: number = filterShopName.indexOf(shop.shopName);
  //         console.log(idx);
  //         if (idx !== -1) {
  //           const newFilterShopName = filterShopName.splice(idx, 1);
  //           setFilterShopName(newFilterShopName);
  //         } else {
  //           setFilterShopName((prev) =>
  //             prev ? [...prev, shop.shopName] : [shop.shopName]
  //           );
  //         }
  //       }
  //     });
  //   });
  // };

  const filterShops = (area: string) => {
    // let filteredShops = shops.filter((shop) => shop.shopName === areaName);
    let newFilteredShops = shops.filter((shop) =>
      shop.eachStoreInfo.some((eachStore) => eachStore.areaName === area)
    );

    return newFilteredShops;
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let areaName = (e.target as HTMLInputElement).value;
    areaName !== "All"
      ? setFillteredShops(filterShops(areaName))
      : setFillteredShops(shops);
  };

  // useEffect(() => {
  //   listFiltering();
  //   console.log("invoked");
  // }, [filterShopName]);

  return (
    <section>
      <h2>Shop List</h2>
      <div>
        <button value="All" onClick={(e) => handleButtonClick(e)}>
          All
        </button>
        {Object.keys(mapAreaColor).map((area, i) => (
          <button
            key={`area-button-${i}`}
            value={area}
            onClick={(e) => handleButtonClick(e)}
          >
            {area}
          </button>
        ))}
        {/* {shops.map((shop) => (
          <button value={shop.shopName} onClick={(e) => handleButtonClick(e)}>
            {shop.shopName}
          </button>
        ))} */}
      </div>

      {filteredShops.length > 0 ? (
        filteredShops.map((shop) => <EachShop key={shop.shopName} {...shop} />)
      ) : (
        // shops.map((shop) => <EachShop key={shop.shopName} {...shop} />)
        <div>No matching data😔</div>
      )}
    </section>
  );
};

export default ShopList;
