import React from "react";

// ------ icon ------
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { IoStorefront, IoStorefrontOutline } from "react-icons/io5";

// ------ redux ------
import { useDispatch } from "react-redux";
import { changeIsFav, changeBeenTo } from "../../redux/shopSlice";

// ------ TS interface ------
import { IconsProps } from "../../assets/tsInterface";

const FavBeenToIcons: React.VFC<IconsProps> = ({ shop, kw }) => {
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
        <IoStorefront
          onClick={() => {
            if (kw === "marker") {
              dispatch(changeBeenTo(shop));
            }
          }}
        />
      ) : (
        <IoStorefrontOutline
          onClick={() => {
            if (kw === "marker") {
              dispatch(changeBeenTo(shop));
            }
          }}
        />
      )}
    </>
  );
};

export default FavBeenToIcons;
