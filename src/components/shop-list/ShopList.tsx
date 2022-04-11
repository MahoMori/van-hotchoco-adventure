import React, { useState } from "react";

// ------ redux ------
import { useSelector } from "react-redux";
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

const ShopList = () => {
  // ------ redux ------
  const shops = useSelector((state: TStore) => state.shops.shops);

  // ------ button color style change ------
  // const [clicked, setClicked] =

  // ------ filter ------
  const [filteredShops, setFillteredShops] = useState<JsonProps[]>(shops);
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
          filteredShops.map((shop) => (
            <EachShop key={shop.shopName} {...shop} />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No matching shop😔</p>
        )}
      </ListContainer>
    </ShopListSection>
  );
};

export default ShopList;
