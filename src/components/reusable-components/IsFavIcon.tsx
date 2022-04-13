import React from "react";

// ------ icon ------
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";

// ------ redux ------
import { useDispatch } from "react-redux";
import { changeIsFav } from "../../redux/shopSlice";

// ------ TS interface ------
import { JsonProps } from "../../assets/tsInterface";

const FavBeenToIcons: React.VFC<JsonProps> = (shop) => {
  // ------ redux ------
  const dispatch = useDispatch();

  return (
    <>
      {shop.isFav ? (
        <BsBookmarkHeartFill
          onClick={() => dispatch(changeIsFav(shop))}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <BsBookmarkHeart
          onClick={() => dispatch(changeIsFav(shop))}
          style={{ cursor: "pointer" }}
        />
      )}
    </>
  );
};

export default FavBeenToIcons;
