import React, { useEffect, useState } from "react";

// ------ json data ------
import shopListData from "../../firebase/shop-info.json";

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
  const [filteredAreaName, setFilteredAreaName] = useState<string>("All");

  useEffect(() => {
    if (filteredAreaName === "All") {
      setFillteredShops(shops);
    } else {
      setFillteredShops(filterShops(filteredAreaName));
    }
  }, [shops]);

  // ------ filter ------
  const [filteredShops, setFillteredShops] =
    useState<JsonProps[]>(shopListData);
  const [noData, setNoData] = useState<boolean>(false);
  const [clickedButton, setClickedButton] = useState<string>("All");

  const filterShops = (area: string) => {
    let newFilteredShops = shops.filter((shop) =>
      shop.eachStoreInfo.some((eachStore) => eachStore.areaName === area)
    );

    if (newFilteredShops.length === 0) {
      setNoData(true);
    } else {
      setNoData(false);
    }

    return newFilteredShops;
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const areaName = (e.target as HTMLInputElement).value;
    setFilteredAreaName(areaName);

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
        ) : noData ? (
          <p style={{ textAlign: "center" }}>No matching shop😔</p>
        ) : (
          <p style={{ textAlign: "center" }}>Loading......☕</p>
        )}
      </ListContainer>
    </ShopListSection>
  );
};

export default ShopList;
