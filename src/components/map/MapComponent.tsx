import React, { useEffect, useState } from "react";

// ------ google map react ------
import GoogleMapReact from "google-map-react";

// ------ json data ------
import shopListData from "../../firebase/shop-info.json";

// ------ redux ------
import { useDispatch, useSelector } from "react-redux";
import { TStore } from "../../redux/store";

// ------ TS interface ------
import { MapProps } from "../../assets/tsInterface";

// ------ components ------
import Marker from "./marker-&-info-window/Marker";

// ------ styled component ------
import { GoogleMapContainer } from "./MapComponent.style";
import { Section } from "../../assets/styleVariables";
import { setReduxState } from "../../redux/shopSlice";

// ------ google map initial props ------
const initialMapProps: MapProps = {
  center: {
    lat: 49.27389842076915,
    lng: -123.10383790605684,
  },
  zoom: 9,
};

// ------ google map api key ------
const API_KEY: string | undefined = process.env.REACT_APP_GOOGLE_MAP_API;

// #######################
// データをFIREBASEからとってくる
// 一回のみでOK？　変更しないので
// reduxに収納し、isFavやbeenToを追加

// locationをmarker propsに入れてmap
// #######################

const MapComponent = () => {
  // ------ google map react ------
  const [mapProps, setMapProps] = useState<MapProps>(initialMapProps);

  // ------ redux ------
  // ------ redux ------
  // const dispatch = useDispatch();
  const shops = useSelector((state: TStore) => state.shops.shops);

  // useEffect(() => {
  //   if (!(shops.length > 0)) {
  //     dispatch(setReduxState(shopListData));
  //     console.log("shops: ", shops);
  //   }
  // }, []);

  return (
    <Section>
      <GoogleMapContainer>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY as string }}
          center={mapProps.center}
          zoom={mapProps.zoom}
        >
          {shops.length > 0 &&
            shops.map((shop) => {
              return shop.eachStoreInfo.map((eachStore) => {
                return (
                  <Marker
                    lat={eachStore.location.lat}
                    lng={eachStore.location.lng}
                    areaName={eachStore.areaName}
                    shop={shop}
                    beenTo={eachStore.beenTo}
                    eachStoreId={eachStore.eachStoreId as string}
                  />
                );
              });
            })}
        </GoogleMapReact>
      </GoogleMapContainer>
    </Section>
  );
};

export default MapComponent;
