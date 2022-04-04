import React from "react";

// ------ icon ------
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { IoStorefront, IoStorefrontOutline } from "react-icons/io5";

// ------ redux ------
import { useDispatch } from "react-redux";
import { changeIsFav, changeBeenTo } from "../../redux/shopSlice";

// ------ TS interface ------
import { BeenToIconProps, LocationPropsF } from "../../assets/tsInterface";

const FavBeenToIcons: React.VFC<BeenToIconProps> = ({
  shop,
  beenTo,
  storeLocation,
  eachStoreId,
  kw,
}) => {
  // ------ redux ------
  const dispatch = useDispatch();

  return (
    <>
      {beenTo ? (
        <IoStorefront />
      ) : (
        <IoStorefrontOutline
          onClick={() => {
            if (kw === "marker") {
              dispatch(
                changeBeenTo([
                  shop,
                  storeLocation as LocationPropsF,
                  eachStoreId,
                ])
              );
            }
          }}
        />
      )}
    </>
  );
};

export default FavBeenToIcons;
