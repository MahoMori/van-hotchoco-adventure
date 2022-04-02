import React from "react";

// ------ icon ------
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { IoStorefront, IoStorefrontOutline } from "react-icons/io5";

// ------ redux ------
import { useDispatch } from "react-redux";
import { changeIsFav, changeBeenTo } from "../../redux/shopSlice";

// ------ TS interface ------
import { IconsProps, LocationProps } from "../../assets/tsInterface";

const FavBeenToIcons: React.VFC<IconsProps> = ({ shop, shopLocation, kw }) => {
  // ------ redux ------
  const dispatch = useDispatch();

  return (
    <>
      {shop.isFav ? (
        <BsBookmarkHeartFill onClick={() => dispatch(changeIsFav(shop))} />
      ) : (
        <BsBookmarkHeart onClick={() => dispatch(changeIsFav(shop))} />
      )}

      {shop.beenTo ? (
        <IoStorefront />
      ) : (
        <IoStorefrontOutline
          onClick={() => {
            if (kw === "marker") {
              dispatch(changeBeenTo([shop, shopLocation as LocationProps]));
            }
          }}
        />
      )}
    </>
  );
};

export default FavBeenToIcons;
