import React, { useEffect, useState } from "react";

// ------ json data ------
import shopListData from "../../firebase/shop-info.json";

// ------ redux ------
import { useDispatch, useSelector } from "react-redux";
import { TStore } from "../../redux/store";

// ------ TS interface ------
import { JsonProps } from "../../assets/tsInterface";

// ------ components ------
import EachShop from "./EachShop";

// ------ styled component ------
import { mapAreaColor } from "../../assets/styleVariables";
import {
  AreaFilterButton,
  ButtonContainer,
  ShopListTitle,
  ShopListSection,
  ListContainer,
} from "./ShopList.style";
import { setReduxState } from "../../redux/shopSlice";

const ShopList = () => {
  // ------ redux ------
  const shops = useSelector((state: TStore) => state.shops.shops);

  useEffect(() => {
    setFillteredShops(shops);

    // setFillteredShops(shopListData);
  }, [shops]);

  // ------ filter ------
  const [filteredShops, setFillteredShops] =
    useState<JsonProps[]>(shopListData);
  const [clickedButton, setClickedButton] = useState<string>("All");

  const filterShops = (area: string) => {
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
    setClickedButton(areaName);
  };

  return (
    <ShopListSection>
      <ShopListTitle>- Shop List -</ShopListTitle>
      <ButtonContainer>
        <AreaFilterButton
          value="All"
          color="#84563c"
          onClick={(e) => handleButtonClick(e)}
          isClicked={clickedButton === "All" ? true : false}
        >
          All
        </AreaFilterButton>
        {Object.entries(mapAreaColor).map((areaAndColor, i) => (
          <AreaFilterButton
            key={`area-button-${i}`}
            value={areaAndColor[0]}
            color={areaAndColor[1]}
            onClick={(e) => handleButtonClick(e)}
            isClicked={clickedButton === areaAndColor[0] ? true : false}
          >
            {areaAndColor[0]}
          </AreaFilterButton>
        ))}
      </ButtonContainer>

      <ListContainer>
        {filteredShops.length > 0 ? (
          filteredShops.map((shop, i) => (
            <EachShop key={`${shop.shopName}-${i}`} {...shop} />
          ))
        ) : (
          // <p style={{ textAlign: "center" }}>No matching shop😔</p>
          <p style={{ textAlign: "center" }}>Loading......☕</p>
        )}
        {/* {filteredShops.map((shop, i) => (
          <EachShop key={`${shop.shopName}-${i}`} {...shop} />
        ))} */}
      </ListContainer>
    </ShopListSection>
  );
};

export default ShopList;
