import React from "react";

// ------ icon ------
import { IoStorefront, IoStorefrontOutline } from "react-icons/io5";

// ------ redux ------
import { useDispatch } from "react-redux";
import { changeBeenTo } from "../../redux/shopSlice";

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
        <IoStorefront
          onClick={() =>
            alert(
              "You've already been to this place! How was their hot chocolate?😋"
            )
          }
          style={{ cursor: "pointer" }}
        />
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
          style={{ cursor: "pointer" }}
        />
      )}
    </>
  );
};

export default FavBeenToIcons;
